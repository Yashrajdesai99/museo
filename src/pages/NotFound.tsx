import { ArrowLeft, Bot, Compass, Grid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-6 py-20 lg:py-24">
        <div className="bg-[#F2EDE4] border-[4px] border-[#0E0E0E] shadow-[10px_10px_0px_#0E0E0E] p-8 sm:p-12 text-center space-y-6">
          <div className="inline-block px-3.5 py-1.5 bg-[#0E0E0E] text-[#FFD400] font-mono-tabular text-xs font-bold border-2 border-[#0E0E0E]">
            STRATIGRAPHIC UNCONFORMITY · ERROR 404 · K-Pg BOUNDARY
          </div>

          {/* Architectural SVG Fossilized Ammonite Diagram */}
          <div className="w-28 h-28 mx-auto bg-[#0E0E0E] border-[3px] border-[#0E0E0E] flex items-center justify-center p-3">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="42" stroke="#F2EDE4" strokeWidth="2.5" strokeDasharray="5 4" />
              <path
                d="M50 50 m0 0 a6 6 0 1 0 12 0 a14 14 0 1 0 -28 0 a24 24 0 1 0 48 0 a34 34 0 1 0 -68 0"
                stroke="#FFD400"
                strokeWidth="3"
                strokeLinecap="square"
              />
            </svg>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold font-display tracking-tight text-[#0E0E0E]">
            This exhibit has gone extinct.
          </h1>

          <p className="text-base text-[#0E0E0E]/85 max-w-xl mx-auto leading-relaxed">
            The gallery coordinate or geological horizon you requested did not survive the Permian–Triassic boundary. Return to the main museum hall or scrub the 4.6-billion-year Earth Evolution timeline.
          </p>

          {/* Dry Robot Docent Quip */}
          <div className="max-w-lg mx-auto bg-[#E8E1D5] border-2 border-[#0E0E0E] p-3.5 text-left flex items-start gap-3">
            <Bot className="w-5 h-5 text-[#0E0E0E] shrink-0 mt-0.5" />
            <div className="text-xs font-mono-tabular text-[#0E0E0E]">
              <span className="font-bold">ROBOT GUIDE // 404 LOG: </span>
              <span>
                "99.9% of all species that ever lived are extinct. Apparently, this URL just joined them."
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Button variant="primary" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Museum Entrance</span>
            </Button>
            <Button variant="secondary" onClick={() => navigate('/earth')}>
              <Compass className="w-4 h-4" />
              <span>Scrub 4.6 Ga Earth Globe</span>
            </Button>
            <Button variant="secondary" onClick={() => navigate('/gallery')}>
              <Grid className="w-4 h-4" />
              <span>Browse 20-Specimen Archive</span>
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
