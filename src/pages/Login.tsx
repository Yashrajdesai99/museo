import { PageShell } from '../components/layout/PageShell';
import { useDeviceTier } from '../hooks/useDeviceTier';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { LoginFallback } from '../scenes/login/LoginFallback';
import { LoginScene } from '../scenes/login/LoginScene';

export default function LoginPage() {
  const reducedMotion = useReducedMotion();
  const deviceTier = useDeviceTier();

  return (
    <PageShell hideFooter>
      {reducedMotion || deviceTier === 'low' ? (
        <div className="min-h-[calc(100vh-72px)] bg-[#F2EDE4] py-12 px-6 flex items-center justify-center">
          <LoginFallback />
        </div>
      ) : (
        <LoginScene />
      )}
    </PageShell>
  );
}
