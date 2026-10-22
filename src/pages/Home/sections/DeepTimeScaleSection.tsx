import { Clock } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { AnimatedContent, BorderBeam, SpotlightCard } from '../../../components/reactbits';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { soundEngine } from '../../../lib/soundEngine';

interface ClockMilestone {
  hourLabel: string;
  ageMa: number;
  eventTitle: string;
  detail: string;
  percentOfEarthHistory: string;
}

const CLOCK_MILESTONES: ClockMilestone[] = [
  {
    hourLabel: '00:00:00',
    ageMa: 4600,
    eventTitle: 'Solar Nebula Accretion & Moon-Forming Impact',
    detail:
      'Proto-Earth forms; Jack Hills zircons crystallize by 01:01 AM (4,404 Ma), confirming liquid water.',
    percentOfEarthHistory: '0.0% elapsed'
  },
  {
    hourLabel: '05:50:36',
    ageMa: 3480,
    eventTitle: 'First Stromatolite Microbial Reefs (Pilbara Craton)',
    detail:
      'Benthic cyanobacterial mats build conical carbonate structures in shallow volcanic lagoons.',
    percentOfEarthHistory: '24.3% elapsed'
  },
  {
    hourLabel: '11:28:40',
    ageMa: 2400,
    eventTitle: 'The Great Oxidation Event',
    detail:
      'Photosynthetic oxygen saturates dissolved iron in the oceans, precipitating Banded Iron Formations.',
    percentOfEarthHistory: '47.8% elapsed'
  },
  {
    hourLabel: '21:10:38',
    ageMa: 541,
    eventTitle: 'The Cambrian Explosion Begins',
    detail:
      'After nearly 21 hours of single-celled and soft-bodied Precambrian life, mineralized shells and eyes appear.',
    percentOfEarthHistory: '88.2% elapsed'
  },
  {
    hourLabel: '22:41:07',
    ageMa: 252,
    eventTitle: 'Permian–Triassic Great Dying & Rise of Dinosaurs',
    detail:
      'Siberian Traps volcanism resets global ecosystems; archosaurs radiate across Pangea.',
    percentOfEarthHistory: '94.5% elapsed'
  },
  {
    hourLabel: '23:39:20',
    ageMa: 66,
    eventTitle: 'Chicxulub Asteroid Impact (K-Pg Boundary)',
    detail:
      'Just 20 minutes and 40 seconds before midnight, a 10 km bolide ends the Mesozoic era.',
    percentOfEarthHistory: '98.56% elapsed'
  },
  {
    hourLabel: '23:58:58',
    ageMa: 3.3,
    eventTitle: 'Lomekwi Stone Tools & Bipedal Hominins (Lucy)',
    detail:
      'With barely 62 seconds left on the 24-hour clock, Pliocene hominins walk upright and knap stone.',
    percentOfEarthHistory: '99.93% elapsed'
  },
  {
    hourLabel: '23:59:59.8',
    ageMa: 0.005,
    eventTitle: 'Uruk Cuneiform Writing & Recorded History',
    detail:
      'All of recorded human civilization occupies the final 0.16 seconds before midnight.',
    percentOfEarthHistory: '99.9999% elapsed'
  }
];

export function DeepTimeScaleSection() {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const activeMilestone = CLOCK_MILESTONES[selectedIndex];

  return (
    <section className="py-16 lg:py-24 px-6 border-b-[4px] border-[#0E0E0E] bg-[#F2EDE4]">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          index="02"
          kicker="PROPORTIONAL PROVENANCE"
          title="If 4.6 Billion Years Were Compressed Into 24 Hours"
          subtitle="Flat textbook timelines distort geological time by giving recent eras equal visual width. Explore the 24-Hour Planetary Clock to see why Precambrian history accounts for 88.2% of Earth’s existence."
        />

        {/* Proportional Bar Visualization with SpotlightCard & Shared layoutId Milestones */}
        <AnimatedContent distance={32}>
          <SpotlightCard
            spotlightColor="rgba(255, 212, 0, 0.14)"
            className="mb-10 bg-[#0E0E0E] text-[#F2EDE4] border-[3px] border-[#0E0E0E] shadow-[8px_8px_0px_#0E0E0E] p-6 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular">
              <span>TRUE LINEAR PROPORTION OF EARTH HISTORY (4,600 MA → 0 MA)</span>
              <span className="text-[#FFD400] font-bold">
                Precambrian: 88.2% · Phanerozoic (Visible Life): 11.8%
              </span>
            </div>

            <div className="w-full h-12 border-2 border-[#F2EDE4] flex overflow-hidden font-mono-tabular text-xs font-bold">
              <div
                style={{ width: '45.6%', backgroundColor: '#B3261E' }}
                className="text-[#F2EDE4] flex items-center justify-center border-r border-[#F2EDE4]/40 px-2 truncate"
                title="Hadean–Archean: 4,600 – 2,500 Ma (45.6%)"
              >
                Hadean–Archean (45.6%)
              </div>
              <div
                style={{ width: '42.6%', backgroundColor: '#1F6F8B' }}
                className="text-[#F2EDE4] flex items-center justify-center border-r border-[#F2EDE4]/40 px-2 truncate"
                title="Proterozoic: 2,500 – 541 Ma (42.6%)"
              >
                Proterozoic (42.6%)
              </div>
              <div
                style={{ width: '6.3%', backgroundColor: '#4C9A5B' }}
                className="text-[#F2EDE4] flex items-center justify-center border-r border-[#F2EDE4]/40 px-1 truncate"
                title="Paleozoic: 541 – 252 Ma (6.3%)"
              >
                Pal.
              </div>
              <div
                style={{ width: '4.0%', backgroundColor: '#E0701A' }}
                className="text-[#0E0E0E] flex items-center justify-center border-r border-[#0E0E0E] px-1 truncate"
                title="Mesozoic: 252 – 66 Ma (4.0%)"
              >
                Mes.
              </div>
              <div
                style={{ width: '1.5%', backgroundColor: '#4F86F7' }}
                className="text-[#F2EDE4] flex items-center justify-center"
                title="Cenozoic: 66 – 0 Ma (1.4%)"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 items-center">
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CLOCK_MILESTONES.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.hourLabel}
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedIndex(idx);
                      }}
                      className="relative p-3 text-left border-2 border-[#F2EDE4]/30 hover:border-[#FFD400] transition-colors cursor-pointer overflow-hidden bg-[#1C1C1C]"
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="clock-milestone-active"
                          transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                          className="absolute inset-0 bg-[#FFD400] z-0"
                        />
                      )}
                      <div
                        className={`relative z-10 flex items-center gap-1.5 text-xs font-mono-tabular font-bold ${
                          isSelected ? 'text-[#0E0E0E]' : 'text-[#F2EDE4]'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.hourLabel}</span>
                      </div>
                      <div
                        className={`relative z-10 text-[11px] font-mono-tabular mt-1 ${
                          isSelected ? 'text-[#0E0E0E]/80 font-bold' : 'text-[#F2EDE4]/75'
                        }`}
                      >
                        {item.ageMa.toLocaleString()} Ma
                      </div>
                      <div
                        className={`relative z-10 text-xs font-display font-bold line-clamp-1 mt-1 ${
                          isSelected ? 'text-[#0E0E0E]' : 'text-[#F2EDE4]'
                        }`}
                      >
                        {item.eventTitle}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-5 relative bg-[#F2EDE4] text-[#0E0E0E] border-[3px] border-[#FFD400] p-5 overflow-hidden">
                <BorderBeam colorFrom="#FFD400" colorTo="#0E0E0E" duration={6} />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMilestone.hourLabel}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ type: 'spring', stiffness: 340, damping: 26 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-mono-tabular font-bold text-[#4A4742]">
                      <span>24H CLOCK: {activeMilestone.hourLabel}</span>
                      <span>{activeMilestone.percentOfEarthHistory}</span>
                    </div>
                    <h3 className="text-xl font-bold font-display">
                      {activeMilestone.eventTitle} ({activeMilestone.ageMa.toLocaleString()} Ma)
                    </h3>
                    <p className="text-sm text-[#0E0E0E]/85 leading-relaxed">
                      {activeMilestone.detail}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </SpotlightCard>
        </AnimatedContent>
      </div>
    </section>
  );
}
