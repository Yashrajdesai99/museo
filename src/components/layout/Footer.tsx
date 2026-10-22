import { RotateCcw, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND_TAGLINE } from '../../data';
import { useAuthStore } from '../../state/authStore';
import { useStudyStore } from '../../state/studyStore';

export function Footer() {
  const replayPreloader = useAuthStore((s) => s.replayPreloader);
  const openNotebook = useStudyStore((s) => s.openNotebook);

  return (
    <footer className="bg-[#0E0E0E] text-[#F2EDE4] border-t-[4px] border-[#0E0E0E]">
      <div className="max-w-[1440px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3 md:col-span-2">
          <div className="text-2xl font-bold font-display tracking-tight text-[#F2EDE4]">
            MUSEO
          </div>
          <div className="text-xs font-mono-tabular text-[#FFD400] font-bold">
            {BRAND_TAGLINE}
          </div>
          <p className="text-sm text-[#F2EDE4]/75 max-w-md leading-relaxed">
            Virtual Museum of Deep Time. An interactive 3D paleontological and archaeological archive spanning 4,600 million years of Earth history, continental drift, and verified museum specimens.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => openNotebook('stub')}
              className="px-3 py-1.5 text-xs font-mono-tabular font-bold bg-[#FFD400] text-[#0E0E0E] border border-[#FFD400] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Export Souvenir Ticket PNG</span>
            </button>

            <button
              type="button"
              onClick={replayPreloader}
              className="px-3 py-1.5 text-xs font-mono-tabular text-[#F2EDE4]/80 border border-[#F2EDE4]/30 hover:border-[#FFD400] hover:text-[#FFD400] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay 4,600 Ma Arrival</span>
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          <h3 className="text-sm font-bold font-display text-[#FFD400]">
            Curatorial Wings
          </h3>
          <ul className="space-y-2 text-sm text-[#F2EDE4]/80">
            <li>
              <Link to="/" className="hover:underline">01. Main Exhibition Hall</Link>
            </li>
            <li>
              <Link to="/earth" className="hover:underline">02. 4.6B-Year Earth Timeline</Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:underline">03. 20-Specimen Catalog</Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">04. Admission Ticket Desk</Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2.5">
          <h3 className="text-sm font-bold font-display text-[#FFD400]">
            Verification Standards
          </h3>
          <p className="text-xs text-[#F2EDE4]/75 leading-relaxed">
            Every fossil specimen and cultural artifact in MUSEO is cross-linked to its geological stage and cites primary peer-reviewed literature or CC0 museum accession records.
          </p>
          <div className="pt-2 text-xs font-mono-tabular text-[#F2EDE4]/60">
            WCAG AA Contrast · Reduced Motion Ready
          </div>
        </div>
      </div>
    </footer>
  );
}
