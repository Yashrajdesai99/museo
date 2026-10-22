import { ArrowUpRight, CheckCircle2, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStageById } from '../../data';
import { isFossil } from '../../lib/guards';
import type { CatalogEntity } from '../../types/catalog';
import {
  AnimatedContent,
  BorderBeam,
  DecryptedText,
  Magnet,
  SpotlightCard,
  TiltedCard
} from '../reactbits';
import { Badge } from './Badge';

interface CardProps {
  entity: CatalogEntity;
  onLocateOnGlobe?: (entity: CatalogEntity) => void;
}

/**
 * Renders a deterministic architectural SVG technical diagram for each specimen
 * so catalog cards load instantaneously with zero external broken URLs.
 */
function SpecimenTechnicalGraphic({ entity }: { entity: CatalogEntity }) {
  const fossil = isFossil(entity);
  const stage = getStageById(entity.stageIds[0]);

  return (
    <div className="relative h-48 w-full bg-[#0E0E0E] text-[#F2EDE4] border-b-[3px] border-[#0E0E0E] overflow-hidden flex items-center justify-center p-4 group-hover:bg-[#161616] transition-colors">
      {/* Subtle era tint bar along top of specimen viewport */}
      <div
        className="absolute top-0 inset-x-0 h-1.5"
        style={{ backgroundColor: stage.palette.sceneBgTint }}
      />

      {/* Subtle architectural coordinate grid */}
      <svg
        className="w-full h-full max-w-[220px] max-h-[150px] transition-transform duration-300 group-hover:scale-105"
        viewBox="0 0 200 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={entity.name}
      >
        <line x1="0" y1="70" x2="200" y2="70" stroke="#F2EDE4" strokeOpacity="0.14" strokeWidth="1" />
        <line x1="100" y1="0" x2="100" y2="140" stroke="#F2EDE4" strokeOpacity="0.14" strokeWidth="1" />
        <rect x="8" y="8" width="184" height="124" stroke="#F2EDE4" strokeOpacity="0.22" strokeWidth="1.5" />

        {fossil ? (
          <>
            <circle cx="100" cy="70" r="44" stroke="#F2EDE4" strokeWidth="2.5" />
            <circle cx="100" cy="70" r="28" stroke="#FFD400" strokeWidth="2" strokeDasharray="4 4" />
            <path
              d="M72 70 C72 52, 128 52, 128 70 C128 88, 72 88, 72 70 Z"
              stroke="#F2EDE4"
              strokeWidth="2"
              fill="#F2EDE4"
              fillOpacity="0.08"
            />
            <line x1="56" y1="70" x2="144" y2="70" stroke="#FFD400" strokeWidth="1.5" />
          </>
        ) : (
          <>
            <polygon
              points="100,20 146,70 100,120 54,70"
              stroke="#F2EDE4"
              strokeWidth="2.5"
              fill="#F2EDE4"
              fillOpacity="0.08"
            />
            <polygon
              points="100,34 130,70 100,106 70,70"
              stroke="#FFD400"
              strokeWidth="1.75"
            />
            <line x1="70" y1="70" x2="130" y2="70" stroke="#F2EDE4" strokeWidth="1.5" />
          </>
        )}
      </svg>

      <div className="absolute top-3 left-3 text-[11px] font-mono-tabular text-[#F2EDE4]/80">
        <DecryptedText text={entity.accessionNumber} speed={24} maxIterations={9} />
      </div>
      <div className="absolute bottom-3 left-3 text-[10px] font-mono-tabular text-[#F2EDE4]/70 inline-flex items-center gap-1">
        <CheckCircle2 className="w-3 h-3 text-[#FFD400]" />
        <span>{entity.facts.length} Verified Facts</span>
      </div>
      <div className="absolute bottom-3 right-3 text-xs font-mono-tabular font-bold text-[#FFD400]">
        <DecryptedText text={entity.ageDisplay} speed={24} maxIterations={8} />
      </div>
    </div>
  );
}

export function Card({ entity, onLocateOnGlobe }: CardProps) {
  const stage = getStageById(entity.stageIds[0]);

  // Strict type guard narrowing (never cast)
  const secondaryMeta = isFossil(entity)
    ? `${entity.taxon} · ${entity.locality}`
    : `${entity.culture} · ${entity.originRegion}`;

  return (
    <AnimatedContent distance={34} scale={0.97} className="h-full">
      <TiltedCard rotateAmplitude={4.5} scaleOnHover={1.012} className="h-full">
        <SpotlightCard
          spotlightColor="rgba(255, 212, 0, 0.24)"
          className="group h-full bg-[#F2EDE4] border-[3px] border-[#0E0E0E] shadow-[6px_6px_0px_#0E0E0E] transition-shadow duration-200 hover:shadow-[10px_10px_0px_#0E0E0E]"
        >
          {entity.featured && (
            <BorderBeam
              colorFrom="#FFD400"
              colorTo={stage.palette.sceneBgTint}
              duration={7}
            />
          )}
          <article
            className="h-full flex flex-col justify-between"
            data-cursor-label="OPEN"
          >
            <div>
              <Link
                to={`/gallery/${entity.id}`}
                state={{ fromGalleryCard: true, cardTitle: entity.name }}
                className="block"
              >
                <SpecimenTechnicalGraphic entity={entity} />
              </Link>

              <div className="p-5 space-y-3">
                {/* Unboxed metadata line */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono-tabular text-[#4A4742]">
                  <Badge type={entity.type} />
                  <span aria-hidden="true">·</span>
                  <span>Stage {stage.index}: {stage.name}</span>
                </div>

                <h3 className="text-xl font-bold font-display text-[#0E0E0E] leading-snug">
                  <Link
                    to={`/gallery/${entity.id}`}
                    state={{ fromGalleryCard: true, cardTitle: entity.name }}
                    className="hover:underline focus-visible:underline"
                  >
                    {entity.name}
                  </Link>
                </h3>

                <p className="text-xs font-mono-tabular text-[#4A4742] line-clamp-1">
                  {secondaryMeta}
                </p>

                {/* One-line Curatorial Hook (design.md Section 7.2) */}
                <p className="text-sm font-medium text-[#0E0E0E] leading-relaxed line-clamp-3 border-l-[3px] border-[#0E0E0E] pl-3 bg-[#E8E1D5]/60 py-1.5">
                  {entity.hook}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-3 border-t-2 border-[#0E0E0E]/15 space-y-3">
              <div
                className="flex items-center justify-between gap-2 text-[11px] font-mono-tabular text-[#4A4742]"
                title={entity.sourceInstitution}
              >
                <span className="truncate">Source: {entity.sourceInstitution}</span>
                <span className="shrink-0 font-bold text-[#0E0E0E]">
                  {entity.license.split(' ')[0]}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <Magnet padding={24} magnetStrength={4}>
                  <Link
                    to={`/gallery/${entity.id}`}
                    state={{ fromGalleryCard: true, cardTitle: entity.name }}
                    data-cursor-label="OPEN"
                    className="group/cta inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold font-display bg-[#0E0E0E] text-[#F2EDE4] border-2 border-[#0E0E0E] hover:bg-[#FFD400] hover:text-[#0E0E0E] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Open 3D Specimen</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                  </Link>
                </Magnet>

                {onLocateOnGlobe && (
                  <button
                    type="button"
                    onClick={() => onLocateOnGlobe(entity)}
                    data-cursor-label="GLOBE"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold font-display bg-[#F2EDE4] text-[#0E0E0E] border-2 border-[#0E0E0E] hover:bg-[#FFD400] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    title={`Scrub globe to ${entity.ageDisplay}`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Globe</span>
                  </button>
                )}
              </div>
            </div>
          </article>
        </SpotlightCard>
      </TiltedCard>
    </AnimatedContent>
  );
}
