import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { CATALOG_ENTITIES } from '../../../data';
import { useTimelineStore } from '../../../state/timelineStore';
import type { CatalogEntity } from '../../../types/catalog';

export function FeaturedSpecimensSection() {
  const navigate = useNavigate();
  const { setAgeMa, setSelectedEntityId } = useTimelineStore();

  const featuredEntities = CATALOG_ENTITIES.filter((e) => e.featured).slice(0, 6);

  const handleLocateOnGlobe = (entity: CatalogEntity) => {
    setAgeMa(entity.ageMa);
    setSelectedEntityId(entity.id);
    navigate('/earth');
  };

  return (
    <section className="py-16 lg:py-24 px-6 border-b-[4px] border-[#0E0E0E] bg-[#F2EDE4]">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          index="04"
          kicker="FACT-VERIFIED CATALOG"
          title="Flagship Fossils & Cultural Artifacts"
          subtitle="From a 4.4-billion-year-old Jack Hills zircon crystal and the Nation’s Tyrannosaurus rex skull to the Blombos Cave engraved ochre plaque and Uruk proto-cuneiform tablets."
          rightSlot={
            <Button variant="primary" onClick={() => navigate('/gallery')}>
              <span>Browse All 20 Specimens</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEntities.map((entity) => (
            <Card
              key={entity.id}
              entity={entity}
              onLocateOnGlobe={handleLocateOnGlobe}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
