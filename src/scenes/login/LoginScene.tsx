import {
  ArrowRight,
  Award,
  Bot,
  CheckCircle2,
  Eye,
  Scissors,
  Sparkles,
  Ticket
} from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { LazyCanvas, type LazyCanvasContext } from '../../components/canvas/LazyCanvas';
import { Button } from '../../components/ui/Button';
import { soundEngine } from '../../lib/soundEngine';
import { useAuthStore, type VisitorRole } from '../../state/authStore';
import { useStudyStore } from '../../state/studyStore';
import { LoginFallback } from './LoginFallback';
import { buildPhysicsTicket, type PhysicsTicketHandles } from './PhysicsTicket';
import { buildRobotGuide, type RobotGuideHandles } from './RobotGuide';
import { buildTicketCounterGroup } from './TicketCounter';

const ROLES: VisitorRole[] = [
  'Student Researcher',
  'Curious Visitor',
  'Faculty Evaluator'
];

const ROBOT_DOCENT_QUIPS = [
  'Four billion years. You have time.',
  'Your ticket is valid from the Hadean to the Holocene. Refunds expired in the Permian.',
  'Please do not tap on the Anomalocaris tank. It has 16,000 lenses per eye and holds a grudge.',
  'Step right up. The magma ocean has finally cooled enough for visitors.',
  'Pro tip: click my brass chassis five times to unlock the Golden Ammonite collector seal.'
];

export function LoginScene() {
  const navigate = useNavigate();
  const {
    pass,
    issuePass,
    clearPass,
    isTicketTorn,
    tearTicket,
    robotClickCount,
    hasGoldenAmmoniteSticker,
    registerRobotClick,
    prefer2DFallback,
    setPrefer2DFallback
  } = useAuthStore();
  const { openNotebook } = useStudyStore();

  const [visitorName, setVisitorName] = useState(pass?.visitorName ?? '');
  const [visitorRole, setVisitorRole] = useState<VisitorRole>(
    pass?.visitorRole ?? 'Student Researcher'
  );
  const [isStamping, setIsStamping] = useState(false);
  const [easterEggBanner, setEasterEggBanner] = useState(false);
  const [quipIndex, setQuipIndex] = useState(0);

  const robotRef = useRef<RobotGuideHandles | null>(null);
  const ticketRef = useRef<PhysicsTicketHandles | null>(null);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const stampAnimTimerRef = useRef<number>(0);
  const spinEasterEggTimerRef = useRef<number>(0);

  // Sync existing pass & sticker state when mounting
  useEffect(() => {
    if (ticketRef.current) {
      ticketRef.current.setGoldenSticker(hasGoldenAmmoniteSticker);
      if (pass) {
        ticketRef.current.triggerLaunch();
      }
      if (isTicketTorn) {
        ticketRef.current.triggerTear();
      }
    }
  }, [pass, isTicketTorn, hasGoldenAmmoniteSticker]);

  const handleTriggerRobotClick = () => {
    setQuipIndex((prev) => (prev + 1) % ROBOT_DOCENT_QUIPS.length);
    const unlocked = registerRobotClick();
    if (unlocked) {
      soundEngine.playRobotEasterEgg();
      spinEasterEggTimerRef.current = 1.3;
      ticketRef.current?.setGoldenSticker(true);
      setEasterEggBanner(true);
      window.setTimeout(() => setEasterEggBanner(false), 4500);
    } else {
      soundEngine.playHotspotPing();
      stampAnimTimerRef.current = 0.3;
    }
  };

  const handleTearStub = () => {
    soundEngine.playPaperTear();
    tearTicket();
    ticketRef.current?.triggerTear();
  };

  const handleSetup = ({ scene, camera, container }: LazyCanvasContext) => {
    const counterGroup = buildTicketCounterGroup();
    scene.add(counterGroup);

    const robot = buildRobotGuide();
    robotRef.current = robot;
    scene.add(robot.root);

    const physicsTicket = buildPhysicsTicket();
    physicsTicket.setGoldenSticker(useAuthStore.getState().hasGoldenAmmoniteSticker);
    if (useAuthStore.getState().pass) {
      physicsTicket.triggerLaunch();
    }
    if (useAuthStore.getState().isTicketTorn) {
      physicsTicket.triggerTear();
    }
    ticketRef.current = physicsTicket;
    scene.add(physicsTicket.group);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointerRef.current = { x: nx, y: ny };
    };

    const onPointerDown = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);

      // 1. Check if user clicked the 3D Ticket Stub to tear it
      if (ticketRef.current) {
        const stubHits = raycaster.intersectObjects(ticketRef.current.stubGroup.children, true);
        if (stubHits.length > 0) {
          soundEngine.playPaperTear();
          useAuthStore.getState().tearTicket();
          ticketRef.current.triggerTear();
          return;
        }
      }

      // 2. Check if user clicked the 3D Robot Docent (5-click Easter Egg + dry dialogue!)
      if (robotRef.current) {
        const robotHits = raycaster.intersectObjects(robotRef.current.root.children, true);
        if (robotHits.length > 0) {
          setQuipIndex((prev) => (prev + 1) % ROBOT_DOCENT_QUIPS.length);
          const unlocked = useAuthStore.getState().registerRobotClick();
          if (unlocked) {
            soundEngine.playRobotEasterEgg();
            spinEasterEggTimerRef.current = 1.3;
            ticketRef.current?.setGoldenSticker(true);
            setEasterEggBanner(true);
            window.setTimeout(() => setEasterEggBanner(false), 4500);
          } else {
            soundEngine.playHotspotPing();
            stampAnimTimerRef.current = 0.3;
          }
        }
      }
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);
    return () => {
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
    };
  };

  const handleFrame = (_ctx: LazyCanvasContext, delta: number, elapsed: number) => {
    const robot = robotRef.current;
    const ticket = ticketRef.current;

    if (robot) {
      if (spinEasterEggTimerRef.current > 0) {
        spinEasterEggTimerRef.current = Math.max(0, spinEasterEggTimerRef.current - delta);
        // 360-degree celebratory head spin & dual-arm wave
        robot.head.rotation.y += delta * Math.PI * 5;
        robot.leftArm.rotation.z = Math.sin(elapsed * 18) * 0.45;
        robot.rightArm.rotation.x = -0.9 + Math.cos(elapsed * 18) * 0.4;
      } else {
        const targetYaw = pointerRef.current.x * 0.45;
        const targetPitch = -pointerRef.current.y * 0.22;
        robot.head.rotation.y = THREE.MathUtils.damp(robot.head.rotation.y, targetYaw, 5, delta);
        robot.head.rotation.x = THREE.MathUtils.damp(robot.head.rotation.x, targetPitch, 5, delta);
        robot.leftArm.rotation.z = THREE.MathUtils.damp(robot.leftArm.rotation.z, 0, 5, delta);
      }

      // Subtle breathing bob
      robot.root.position.y = 0.25 + Math.sin(elapsed * 2.1) * 0.025;

      // Stamp arm motion when issuing ticket
      if (stampAnimTimerRef.current > 0 && spinEasterEggTimerRef.current <= 0) {
        stampAnimTimerRef.current = Math.max(0, stampAnimTimerRef.current - delta);
        const punch = Math.sin(stampAnimTimerRef.current * Math.PI * 2);
        robot.rightArm.rotation.x = -punch * 0.85;
      } else if (spinEasterEggTimerRef.current <= 0) {
        robot.rightArm.rotation.x = THREE.MathUtils.damp(robot.rightArm.rotation.x, 0, 6, delta);
      }
    }

    if (ticket) {
      ticket.updatePhysics(delta);
    }
  };

  const handleIssueTicket = (e: FormEvent) => {
    e.preventDefault();
    setIsStamping(true);
    stampAnimTimerRef.current = 0.55;
    soundEngine.playTicketPrint();
    soundEngine.playTicketStamp();
    ticketRef.current?.triggerLaunch();
    issuePass(visitorName || 'Archival Explorer', visitorRole);
    setTimeout(() => {
      setIsStamping(false);
    }, 650);
  };

  const handleReissue = () => {
    clearPass();
    ticketRef.current?.resetTicket();
  };

  const currentRobotLine = pass
    ? isTicketTorn
      ? 'Stub detached. Keep it safe—you will need it when you return to the Holocene.'
      : 'Stamped and validated. Tear the perforated stub or step directly into 4.6 billion years.'
    : ROBOT_DOCENT_QUIPS[quipIndex];

  if (prefer2DFallback) {
    return (
      <div className="min-h-[calc(100vh-72px)] bg-[#F2EDE4] py-12 px-6 flex flex-col justify-center">
        <div className="max-w-xl mx-auto w-full mb-4 flex justify-end">
          <Button variant="secondary" size="sm" onClick={() => setPrefer2DFallback(false)}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Switch to 3D Ticket Counter</span>
          </Button>
        </div>
        <LoginFallback />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-68px)] min-h-[640px] bg-[#0E0E0E]">
      <LazyCanvas
        cameraPosition={[0, 0.55, 3.85]}
        fov={42}
        backgroundColor={0x0e0e0e}
        onSetup={handleSetup}
        onFrame={handleFrame}
        fallback={<LoginFallback />}
        ariaLabel="3D Museum of Deep Time Ticket Counter and Robot Docent"
        overlay={
          <>
            {/* Top-Left Title, Robot Dialogue Bubble & Interactive Controls */}
            <div className="absolute top-5 left-6 right-6 flex flex-wrap items-start justify-between gap-4 pointer-events-none z-10">
              <div className="space-y-2.5 max-w-md pointer-events-auto">
                <div className="bg-[#0E0E0E] text-[#F2EDE4] border-[3px] border-[#F2EDE4] px-4 py-2.5">
                  <div className="text-[11px] font-mono-tabular text-[#FFD400]">
                    ACT 1 · MUSEUM OF DEEP TIME LOBBY KIOSK
                  </div>
                  <div className="text-lg font-bold font-display">
                    Docent Automaton & Perforated Physics Ticket Desk
                  </div>
                </div>

                {/* Dry, Witty Robot Docent Dialogue Bubble */}
                <button
                  type="button"
                  onClick={handleTriggerRobotClick}
                  data-cursor-label="TALK"
                  className="w-full text-left bg-[#F2EDE4] text-[#0E0E0E] border-[3px] border-[#0E0E0E] shadow-[4px_4px_0px_#FFD400] px-3.5 py-2.5 cursor-pointer hover:bg-[#FFD400] transition-colors flex items-start gap-2.5"
                >
                  <Bot className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="text-xs font-mono-tabular leading-snug">
                    <span className="font-bold">ROBOT GUIDE: </span>
                    <span className="italic">"{currentRobotLine}"</span>
                  </div>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
                <button
                  type="button"
                  data-cursor-label="ROBOT"
                  onClick={handleTriggerRobotClick}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono-tabular font-bold bg-[#0E0E0E] text-[#FFD400] border-[2px] border-[#FFD400] cursor-pointer hover:bg-[#FFD400] hover:text-[#0E0E0E] transition-colors"
                  title="Click the 3D Robot Docent 5 times to unlock the Golden Ammonite Sticker!"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>
                    {hasGoldenAmmoniteSticker
                      ? '★ Golden Ammonite Unlocked'
                      : `Calibrate Robot (${Math.min(5, robotClickCount)}/5)`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPrefer2DFallback(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold font-display bg-[#F2EDE4] text-[#0E0E0E] border-[2px] border-[#0E0E0E] shadow-[4px_4px_0px_#FFD400] cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>2D Accessible Form</span>
                </button>
              </div>
            </div>

            {/* 5-Click Robot Easter Egg Unlocked Banner */}
            {easterEggBanner && (
              <div className="absolute top-32 left-1/2 -translate-x-1/2 z-20 bg-[#FFD400] text-[#0E0E0E] border-[3px] border-[#0E0E0E] shadow-[6px_6px_0px_#0E0E0E] px-5 py-2.5 text-xs font-mono-tabular font-bold flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>
                  DOCENT OVERDRIVE! Golden Ammonite Collector Seal stamped onto your Admission Pass!
                </span>
              </div>
            )}

            {/* Bottom Center Architectural Admission Dock */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[94vw] max-w-[920px] z-10">
              <div className="bg-[#F2EDE4] text-[#0E0E0E] border-[3px] border-[#0E0E0E] shadow-[8px_8px_0px_#0E0E0E] p-4 sm:p-5">
                {pass ? (
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular font-bold">
                        <span className="inline-flex items-center gap-1 bg-[#D9381E] text-[#F2EDE4] px-2 py-0.5 border border-[#0E0E0E]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          ADMITTED // 4.6 GA
                        </span>
                        <span>·</span>
                        <span>{pass.ticketCode}</span>
                        {isTicketTorn && (
                          <>
                            <span>·</span>
                            <span className="text-[#D9381E]">STUB DETACHED ✓</span>
                          </>
                        )}
                        {hasGoldenAmmoniteSticker && (
                          <>
                            <span>·</span>
                            <span className="bg-[#FFD400] text-[#0E0E0E] px-1.5 py-0.5 border border-[#0E0E0E]">
                              ★ GOLDEN AMMONITE
                            </span>
                          </>
                        )}
                      </div>
                      <div className="text-lg font-bold font-display">
                        Welcome, {pass.visitorName} ({pass.visitorRole})
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      {!isTicketTorn && (
                        <Button
                          variant="secondary"
                          size="sm"
                          data-cursor-label="TEAR"
                          onClick={handleTearStub}
                        >
                          <Scissors className="w-3.5 h-3.5" />
                          <span>Tear Perforated Stub</span>
                        </Button>
                      )}

                      <Button
                        variant="secondary"
                        size="sm"
                        data-cursor-label="STUB PNG"
                        onClick={() => openNotebook('stub')}
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>Export Stub PNG</span>
                      </Button>

                      <Button variant="secondary" size="sm" onClick={handleReissue}>
                        Re-Stamp
                      </Button>

                      <Button
                        variant="primary"
                        data-cursor-label="ENTER 4.6 GA"
                        onClick={() => navigate('/earth')}
                      >
                        <span>Step Into Deep Time</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleIssueTicket}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end"
                  >
                    <div className="md:col-span-5 space-y-1">
                      <label
                        htmlFor="visitor-name-3d"
                        className="block text-xs font-mono-tabular font-bold"
                      >
                        VISITOR NAME (PRINTED ON 3D TICKET)
                      </label>
                      <input
                        id="visitor-name-3d"
                        type="text"
                        placeholder="Enter name (e.g., Dr. Elena Vance)"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white text-[#0E0E0E] border-2 border-[#0E0E0E] text-sm font-body focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-4 space-y-1">
                      <label
                        htmlFor="visitor-role-3d"
                        className="block text-xs font-mono-tabular font-bold"
                      >
                        CURATORIAL TRACK
                      </label>
                      <select
                        id="visitor-role-3d"
                        value={visitorRole}
                        onChange={(e) => setVisitorRole(e.target.value as VisitorRole)}
                        className="w-full px-3 py-2.5 bg-white text-[#0E0E0E] border-2 border-[#0E0E0E] text-sm font-display font-bold focus:outline-none cursor-pointer"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <Button
                        type="submit"
                        variant="primary"
                        data-cursor-label="STAMP"
                        className="w-full"
                        disabled={isStamping}
                      >
                        <Ticket className="w-4 h-4" />
                        <span>{isStamping ? 'Stamping...' : 'Stamp Ticket'}</span>
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}
