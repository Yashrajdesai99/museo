import { ArrowRight, Award, Compass, Ticket } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LazyCanvas, type LazyCanvasContext } from '../../../components/canvas/LazyCanvas';
import { Button } from '../../../components/ui/Button';
import { ShareableTicketStub } from '../../../components/ui/ShareableTicketStub';
import { soundEngine } from '../../../lib/soundEngine';
import { buildRobotGuide, type RobotGuideHandles } from '../../../scenes/login/RobotGuide';
import { useAuthStore } from '../../../state/authStore';

export function AdmissionPortalSection() {
  const navigate = useNavigate();
  const {
    pass,
    robotClickCount,
    hasGoldenAmmoniteSticker,
    registerRobotClick
  } = useAuthStore();
  const robotRef = useRef<RobotGuideHandles | null>(null);
  const spinTimerRef = useRef<number>(0);
  const [unlockedToast, setUnlockedToast] = useState(false);

  const handleRobotClick = () => {
    const unlocked = registerRobotClick();
    if (unlocked) {
      soundEngine.playRobotEasterEgg();
      spinTimerRef.current = 1.3;
      setUnlockedToast(true);
      window.setTimeout(() => setUnlockedToast(false), 4000);
    } else {
      soundEngine.playHotspotPing();
    }
  };

  const handleSetup = ({ scene }: LazyCanvasContext) => {
    const robot = buildRobotGuide();
    robot.root.position.set(0, -0.55, 0);
    robotRef.current = robot;
    scene.add(robot.root);
  };

  const handleFrame = (_ctx: LazyCanvasContext, delta: number, elapsed: number) => {
    if (robotRef.current) {
      if (spinTimerRef.current > 0) {
        spinTimerRef.current = Math.max(0, spinTimerRef.current - delta);
        robotRef.current.head.rotation.y += delta * Math.PI * 5;
      } else {
        robotRef.current.head.rotation.y = Math.sin(elapsed * 1.2) * 0.32;
      }
      robotRef.current.root.position.y = -0.55 + Math.sin(elapsed * 2.2) * 0.03;
    }
  };

  return (
    <section className="py-16 lg:py-24 px-6 bg-[#FFD400] text-[#0E0E0E] space-y-12">
      {/* Act 1 Entrance & 5-Click Robot Docent Portal */}
      <div className="max-w-[1440px] mx-auto bg-[#F2EDE4] border-[4px] border-[#0E0E0E] shadow-[12px_12px_0px_#0E0E0E] p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="text-xs font-mono-tabular font-bold tracking-widest text-[#4A4742]">
            07. ACT 1 & ACT 4 · ADMISSION DESK & SOUVENIR TICKET STUB
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-display leading-[1.05]">
            Meet the Docent Automaton & Claim Your Deep Time Pass.
          </h2>

          <p className="text-base sm:text-lg text-[#0E0E0E]/85 max-w-2xl leading-relaxed">
            Step up to the 3D brutalist ticket counter to stamp and tear your perforated research pass, click the Robot Docent 5 times to unlock the Golden Ammonite seal, and export your personal souvenir Ticket Stub PNG below.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              data-cursor-label="STAMP PASS"
              onClick={() => navigate('/login')}
            >
              <Ticket className="w-5 h-5" />
              <span>{pass ? `View Pass (${pass.ticketCode})` : 'Enter 3D Ticket Lobby'}</span>
              <ArrowRight className="w-5 h-5" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              data-cursor-label="SCRUB 4.6 GA"
              onClick={() => navigate('/earth')}
            >
              <Compass className="w-5 h-5" />
              <span>Explore Earth Globe</span>
            </Button>

            <Button
              variant="secondary"
              size="md"
              data-cursor-label="ROBOT"
              onClick={handleRobotClick}
            >
              <Award className="w-4 h-4" />
              <span>
                {hasGoldenAmmoniteSticker
                  ? '★ Golden Ammonite Unlocked'
                  : `Click Robot (${Math.min(5, robotClickCount)}/5)`}
              </span>
            </Button>
          </div>

          {unlockedToast && (
            <div className="p-3 bg-[#0E0E0E] text-[#FFD400] border-2 border-[#0E0E0E] text-xs font-mono-tabular font-bold">
              ★ DOCENT OVERDRIVE! Golden Ammonite Collector Sticker added to your Ticket Stub below!
            </div>
          )}
        </div>

        {/* Gated 3D Robot Docent Preview */}
        <div
          onClick={handleRobotClick}
          data-cursor-label="ROBOT"
          className="lg:col-span-5 h-[280px] sm:h-[320px] border-[3px] border-[#0E0E0E] shadow-[6px_6px_0px_#0E0E0E] bg-[#0E0E0E] cursor-pointer"
        >
          <LazyCanvas
            cameraPosition={[0, 0.35, 2.75]}
            fov={40}
            onSetup={handleSetup}
            onFrame={handleFrame}
            ariaLabel="3D Preview of the MUSEO Robot Docent Guide"
            overlay={
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-[#0E0E0E]/90 text-[#FFD400] border border-[#FFD400] px-2.5 py-1 text-[11px] font-mono-tabular">
                <span>DOCENT AUTOMATON MK-IV</span>
                <span>CLICK 5× FOR EASTER EGG ({Math.min(5, robotClickCount)}/5)</span>
              </div>
            }
          />
        </div>
      </div>

      {/* Act 4 Exit: Embedded Shareable Ticket Stub PNG Generator */}
      <div className="max-w-[1440px] mx-auto bg-[#F2EDE4] border-[4px] border-[#0E0E0E] shadow-[12px_12px_0px_#0E0E0E] p-8 lg:p-10">
        <ShareableTicketStub />
      </div>
    </section>
  );
}
