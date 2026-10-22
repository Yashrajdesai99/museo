import { RotateCcw, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { ArchitecturalGridBg, SpotlightCard } from '../components/reactbits';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/ui/SectionHeader';
import { CATALOG_ENTITIES, EVOLUTION_STAGES } from '../data';
import { isArtifact, isFossil } from '../lib/guards';
import { soundEngine } from '../lib/soundEngine';
import { useTimelineStore } from '../state/timelineStore';
import type { CatalogEntity } from '../types/catalog';
import type { EvolutionStageId } from '../types/evolution';

type TypeFilter = 'all' | 'fossil' | 'artifact';
type SortOrder = 'oldest' | 'newest' | 'alpha';

export default function GalleryPage() {
  const navigate = useNavigate();
  const { setAgeMa, setSelectedEntityId } = useTimelineStore();

  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [stageFilter, setStageFilter] = useState<EvolutionStageId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('oldest');

  const filteredEntities = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return CATALOG_ENTITIES.filter((entity) => {
      if (typeFilter === 'fossil' && !isFossil(entity)) return false;
      if (typeFilter === 'artifact' && !isArtifact(entity)) return false;
      if (stageFilter !== 'all' && !entity.stageIds.includes(stageFilter)) return false;

      if (q) {
        const extraText = isFossil(entity)
          ? `${entity.taxon} ${entity.clade} ${entity.locality} ${entity.stratigraphicFormation}`
          : `${entity.culture} ${entity.originRegion} ${entity.material} ${entity.homininSpecies}`;
        const combined =
          `${entity.name} ${entity.subtitle} ${entity.hook} ${entity.story} ${entity.whyItMatters} ${entity.facts.join(' ')} ${entity.accessionNumber} ${entity.sourceInstitution} ${extraText}`.toLowerCase();
        if (!combined.includes(q)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOrder === 'oldest') return b.ageMa - a.ageMa;
      if (sortOrder === 'newest') return a.ageMa - b.ageMa;
      return a.name.localeCompare(b.name);
    });
  }, [typeFilter, stageFilter, searchQuery, sortOrder]);

  const handleLocateOnGlobe = (entity: CatalogEntity) => {
    soundEngine.playClick();
    setAgeMa(entity.ageMa);
    setSelectedEntityId(entity.id);
    navigate('/earth');
  };

  const handleResetFilters = () => {
    soundEngine.playClick();
    setTypeFilter('all');
    setStageFilter('all');
    setSearchQuery('');
    setSortOrder('oldest');
  };

  return (
    <PageShell>
      <ArchitecturalGridBg className="min-h-screen">
        <div className="max-w-[1440px] mx-auto px-6 py-12 lg:py-16">
          <SectionHeader
            index="01"
            kicker="FACT-VERIFIED ARCHIVE · ACT 3"
            title="Specimen & Artifact Gallery"
            subtitle="Browse all 20 institution-verified paleontological fossils and archaeological artifacts. Filter by specimen type, geological stage, or search by taxon, hook, formation, and provenance."
          />

          {/* Brutalist Filter & Search Bar with 21st.dev / Shotreel Shared layoutId Tabs */}
          <SpotlightCard
            spotlightColor="rgba(255, 212, 0, 0.22)"
            className="bg-[#E8E1D5] border-[3px] border-[#0E0E0E] shadow-[6px_6px_0px_#0E0E0E] p-5 mb-10 space-y-5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
              {/* Search Input */}
              <div className="lg:col-span-5 space-y-1.5">
                <label
                  htmlFor="catalog-search"
                  className="block text-xs font-mono-tabular font-bold"
                >
                  SEARCH BY NAME, TAXON, HOOK, FORMATION OR LOCALITY
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A4742]" />
                  <input
                    id="catalog-search"
                    type="text"
                    placeholder="e.g., Tyrannosaurus, Burgess Shale, Acheulean, cholesterol, ACC-F-006..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white text-[#0E0E0E] border-2 border-[#0E0E0E] text-sm font-body focus:outline-none focus:shadow-[3px_3px_0px_#FFD400] transition-shadow"
                  />
                </div>
              </div>

              {/* Type Segmented Control with Shared layoutId */}
              <div className="lg:col-span-4 space-y-1.5">
                <span className="block text-xs font-mono-tabular font-bold">
                  SPECIMEN TYPE (DISCRIMINATED UNION)
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(
                    [
                      { id: 'all', label: 'All (20)' },
                      { id: 'fossil', label: 'Fossils (14)' },
                      { id: 'artifact', label: 'Artifacts (6)' }
                    ] as const
                  ).map((tab) => {
                    const active = typeFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          setTypeFilter(tab.id);
                        }}
                        className="relative px-3 py-2.5 text-xs font-bold font-display border-2 border-[#0E0E0E] cursor-pointer whitespace-nowrap overflow-hidden bg-white hover:bg-[#F2EDE4]"
                      >
                        {active && (
                          <motion.span
                            layoutId="gallery-type-pill"
                            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                            className="absolute inset-0 bg-[#0E0E0E] z-0"
                          />
                        )}
                        <span
                          className={`relative z-10 ${
                            active ? 'text-[#FFD400]' : 'text-[#0E0E0E]'
                          }`}
                        >
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort Control with Shared layoutId */}
              <div className="lg:col-span-3 space-y-1.5">
                <span className="block text-xs font-mono-tabular font-bold">
                  CHRONOLOGICAL ORDER
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(
                    [
                      { id: 'oldest', label: 'Oldest (Ma)' },
                      { id: 'newest', label: 'Recent' },
                      { id: 'alpha', label: 'A → Z' }
                    ] as const
                  ).map((sort) => {
                    const active = sortOrder === sort.id;
                    return (
                      <button
                        key={sort.id}
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          setSortOrder(sort.id);
                        }}
                        className="relative px-2.5 py-2.5 text-xs font-bold font-display border-2 border-[#0E0E0E] cursor-pointer whitespace-nowrap overflow-hidden bg-white hover:bg-[#F2EDE4]"
                      >
                        {active && (
                          <motion.span
                            layoutId="gallery-sort-pill"
                            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                            className="absolute inset-0 bg-[#FFD400] z-0"
                          />
                        )}
                        <span className="relative z-10 text-[#0E0E0E]">{sort.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Evolution Stage Filter Row with Shared layoutId */}
            <div className="pt-4 border-t-2 border-[#0E0E0E]/15 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono-tabular font-bold mr-1">
                  GEOLOGICAL STAGE:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setStageFilter('all');
                  }}
                  className="relative px-3 py-1.5 text-xs font-bold font-display border-2 border-[#0E0E0E] cursor-pointer whitespace-nowrap overflow-hidden bg-white hover:bg-[#F2EDE4]"
                >
                  {stageFilter === 'all' && (
                    <motion.span
                      layoutId="gallery-stage-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      className="absolute inset-0 bg-[#0E0E0E] z-0"
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      stageFilter === 'all' ? 'text-[#FFD400]' : 'text-[#0E0E0E]'
                    }`}
                  >
                    All Stages (4,600–0 Ma)
                  </span>
                </button>

                {EVOLUTION_STAGES.map((stage) => {
                  const active = stageFilter === stage.id;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setStageFilter(stage.id);
                      }}
                      className="relative px-3 py-1.5 text-xs font-bold font-display border-2 border-[#0E0E0E] cursor-pointer whitespace-nowrap overflow-hidden bg-white hover:bg-[#F2EDE4]"
                    >
                      {active && (
                        <motion.span
                          layoutId="gallery-stage-pill"
                          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                          className="absolute inset-0 bg-[#0E0E0E] z-0"
                        />
                      )}
                      <span
                        className={`relative z-10 inline-flex items-center gap-1.5 ${
                          active ? 'text-[#FFD400]' : 'text-[#0E0E0E]'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 border border-[#0E0E0E]"
                          style={{ backgroundColor: stage.palette.sceneBgTint }}
                        />
                        <span>
                          {stage.index}. {stage.name}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="text-xs font-mono-tabular font-bold">
                Showing {filteredEntities.length} of {CATALOG_ENTITIES.length} verified records
              </div>
            </div>
          </SpotlightCard>

          {/* Results Grid with Kinetics Layout Choreography or Empty State */}
          {filteredEntities.length === 0 ? (
            <div className="bg-[#E8E1D5] border-[3px] border-[#0E0E0E] p-12 text-center space-y-4">
              <h3 className="text-2xl font-bold font-display">
                No Specimens Match Your Current Filter Criteria
              </h3>
              <p className="text-sm text-[#4A4742] max-w-md mx-auto">
                Note that human Cultural Artifacts belong exclusively to Stage 05 (Cenozoic, 3.3 Ma to Present). Reset filters to view all 20 records.
              </p>
              <Button variant="primary" onClick={handleResetFilters}>
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </Button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredEntities.map((entity) => (
                  <motion.div
                    layout
                    key={entity.id}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                  >
                    <Card
                      entity={entity}
                      onLocateOnGlobe={handleLocateOnGlobe}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </ArchitecturalGridBg>
    </PageShell>
  );
}
