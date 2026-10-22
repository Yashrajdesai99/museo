import {
  ArrowRight,
  Award,
  Bookmark,
  Compass,
  HelpCircle,
  Sparkles,
  Ticket,
  Trash2,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EVOLUTION_STAGES, getEntityById } from '../../data';
import { GUIDED_TOURS, QUIZ_QUESTIONS } from '../../data/toursAndQuiz';
import { soundEngine } from '../../lib/soundEngine';
import { useStudyStore } from '../../state/studyStore';
import { useTimelineStore } from '../../state/timelineStore';
import { Button } from './Button';
import { ShareableTicketStub } from './ShareableTicketStub';

export function FieldNotebookModal() {
  const navigate = useNavigate();
  const {
    isNotebookOpen,
    closeNotebook,
    notebookTab,
    setNotebookTab,
    bookmarkedIds,
    toggleBookmark,
    visitedStages,
    quizBestScore,
    setQuizBestScore,
    startTour,
    audioMuted,
    toggleAudioMuted
  } = useStudyStore();

  const { setAgeMa, setSelectedEntityId } = useTimelineStore();

  // Quiz local state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  if (!isNotebookOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentQIndex];

  const handleLaunchTour = (tourId: string) => {
    const tour = GUIDED_TOURS.find((t) => t.id === tourId);
    if (!tour) return;
    startTour(tour.id);
    const firstStop = tour.stops[0];
    setAgeMa(firstStop.ageMa);
    setSelectedEntityId(firstStop.entityId);
    navigate('/earth');
  };

  const handleSelectQuizOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    const isCorrect = idx === currentQ.correctIndex;
    soundEngine.playQuizFeedback(isCorrect);
    if (isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    soundEngine.playClick();
    if (currentQIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQIndex((i) => i + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
      setQuizBestScore(score);
    }
  };

  const handleRestartQuiz = () => {
    soundEngine.playClick();
    setCurrentQIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0E0E0E]/80 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="MUSEO Stratigraphic Field Notebook, Guided Tours, Deep Time Quiz, and Ticket Stub"
    >
      <div className="w-full max-w-4xl bg-[#F2EDE4] text-[#0E0E0E] border-[4px] border-[#0E0E0E] shadow-[12px_12px_0px_#FFD400] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="bg-[#0E0E0E] text-[#F2EDE4] px-6 py-4 flex items-center justify-between gap-4 border-b-[3px] border-[#0E0E0E]">
          <div>
            <div className="text-[11px] font-mono-tabular text-[#FFD400] font-bold">
              CURATORIAL STUDY INSTRUMENT · FIELD NOTEBOOK & ACT 4 EXIT STUB
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display">
              Docent Tours, Saved Specimens, Quiz & Souvenir Ticket Stub
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleAudioMuted}
              className="px-3 py-1.5 text-xs font-mono-tabular font-bold bg-[#1C1C1C] text-[#F2EDE4] border border-[#F2EDE4]/40 hover:border-[#FFD400] inline-flex items-center gap-1.5 cursor-pointer"
              title="Toggle Web Audio Acoustics"
            >
              {audioMuted ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#FFD400]" />
              )}
              <span>{audioMuted ? 'Audio: Muted' : 'Audio: Active'}</span>
            </button>

            <button
              type="button"
              onClick={closeNotebook}
              className="p-2 bg-[#FFD400] text-[#0E0E0E] border-2 border-[#0E0E0E] cursor-pointer hover:bg-[#ffdf33]"
              aria-label="Close Field Notebook"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs + Stage Stamp Progress */}
        <div className="bg-[#E8E1D5] px-6 py-3 border-b-[3px] border-[#0E0E0E] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setNotebookTab('tours')}
              className={`px-3 py-2 text-xs font-bold font-display border-2 border-[#0E0E0E] inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                notebookTab === 'tours'
                  ? 'bg-[#0E0E0E] text-[#FFD400]'
                  : 'bg-white text-[#0E0E0E] hover:bg-[#F2EDE4]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Guided Tours (3)</span>
            </button>

            <button
              type="button"
              onClick={() => setNotebookTab('bookmarks')}
              className={`px-3 py-2 text-xs font-bold font-display border-2 border-[#0E0E0E] inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                notebookTab === 'bookmarks'
                  ? 'bg-[#0E0E0E] text-[#FFD400]'
                  : 'bg-white text-[#0E0E0E] hover:bg-[#F2EDE4]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Specimens ({bookmarkedIds.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setNotebookTab('quiz')}
              className={`px-3 py-2 text-xs font-bold font-display border-2 border-[#0E0E0E] inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                notebookTab === 'quiz'
                  ? 'bg-[#0E0E0E] text-[#FFD400]'
                  : 'bg-white text-[#0E0E0E] hover:bg-[#F2EDE4]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Deep Time Quiz</span>
            </button>

            <button
              type="button"
              onClick={() => setNotebookTab('stub')}
              className={`px-3 py-2 text-xs font-bold font-display border-2 border-[#0E0E0E] inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                notebookTab === 'stub'
                  ? 'bg-[#0E0E0E] text-[#FFD400]'
                  : 'bg-white text-[#0E0E0E] hover:bg-[#F2EDE4]'
              }`}
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Ticket Stub (PNG)</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono-tabular">
            <span>
              Eras Stamped: <strong>{visitedStages.length}/{EVOLUTION_STAGES.length}</strong>
            </span>
            {quizBestScore !== null && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Best Quiz: <strong>{quizBestScore}/{QUIZ_QUESTIONS.length}</strong>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {notebookTab === 'tours' && (
            <div className="space-y-4">
              <p className="text-sm text-[#4A4742]">
                Select a curated Robot Docent Tour to automatically pilot the 4.6-billion-year Earth Evolution Globe from epoch to epoch with synchronized specimen commentary.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {GUIDED_TOURS.map((tour) => (
                  <div
                    key={tour.id}
                    className="bg-white border-[3px] border-[#0E0E0E] shadow-[5px_5px_0px_#0E0E0E] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="text-xs font-mono-tabular font-bold text-[#4A4742]">
                        DOCENT TOUR {tour.index} · {tour.durationLabel}
                      </div>
                      <h3 className="text-xl font-bold font-display">{tour.title}</h3>
                      <p className="text-xs font-mono-tabular text-[#4A4742]">{tour.subtitle}</p>
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono-tabular">
                        {tour.stops.map((st, idx) => (
                          <span key={st.headline} className="text-[#0E0E0E]/80">
                            {idx > 0 ? '→ ' : ''}
                            {st.ageMa} Ma
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button variant="primary" onClick={() => handleLaunchTour(tour.id)}>
                      <Compass className="w-4 h-4" />
                      <span>Start Guided Tour</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {notebookTab === 'bookmarks' && (
            <div className="space-y-4">
              {bookmarkedIds.length === 0 ? (
                <div className="p-10 bg-white border-2 border-[#0E0E0E] text-center space-y-3">
                  <div className="text-lg font-bold font-display">
                    Your Stratigraphic Field Notebook Is Empty
                  </div>
                  <p className="text-sm text-[#4A4742]">
                    Bookmark fossils or cultural artifacts while exploring the Specimen Gallery or 3D Detail Viewer to build your personal study list.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      closeNotebook();
                      navigate('/gallery');
                    }}
                  >
                    Browse 20-Specimen Gallery
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bookmarkedIds.map((id) => {
                    const entity = getEntityById(id);
                    if (!entity) return null;
                    return (
                      <div
                        key={entity.id}
                        className="bg-white border-[3px] border-[#0E0E0E] shadow-[4px_4px_0px_#0E0E0E] p-4 flex flex-col justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono-tabular text-[#4A4742]">
                            <span>{entity.accessionNumber}</span>
                            <span className="font-bold text-[#0E0E0E]">{entity.ageDisplay}</span>
                          </div>
                          <h4 className="text-base font-bold font-display mt-1">
                            {entity.name}
                          </h4>
                          <p className="text-xs text-[#4A4742] mt-1 line-clamp-2">
                            {entity.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#0E0E0E]/15">
                          <button
                            type="button"
                            onClick={() => {
                              closeNotebook();
                              navigate(`/gallery/${entity.id}`);
                            }}
                            className="px-3 py-1.5 text-xs font-bold font-display bg-[#0E0E0E] text-[#FFD400] cursor-pointer"
                          >
                            Inspect 3D View
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleBookmark(entity.id)}
                            className="p-1.5 text-[#4A4742] hover:text-[#0E0E0E] cursor-pointer"
                            title="Remove from Field Notebook"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {notebookTab === 'quiz' && (
            <div className="space-y-5">
              {quizCompleted ? (
                <div className="bg-white border-[3px] border-[#0E0E0E] shadow-[6px_6px_0px_#0E0E0E] p-8 text-center space-y-4">
                  <Award className="w-12 h-12 mx-auto text-[#0E0E0E]" />
                  <div className="text-xs font-mono-tabular font-bold text-[#4A4742]">
                    CURATORIAL EVALUATION COMPLETE
                  </div>
                  <h3 className="text-3xl font-bold font-display">
                    You Scored {score} / {QUIZ_QUESTIONS.length}
                  </h3>
                  <p className="text-sm text-[#4A4742] max-w-md mx-auto">
                    {score >= 7
                      ? 'Distinction Achieved: Senior Paleontological & Archaeological Fellow.'
                      : 'Solid foundation! Review the linked 3D specimens to master every stratigraphic epoch.'}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <Button variant="primary" onClick={handleRestartQuiz}>
                      Retake Mastery Quiz
                    </Button>
                    <Button variant="secondary" onClick={() => setNotebookTab('stub')}>
                      Claim Souvenir Ticket Stub PNG
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-white border-[3px] border-[#0E0E0E] shadow-[6px_6px_0px_#0E0E0E] p-6 space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono-tabular font-bold text-[#4A4742]">
                    <span>
                      QUESTION 0{currentQIndex + 1} OF 0{QUIZ_QUESTIONS.length} ·{' '}
                      {currentQ.ageDisplay}
                    </span>
                    <span>CURRENT SCORE: {score}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display leading-snug">
                    {currentQ.question}
                  </h3>

                  <div className="space-y-2.5">
                    {currentQ.options.map((opt, idx) => {
                      const isPicked = selectedOption === idx;
                      const isCorrect = idx === currentQ.correctIndex;
                      let btnStyle = 'bg-[#F2EDE4] text-[#0E0E0E] hover:bg-[#E8E1D5]';

                      if (selectedOption !== null) {
                        if (isCorrect) {
                          btnStyle = 'bg-[#FFD400] text-[#0E0E0E] font-bold';
                        } else if (isPicked) {
                          btnStyle = 'bg-[#0E0E0E] text-[#F2EDE4] opacity-75';
                        }
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={selectedOption !== null}
                          onClick={() => handleSelectQuizOption(idx)}
                          className={`w-full p-3.5 text-left text-sm border-2 border-[#0E0E0E] transition-colors cursor-pointer ${btnStyle}`}
                        >
                          <span className="font-mono-tabular font-bold mr-2">
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedOption !== null && (
                    <div className="bg-[#0E0E0E] text-[#F2EDE4] p-4 border-2 border-[#FFD400] space-y-3">
                      <div className="text-xs font-mono-tabular font-bold text-[#FFD400]">
                        {selectedOption === currentQ.correctIndex
                          ? '✓ VERIFIED CURATORIAL FACT'
                          : '✕ CURATORIAL CORRECTION'}
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed">
                        {currentQ.explanation}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            closeNotebook();
                            navigate(`/gallery/${currentQ.relatedEntityId}`);
                          }}
                          className="text-xs font-mono-tabular text-[#FFD400] underline cursor-pointer"
                        >
                          Inspect Linked 3D Specimen →
                        </button>
                        <Button variant="primary" size="sm" onClick={handleNextQuestion}>
                          <span>
                            {currentQIndex + 1 < QUIZ_QUESTIONS.length
                              ? 'Next Question'
                              : 'Finish Quiz'}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {notebookTab === 'stub' && <ShareableTicketStub />}
        </div>
      </div>
    </div>
  );
}
