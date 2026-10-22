import { PageShell } from '../../components/layout/PageShell';
import { ScrollVelocity } from '../../components/reactbits';
import { AdmissionPortalSection } from './sections/AdmissionPortalSection';
import { DeepTimeScaleSection } from './sections/DeepTimeScaleSection';
import { EvolutionStagesSection } from './sections/EvolutionStagesSection';
import { ExtinctionTurningPointsSection } from './sections/ExtinctionTurningPointsSection';
import { FeaturedSpecimensSection } from './sections/FeaturedSpecimensSection';
import { HeroSection } from './sections/HeroSection';
import { ProvenanceVerificationSection } from './sections/ProvenanceVerificationSection';

const ERA_TICKER_ITEMS = [
  '01 HADEAN–ARCHEAN (4,600–2,500 MA · #B3261E)',
  '02 PROTEROZOIC (2,500–541 MA · #1F6F8B)',
  '03 PALEOZOIC (541–252 MA · #4C9A5B)',
  '04 MESOZOIC (252–66 MA · #E0701A)',
  '05 CENOZOIC (66–0 MA · #4F86F7)'
];

export function HomePage() {
  return (
    <PageShell>
      <HeroSection />
      <ScrollVelocity items={ERA_TICKER_ITEMS} baseVelocity={-1.8} />
      <DeepTimeScaleSection />
      <EvolutionStagesSection />
      <FeaturedSpecimensSection />
      <ExtinctionTurningPointsSection />
      <ProvenanceVerificationSection />
      <AdmissionPortalSection />
    </PageShell>
  );
}
