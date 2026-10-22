import { ArrowRight, CheckCircle2, Scissors, Ticket } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { soundEngine } from '../../lib/soundEngine';
import { useAuthStore, type VisitorRole } from '../../state/authStore';
import { useStudyStore } from '../../state/studyStore';

interface LoginFallbackProps {
  onPassIssued?: () => void;
}

const ROLES: VisitorRole[] = [
  'Student Researcher',
  'Curious Visitor',
  'Faculty Evaluator'
];

export function LoginFallback({ onPassIssued }: LoginFallbackProps) {
  const navigate = useNavigate();
  const {
    pass,
    issuePass,
    clearPass,
    isTicketTorn,
    tearTicket,
    hasGoldenAmmoniteSticker
  } = useAuthStore();
  const { openNotebook } = useStudyStore();
  const [visitorName, setVisitorName] = useState(pass?.visitorName ?? '');
  const [visitorRole, setVisitorRole] = useState<VisitorRole>(
    pass?.visitorRole ?? 'Student Researcher'
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    soundEngine.playTicketStamp();
    issuePass(visitorName || 'Archival Researcher', visitorRole);
    if (onPassIssued) {
      onPassIssued();
    } else {
      navigate('/earth');
    }
  };

  const handleTearStub = () => {
    soundEngine.playPaperTear();
    tearTicket();
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-[#F2EDE4] text-[#0E0E0E] border-[4px] border-[#0E0E0E] shadow-[10px_10px_0px_#0E0E0E] p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b-[3px] border-[#0E0E0E] pb-4">
        <div>
          <div className="text-xs font-mono-tabular font-bold text-[#4A4742]">
            MUSEUM OF DEEP TIME · ADMISSION DESK
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display mt-1">
            Visitor Pass Kiosk
          </h1>
        </div>
        <Ticket className="w-8 h-8 text-[#0E0E0E] shrink-0" />
      </div>

      {pass ? (
        <div className="bg-[#E8E1D5] border-[3px] border-[#0E0E0E] p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono-tabular font-bold">
              ACTIVE STAMPED PASS · {pass.ticketCode}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-[#D9381E] text-[#F2EDE4] px-2.5 py-1 border-2 border-[#0E0E0E]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              ADMITTED // 4.6 GA
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t-2 border-[#0E0E0E]/20 text-sm">
            <div>
              <div className="text-xs font-mono-tabular text-[#4A4742]">Holder</div>
              <div className="font-bold font-display text-lg">{pass.visitorName}</div>
            </div>
            <div>
              <div className="text-xs font-mono-tabular text-[#4A4742]">Curatorial Track</div>
              <div className="font-bold font-display">{pass.visitorRole}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular">
            <span>Stub: {isTicketTorn ? 'Detached ✓' : 'Intact'}</span>
            {hasGoldenAmmoniteSticker && (
              <>
                <span>·</span>
                <span className="font-bold text-[#0E0E0E]">★ Golden Ammonite Seal</span>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Button variant="primary" onClick={() => navigate('/earth')}>
              <span>Enter 4.6B-Year Globe</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            {!isTicketTorn && (
              <Button variant="secondary" size="sm" onClick={handleTearStub}>
                <Scissors className="w-3.5 h-3.5" />
                <span>Tear Perforated Stub</span>
              </Button>
            )}
            <Button variant="secondary" size="sm" onClick={() => openNotebook('stub')}>
              <span>Download Stub PNG</span>
            </Button>
            <Button variant="secondary" size="sm" onClick={clearPass}>
              Reissue Pass
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="visitor-name-input"
              className="block text-xs font-mono-tabular font-bold tracking-wider"
            >
              01. VISITOR NAME OR RESEARCHER ID
            </label>
            <input
              id="visitor-name-input"
              type="text"
              required
              placeholder="e.g., Dr. Elena Rostova or GTU Evaluator"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              className="w-full px-4 py-3 bg-white text-[#0E0E0E] border-[3px] border-[#0E0E0E] font-body text-sm focus:outline-none focus:bg-[#FFD400]/15"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono-tabular font-bold tracking-wider">
              02. SELECT CURATORIAL TRACK
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {ROLES.map((role) => {
                const active = visitorRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setVisitorRole(role)}
                    className={`px-3 py-2.5 text-xs font-bold font-display border-[2px] border-[#0E0E0E] text-left cursor-pointer transition-colors ${
                      active
                        ? 'bg-[#0E0E0E] text-[#FFD400]'
                        : 'bg-white text-[#0E0E0E] hover:bg-[#E8E1D5]'
                    }`}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono-tabular text-[#4A4742]">
              Admission: Free · All 5 Geological Eons Included
            </div>
            <Button type="submit" variant="primary" size="lg">
              <span>Stamp & Issue Ticket</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
