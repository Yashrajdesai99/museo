import { PageShell } from '../../components/layout/PageShell';
import { AdmissionPortalSection } from './sections/AdmissionPortalSection';
import { DeepTimeScaleSection } from './sections/DeepTimeScaleSection';
import { EvolutionStagesSection } from './sections/EvolutionStagesSection';
import { ExtinctionTurningPointsSection } from './sections/ExtinctionTurningPointsSection';
import { FeaturedSpecimensSection } from './sections/FeaturedSpecimensSection';
import { HeroSection } from './sections/HeroSection';
import { ProvenanceVerificationSection } from './sections/ProvenanceVerificationSection';
import { StratigraphicComparatorSection } from './sections/StratigraphicComparatorSection';

export default function HomePage() {
  return (
    <PageShell>
      <HeroSection />
      <DeepTimeScaleSection />
      <EvolutionStagesSection />
      <FeaturedSpecimensSection />
      <StratigraphicComparatorSection />
      <ExtinctionTurningPointsSection />
      <ProvenanceVerificationSection />
      <AdmissionPortalSection />
    </PageShell>
  );
}
