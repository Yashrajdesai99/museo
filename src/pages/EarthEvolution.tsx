import { PageShell } from '../components/layout/PageShell';
import { EarthScene } from '../scenes/earth/EarthScene';

export default function EarthEvolutionPage() {
  return (
    <PageShell hideFooter>
      <EarthScene />
    </PageShell>
  );
}
