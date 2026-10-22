import { BookOpen, Sparkles, Ticket } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { soundEngine } from '../../lib/soundEngine';
import { useStudyStore } from '../../state/studyStore';
import { CommandPaletteModal } from '../ui/CommandPaletteModal';
import { FieldNotebookModal } from '../ui/FieldNotebookModal';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

interface PageShellProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export function PageShell({ children, hideFooter = false }: PageShellProps) {
  const { openNotebook, bookmarkedIds, quizBestScore } = useStudyStore();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundEngine.playClick();
        setCommandOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F2EDE4] text-[#0E0E0E]">
      <Navbar onOpenCommandPalette={() => setCommandOpen(true)} />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}

      {/* Floating Curatorial Field Notebook & Shareable Ticket Stub Launcher */}
      <div className="fixed bottom-5 right-5 z-30 flex items-center gap-2">
        <button
          type="button"
          data-cursor-label="STUB PNG"
          onClick={() => openNotebook('stub')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold font-display bg-[#F2EDE4] text-[#0E0E0E] border-[3px] border-[#0E0E0E] shadow-[5px_5px_0px_#0E0E0E] brutal-press cursor-pointer whitespace-nowrap"
          title="Export Personal Souvenir Ticket Stub (PNG)"
        >
          <Ticket className="w-4 h-4 text-[#0E0E0E]" />
          <span>Ticket Stub</span>
        </button>

        <button
          type="button"
          data-cursor-label="NOTEBOOK"
          onClick={() => openNotebook('tours')}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-display bg-[#0E0E0E] text-[#FFD400] border-[3px] border-[#0E0E0E] shadow-[5px_5px_0px_#FFD400] brutal-press cursor-pointer whitespace-nowrap"
          title="Open Guided Docent Tours, Saved Specimens & Deep Time Quiz"
        >
          <Sparkles className="w-4 h-4 text-[#FFD400]" />
          <span>Docent Tours & Quiz</span>
          <span className="px-1.5 py-0.5 bg-[#FFD400] text-[#0E0E0E] font-mono-tabular text-[10px]">
            <BookOpen className="w-3 h-3 inline mr-0.5" />
            {bookmarkedIds.length}
            {quizBestScore !== null ? ` · ★${quizBestScore}` : ''}
          </span>
        </button>
      </div>

      <FieldNotebookModal />
      <CommandPaletteModal open={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  );
}
