import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  CheckCircle2,
  Compass,
  Copy,
  ExternalLink,
  Lightbulb,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import {
  AnimatedContent,
  DecryptedText,
  Magnet,
  SplitText
} from '../components/reactbits';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CATALOG_ENTITIES, getEntityById, getStageById } from '../data';
import { isArtifact, isFossil } from '../lib/guards';
import { soundEngine } from '../lib/soundEngine';
import { ModelViewer } from '../scenes/gallery/ModelViewer';
import { useStudyStore } from '../state/studyStore';
import { useTimelineStore } from '../state/timelineStore';

interface LocationState {
  fromGalleryCard?: boolean;
  cardTitle?: string;
}

export default function EntityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = (location.state as LocationState | null) ?? null;

  const { setAgeMa, setSelectedEntityId } = useTimelineStore();
  const { bookmarkedIds, toggleBookmark } = useStudyStore();
  const [copiedFormat, setCopiedFormat] = useState<'apa' | 'bibtex' | null>(null);
  const [revealExpanded, setRevealExpanded] = useState(false);

  const entity = id ? getEntityById(id) : undefined;

  useEffect(() => {
    setRevealExpanded(false);
    const timer = requestAnimationFrame(() => setRevealExpanded(true));
    return () => cancelAnimationFrame(timer);
  }, [id]);

  if (!entity) {
    return (
      <PageShell>
        <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-5">
          <div className="text-xs font-mono-tabular font-bold text-[#4A4742]">
            ARCHIVAL RECORD NOT FOUND
          </div>
          <h1 className="text-4xl font-bold font-display">
            Specimen Accession ID Does Not Exist
          </h1>
          <Button variant="primary" onClick={() => navigate('/gallery')}>
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Specimen Gallery</span>
          </Button>
        </div>
      </PageShell>
    );
  }

  const stage = getStageById(entity.stageIds[0]);
  const isSaved = bookmarkedIds.includes(entity.id);
  const currentIndex = CATALOG_ENTITIES.findIndex((e) => e.id === entity.id);
  const prevEntity =
    CATALOG_ENTITIES[(currentIndex - 1 + CATALOG_ENTITIES.length) % CATALOG_ENTITIES.length];
  const nextEntity =
    CATALOG_ENTITIES[(currentIndex + 1) % CATALOG_ENTITIES.length];

  const handleJumpToGlobe = () => {
    soundEngine.playClick();
    setAgeMa(entity.ageMa);
    setSelectedEntityId(entity.id);
    navigate('/earth');
  };

  const handleCopyCitation = (format: 'apa' | 'bibtex') => {
    soundEngine.playClick();
    const text =
      format === 'apa'
        ? `${entity.sourceInstitution}. (${entity.ageDisplay}). ${entity.name} [${entity.accessionNumber}]. Verified via ${entity.source}`
        : `@misc{museo_${entity.id.replace(/-/g, '_')},\n  title = {${entity.name} (${entity.accessionNumber})},\n  author = {{${entity.sourceInstitution}}},\n  note = {Age: ${entity.ageDisplay}. Source: ${entity.source}},\n  url = {${entity.sourceUrl}}\n}`;

    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <PageShell>
      <div className="max-w-[1440px] mx-auto px-6 py-10 lg:py-14 space-y-10">
        {/* Continuous Card-to-3D Specimen Reveal Banner (design.md Section 5.4) */}
        <div
          className={`bg-[#0E0E0E] text-[#F2EDE4] border-[3px] border-[#0E0E0E] shadow-[6px_6px_0px_#FFD400] p-4 sm:p-5 transition-all duration-500 ${
            revealExpanded
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-3 scale-[0.98]'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold font-display bg-[#F2EDE4] text-[#0E0E0E] border-2 border-[#0E0E0E] hover:bg-[#FFD400] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Collection (20)</span>
              </Link>

              <span className="text-xs font-mono-tabular text-[#FFD400] font-bold">
                <DecryptedText
                  text={`${entity.accessionNumber} · ${entity.ageDisplay}`}
                  speed={22}
                  maxIterations={10}
                />
              </span>

              <span
                className="px-2.5 py-0.5 text-[11px] font-mono-tabular font-bold border border-[#F2EDE4]/40 text-[#F2EDE4]"
                style={{ backgroundColor: stage.palette.sceneBgTint }}
              >
                Stage {stage.index}: {stage.name} ({stage.palette.eraTintName})
              </span>

              {routeState?.fromGalleryCard && (
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono-tabular text-[#F2EDE4]/70">
                  <Sparkles className="w-3 h-3 text-[#FFD400]" />
                  <span>Expanded from Archival Card into 3D Specimen Lab</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Button
                variant={isSaved ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => toggleBookmark(entity.id)}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isSaved ? 'Saved in Field Notebook' : 'Save to Field Notebook'}</span>
              </Button>

              <Magnet padding={30} magnetStrength={3.5}>
                <Button variant="primary" size="sm" onClick={handleJumpToGlobe}>
                  <Compass className="w-4 h-4" />
                  <span>Locate on 3D Globe ({entity.ageDisplay})</span>
                </Button>
              </Magnet>
            </div>
          </div>
        </div>

        {/* Main 2-Column Museum Accession View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Interactive 360° 3D Specimen Workbench + Verified Facts */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className={`transition-all duration-500 ${
                revealExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <ModelViewer entity={entity} />
            </div>

            <div className="bg-[#E8E1D5] border-[3px] border-[#0E0E0E] p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tabular">
              <span>
                Coordinates: {entity.orbitCoordinates.lat.toFixed(2)}°,{' '}
                {entity.orbitCoordinates.lon.toFixed(2)}°
              </span>
              <span>3D Asset Path: {entity.model}</span>
              <span>License: {entity.license}</span>
            </div>

            {/* Verified Specimen Facts (3–5 bullet points from design.md Section 7.2) */}
            <AnimatedContent distance={28} delay={0.1}>
              <div className="bg-[#F2EDE4] border-[3px] border-[#0E0E0E] shadow-[6px_6px_0px_#0E0E0E] p-6 space-y-4">
                <div className="flex items-center justify-between gap-2 border-b-2 border-[#0E0E0E] pb-2.5">
                  <span className="text-xs font-mono-tabular font-bold">
                    VERIFIED SPECIMEN FACTS ({entity.facts.length} PEER-REVIEWED POINTS)
                  </span>
                  <span className="text-[11px] font-mono-tabular font-bold bg-[#0E0E0E] text-[#FFD400] px-2 py-0.5">
                    {entity.accessionNumber}
                  </span>
                </div>

                <ul className="space-y-3">
                  {entity.facts.map((fact, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-[#0E0E0E] leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0E0E0E] fill-[#FFD400] shrink-0 mt-0.5" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContent>
          </div>

          {/* Right: Curatorial Dossier (Hook, 80-120w Story, Why It Matters, & Accession Register) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3 border-b-[3px] border-[#0E0E0E] pb-5">
              <div className="flex items-center gap-2 text-xs font-mono-tabular">
                <Badge type={entity.type} accessionNumber={entity.accessionNumber} />
                <span aria-hidden="true">·</span>
                <span className="font-bold">
                  Stage {stage.index}: {stage.name}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold font-display leading-tight">
                <SplitText text={entity.name} splitBy="words" delay={0.04} />
              </h1>

              <p className="text-base font-semibold text-[#4A4742]">
                {entity.subtitle}
              </p>

              {/* One-Line Curatorial Hook */}
              <AnimatedContent distance={18} delay={0.08}>
                <div className="bg-[#FFD400] text-[#0E0E0E] border-[2px] border-[#0E0E0E] p-3.5 text-sm font-bold font-display leading-snug">
                  "{entity.hook}"
                </div>
              </AnimatedContent>
            </div>

            {/* 80-120 Word Curatorial Story with Drop Cap */}
            <AnimatedContent distance={22} delay={0.14}>
              <div className="space-y-2.5">
                <div className="text-xs font-mono-tabular font-bold tracking-wider text-[#4A4742]">
                  CURATORIAL STORY (ARCHIVE NARRATIVE)
                </div>
                <p className="text-base text-[#0E0E0E] leading-relaxed max-w-prose first-letter:text-4xl first-letter:font-display first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:leading-none">
                  {entity.story}
                </p>
              </div>
            </AnimatedContent>

            {/* Why It Matters Callout Block */}
            <AnimatedContent distance={22} delay={0.2}>
              <div className="bg-[#E8E1D5] border-[3px] border-[#0E0E0E] p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono-tabular font-bold text-[#0E0E0E]">
                  <Lightbulb className="w-4 h-4 fill-[#FFD400]" />
                  <span>WHY IT MATTERS IN DEEP TIME</span>
                </div>
                <p className="text-sm text-[#0E0E0E] font-medium leading-relaxed">
                  {entity.whyItMatters}
                </p>
              </div>
            </AnimatedContent>

            {/* Structured Museum Accession Metadata Grid (dl) narrowed via type guards */}
            <AnimatedContent distance={24} delay={0.25}>
              <div className="bg-[#E8E1D5] border-[3px] border-[#0E0E0E] shadow-[6px_6px_0px_#0E0E0E] p-5 space-y-4">
                <div className="text-xs font-mono-tabular font-bold border-b-2 border-[#0E0E0E] pb-2">
                  MUSEUM ACCESSION REGISTER · {entity.accessionNumber}
                </div>

                {isFossil(entity) && (
                  <dl className="divide-y divide-[#0E0E0E]/20 text-sm font-mono-tabular">
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#4A4742]">Geological Age</dt>
                      <dd className="font-bold text-right">{entity.ageDisplay}</dd>
                    </div>
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#4A4742]">Taxon</dt>
                      <dd className="font-bold text-right">{entity.taxon}</dd>
                    </div>
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#4A4742]">Clade</dt>
                      <dd className="font-bold text-right">{entity.clade}</dd>
                    </div>
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#4A4742]">Stratigraphic Period</dt>
                      <dd className="font-bold text-right">{entity.geologicalPeriod}</dd>
                    </div>
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#4A4742]">Formation</dt>
                      <dd className="font-bold text-right">{entity.stratigraphicFormation}</dd>
                    </div>
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#4A4742]">Locality</dt>
                      <dd className="font-bold text-right">{entity.locality}</dd>
                    </div>
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#4A4742]">Preservation</dt>
                      <dd className="font-bold text-right">{entity.preservationMode}</dd>
                    </div>
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#4A4742]">Dimensions</dt>
                      <dd className="font-bold text-right">{entity.dimensions}</dd>
                    </div>
                  </dl>
                )}

                {isArtifact(entity) && (
                  <dl className="divide-y divide-[#0E0E0E]/20 text-sm font-mono-tabular">
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#4A4742]">Chronological Age</dt>
                      <dd className="font-bold text-right">{entity.ageDisplay}</dd>
                    </div>
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#4A4742]">Cultural Tradition</dt>
                      <dd className="font-bold text-right">{entity.culture}</dd>
                    </div>
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#4A4742]">Archaeological Period</dt>
                      <dd className="font-bold text-right">{entity.archaeologicalPeriod}</dd>
                    </div>
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#4A4742]">Hominin Maker</dt>
                      <dd className="font-bold text-right">{entity.homininSpecies}</dd>
                    </div>
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#4A4742]">Origin Region</dt>
                      <dd className="font-bold text-right">{entity.originRegion}</dd>
                    </div>
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#4A4742]">Material</dt>
                      <dd className="font-bold text-right">{entity.material}</dd>
                    </div>
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#4A4742]">Manufacturing Technique</dt>
                      <dd className="font-bold text-right">{entity.technique}</dd>
                    </div>
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#4A4742]">Dimensions</dt>
                      <dd className="font-bold text-right">{entity.dimensions}</dd>
                    </div>
                  </dl>
                )}
              </div>
            </AnimatedContent>

            {/* Fact Verification Source & Academic Citation Exporter */}
            <AnimatedContent distance={24} delay={0.3}>
              <div className="bg-[#0E0E0E] text-[#F2EDE4] border-[3px] border-[#0E0E0E] p-5 space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs font-mono-tabular font-bold text-[#FFD400]">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>VERIFIED SCIENTIFIC & MUSEUM SOURCE</span>
                  </span>
                  <a
                    href={entity.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#FFD400] hover:underline"
                  >
                    <span>Archive Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs font-mono-tabular leading-relaxed">
                  {entity.source}
                </p>
                <div className="text-xs font-mono-tabular text-[#F2EDE4]/75">
                  Repository: {entity.sourceInstitution} · License: {entity.license}
                </div>

                <div className="pt-2 border-t border-[#F2EDE4]/20 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyCitation('apa')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tabular font-bold bg-[#1C1C1C] text-[#F2EDE4] border border-[#F2EDE4]/40 hover:border-[#FFD400] cursor-pointer"
                  >
                    {copiedFormat === 'apa' ? (
                      <Check className="w-3.5 h-3.5 text-[#FFD400]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedFormat === 'apa' ? 'Copied APA!' : 'Copy APA Citation'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopyCitation('bibtex')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tabular font-bold bg-[#1C1C1C] text-[#F2EDE4] border border-[#F2EDE4]/40 hover:border-[#FFD400] cursor-pointer"
                  >
                    {copiedFormat === 'bibtex' ? (
                      <Check className="w-3.5 h-3.5 text-[#FFD400]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedFormat === 'bibtex' ? 'Copied BibTeX!' : 'Copy BibTeX'}</span>
                  </button>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </div>

        {/* Sequential Specimen Navigation Footer */}
        <div className="pt-8 border-t-[3px] border-[#0E0E0E] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <Link
            to={`/gallery/${prevEntity.id}`}
            state={{ fromGalleryCard: true, cardTitle: prevEntity.name }}
            className="p-4 bg-[#E8E1D5] border-[3px] border-[#0E0E0E] shadow-[4px_4px_0px_#0E0E0E] hover:bg-[#FFD400] transition-colors flex items-center gap-3"
          >
            <ArrowLeft className="w-5 h-5 shrink-0" />
            <div>
              <div className="text-[11px] font-mono-tabular text-[#4A4742]">
                PREVIOUS SPECIMEN · {prevEntity.accessionNumber}
              </div>
              <div className="text-sm font-bold font-display">{prevEntity.name}</div>
            </div>
          </Link>

          <Link
            to={`/gallery/${nextEntity.id}`}
            state={{ fromGalleryCard: true, cardTitle: nextEntity.name }}
            className="p-4 bg-[#E8E1D5] border-[3px] border-[#0E0E0E] shadow-[4px_4px_0px_#0E0E0E] hover:bg-[#FFD400] transition-colors flex items-center justify-end gap-3 text-right"
          >
            <div>
              <div className="text-[11px] font-mono-tabular text-[#4A4742]">
                NEXT SPECIMEN · {nextEntity.accessionNumber}
              </div>
              <div className="text-sm font-bold font-display">{nextEntity.name}</div>
            </div>
            <ArrowRight className="w-5 h-5 shrink-0" />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
