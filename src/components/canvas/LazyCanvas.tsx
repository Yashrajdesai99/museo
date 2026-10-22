import { useEffect, useRef, useState, type ReactNode } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../lib/cn';

export interface LazyCanvasContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  container: HTMLDivElement;
  keyLight: THREE.DirectionalLight;
  hemiLight: THREE.HemisphereLight;
  rimLight: THREE.DirectionalLight;
}

interface LazyCanvasProps {
  className?: string;
  backgroundColor?: number;
  cameraPosition?: [number, number, number];
  fov?: number;
  onSetup: (ctx: LazyCanvasContext) => (() => void) | void;
  onFrame?: (ctx: LazyCanvasContext, delta: number, elapsed: number) => void;
  overlay?: ReactNode;
  fallback?: ReactNode;
  ariaLabel?: string;
}

/**
 * Visibility-gated Three.js WebGL canvas wrapper.
 * Automatically pauses the requestAnimationFrame loop when scrolled out of view
 * via IntersectionObserver (useInView), configures RoomEnvironment PBR lighting,
 * and handles WebGL context loss gracefully.
 */
export function LazyCanvas({
  className,
  backgroundColor = 0x0e0e0e,
  cameraPosition = [0, 0.8, 4.2],
  fov = 45,
  onSetup,
  onFrame,
  overlay,
  fallback,
  ariaLabel = 'Interactive 3D Museum Viewport'
}: LazyCanvasProps) {
  const [wrapperRef, inView] = useInView<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: '100px'
  });
  const mountRef = useRef<HTMLDivElement | null>(null);
  const inViewRef = useRef<boolean>(inView);
  const onFrameRef = useRef(onFrame);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  useEffect(() => {
    onFrameRef.current = onFrame;
  }, [onFrame]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setWebglError(true);
      return;
    }

    const isHeadless =
      navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = !isHeadless;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);
    scene.fog = new THREE.FogExp2(backgroundColor, 0.035);

    // Zero-dependency Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // Balanced 3-point warm/cool studio lighting rig
    const hemiLight = new THREE.HemisphereLight(0xf2ede4, 0x1c1c1c, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e0, 2.2);
    keyLight.position.set(5, 7, 6);
    keyLight.castShadow = !isHeadless;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    const d = 5;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffd400, 0.9);
    rimLight.position.set(-5, 3, -5);
    scene.add(rimLight);

    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 200);
    camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
    camera.lookAt(0, 0, 0);

    const ctx: LazyCanvasContext = {
      scene,
      camera,
      renderer,
      container,
      keyLight,
      hemiLight,
      rimLight
    };
    const cleanupSetup = onSetup(ctx);

    // Pre-warm shaders
    renderer.compile(scene, camera);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglError(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      // IntersectionObserver frameloop gating: skip render work when scrolled off-screen
      if (!inViewRef.current) {
        clock.getDelta();
        return;
      }
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      if (onFrameRef.current) {
        onFrameRef.current(ctx, delta, elapsed);
      }
      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      if (cleanupSetup) cleanupSetup();
      envTexture.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  if (webglError && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div
      ref={wrapperRef}
      role="region"
      aria-label={ariaLabel}
      className={cn('relative w-full h-full overflow-hidden bg-[#0E0E0E]', className)}
    >
      <div ref={mountRef} className="w-full h-full" />
      {overlay}
    </div>
  );
}
