import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { BorderBeam, SpotlightCard } from '../../../components/reactbits';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { CATALOG_ENTITIES } from '../../../data';
import { isArtifact, isFossil } from '../../../lib/guards';
import { soundEngine } from '../../../lib/soundEngine';

export function ProvenanceVerificationSection() {
  const [selectedId, setSelectedId] = useState<string>('tyrannosaurus-rex-skull');
  const specimen =
    CATALOG_ENTITIES.find((e) => e.id === selectedId) ?? CATALOG_ENTITIES[0];

  return (
    <section className="py-16 lg:py-24 px-6 border-b-[4px] border-[#0E0E0E] bg-[#F2EDE4]">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          index="06"
          kicker="DISCRIMINATED UNION & PROVENANCE"
          title="Verifiable Curatorial Architecture"
          subtitle="Online museum galleries often mix unverified captions with untraceable 3D models. Every entry in MUSEO is governed by a strict TypeScript discriminated union (FossilSpecimen | CulturalArtifact) with verified institutional citations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Specimen Selector with Shared layoutId Active Highlight */}
          <div className="lg:col-span-5 bg-[#E8E1D5] border-[3px] border-[#0E0E0E] shadow-[6px_6px_0px_#0E0E0E] p-5 space-y-4">
            <div className="text-xs font-mono-tabular font-bold text-[#0E0E0E]">
              SELECT RECORD TO INSPECT TYPE NARROWING & SOURCE
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {CATALOG_ENTITIES.slice(0, 8).map((item) => {
                const active = item.id === specimen.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedId(item.id);
                    }}
                    className="relative p-3 text-left border-2 border-[#0E0E0E] flex items-center justify-between gap-2 cursor-pointer overflow-hidden bg-[#F2EDE4] hover:bg-[#FFD400]/40 transition-colors"
                  >
                    {active && (
                      <motion.span
                        layoutId="provenance-active-row"
                        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                        className="absolute inset-0 bg-[#0E0E0E] z-0"
                      />
                    )}
                    <div className="relative z-10 min-w-0">
                      <div
                        className={`text-[11px] font-mono-tabular ${
                          active ? 'text-[#FFD400]' : 'text-[#0E0E0E]/80'
                        }`}
                      >
                        {item.accessionNumber} · {item.type.toUpperCase()}
                      </div>
                      <div
                        className={`text-sm font-bold font-display truncate ${
                          active ? 'text-[#F2EDE4]' : 'text-[#0E0E0E]'
                        }`}
                      >
                        {item.name}
                      </div>
                    </div>
                    <span
                      className={`relative z-10 text-xs font-mono-tabular font-bold shrink-0 ${
                        active ? 'text-[#FFD400]' : 'text-[#0E0E0E]'
                      }`}
                    >
                      {item.ageDisplay}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Narrowed Record Inspector with SpotlightCard, BorderBeam & AnimatePresence */}
          <SpotlightCard
            spotlightColor="rgba(255, 212, 0, 0.16)"
            className="lg:col-span-7 relative bg-[#0E0E0E] text-[#F2EDE4] border-[4px] border-[#0E0E0E] shadow-[10px_10px_0px_#FFD400] p-6 sm:p-8"
          >
            <BorderBeam colorFrom="#FFD400" colorTo="#4F86F7" duration={6.5} />

            <AnimatePresence mode="wait">
              <motion.div
                key={specimen.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: 'spring', stiffness: 330, damping: 27 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F2EDE4]/20 pb-4">
                  <div>
                    <div className="text-xs font-mono-tabular text-[#FFD400]">
                      TYPE GUARD NARROWING:{' '}
                      {isFossil(specimen)
                        ? 'isFossil(e) === true'
                        : 'isArtifact(e) === true'}
                    </div>
                    <h3 className="text-2xl font-bold font-display mt-1">
                      {specimen.name}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD400] text-[#0E0E0E] text-xs font-mono-tabular font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    SOURCE VERIFIED
                  </span>
                </div>

                {/* Discriminated Union Specific Fields */}
                {isFossil(specimen) && (
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-mono-tabular">
                    <div className="bg-[#1C1C1C] p-3.5 border border-[#F2EDE4]/25">
                      <dt className="text-xs text-[#F2EDE4]/60">DISCRIMINATOR (type)</dt>
                      <dd className="text-[#FFD400] font-bold mt-0.5">
                        "fossil" (FossilSpecimen)
                      </dd>
                    </div>
                    <div className="bg-[#1C1C1C] p-3.5 border border-[#F2EDE4]/25">
                      <dt className="text-xs text-[#F2EDE4]/60">
                        RADIOMETRIC / BIOSTRATIGRAPHIC AGE
                      </dt>
                      <dd className="font-bold mt-0.5">
                        {specimen.ageMa} Ma ({specimen.geologicalPeriod})
                      </dd>
                    </div>
                    <div className="bg-[#1C1C1C] p-3.5 border border-[#F2EDE4]/25">
                      <dt className="text-xs text-[#F2EDE4]/60">TAXON & CLADE</dt>
                      <dd className="font-bold mt-0.5">
                        {specimen.taxon} · {specimen.clade}
                      </dd>
                    </div>
                    <div className="bg-[#1C1C1C] p-3.5 border border-[#F2EDE4]/25">
                      <dt className="text-xs text-[#F2EDE4]/60">STRATIGRAPHIC FORMATION</dt>
                      <dd className="font-bold mt-0.5">{specimen.stratigraphicFormation}</dd>
                    </div>
                  </dl>
                )}

                {isArtifact(specimen) && (
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-mono-tabular">
                    <div className="bg-[#1C1C1C] p-3.5 border border-[#F2EDE4]/25">
                      <dt className="text-xs text-[#F2EDE4]/60">DISCRIMINATOR (type)</dt>
                      <dd className="text-[#FFD400] font-bold mt-0.5">
                        "artifact" (CulturalArtifact)
                      </dd>
                    </div>
                    <div className="bg-[#1C1C1C] p-3.5 border border-[#F2EDE4]/25">
                      <dt className="text-xs text-[#F2EDE4]/60">ARCHAEOLOGICAL PERIOD</dt>
                      <dd className="font-bold mt-0.5">
                        {specimen.archaeologicalPeriod} ({specimen.ageDisplay})
                      </dd>
                    </div>
                    <div className="bg-[#1C1C1C] p-3.5 border border-[#F2EDE4]/25">
                      <dt className="text-xs text-[#F2EDE4]/60">CULTURE & HOMININ MAKER</dt>
                      <dd className="font-bold mt-0.5">
                        {specimen.culture} · {specimen.homininSpecies}
                      </dd>
                    </div>
                    <div className="bg-[#1C1C1C] p-3.5 border border-[#F2EDE4]/25">
                      <dt className="text-xs text-[#F2EDE4]/60">MATERIAL & TECHNIQUE</dt>
                      <dd className="font-bold mt-0.5">{specimen.material}</dd>
                    </div>
                  </dl>
                )}

                <div className="bg-[#1C1C1C] p-4 border-2 border-[#FFD400]/60 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono-tabular font-bold text-[#FFD400]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>PRIMARY LITERATURE & INSTITUTIONAL CITATION</span>
                  </div>
                  <p className="text-sm font-mono-tabular text-[#F2EDE4]">
                    {specimen.source}
                  </p>
                  <p className="text-xs font-mono-tabular text-[#F2EDE4]/70">
                    Repository: {specimen.sourceInstitution} · License: {specimen.license}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
