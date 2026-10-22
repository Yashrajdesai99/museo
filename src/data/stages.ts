import type { EvolutionStage } from '../types/evolution';

export const BRAND_TAGLINE = '4,600,000,000 YEARS. ONE ADMISSION PASS.';
export const BRAND_SUBTITLE =
  'Step into the Museum of Deep Time. Your ticket is a journey through 4.6 billion years.';

export const EVOLUTION_STAGES: EvolutionStage[] = [
  {
    id: 'hadean-archean',
    index: '01',
    name: 'Hadean–Archean',
    spanLabel: '4,600 – 2,500 Ma',
    startMa: 4600,
    endMa: 2500,
    defaultMa: 3800,
    tagline: 'Accretion, Magma Oceans, First Crust & Microbial Mats',
    headline: 'Accretion, Magma Oceans, First Crust & Microbial Mats',
    summary:
      'From the Moon-forming giant impact and glowing silicate magma oceans to the condensation of the first steam atmosphere, liquid oceans by 4,404 Ma, and benthic stromatolite reefs in volcanic cratons.',
    tectonicConfiguration: 'Primordial Vaalbara & Ur Proto-Cratons',
    atmosphereComposition: 'CO₂, N₂, CH₄, H₂O vapor (Anoxic reducing sky)',
    oxygenPercent: 0.001,
    meanSurfaceTempC: 75,
    ambientSoundLabel: 'Low volcanic rumble & lava crackle',
    robotQuip:
      'Four billion years of molten silicate. You have time. Please keep your footwear off the magma ocean.',
    dominantLife: [
      'Stromatolite Cyanobacterial Mats & Hyperthermophilic Archaea',
      'Anaerobic Chemolithotrophs'
    ],
    keyHighlights: [
      '4,510 Ma: Theia proto-planet collision forms the Moon and tilts Earth’s axis',
      '4,404 Ma: Jack Hills detrital zircons record cool liquid surface water',
      '3,480 Ma: Dresser Formation conical stromatolites establish microbial life'
    ],
    palette: {
      eraTintName: 'Molten Red (#B3261E)',
      sceneBgTint: '#B3261E',
      keyLightTint: '#FF6B4A',
      oceanColor: '#1b1116',
      continentColor: '#301a16',
      highlandColor: '#4c261d',
      coastalShelfColor: '#8c2d19',
      atmosphereColor: '#d95326',
      riftGlowColor: '#FF5722',
      cloudOpacity: 0.35,
      lavaGlowIntensity: 0.85,
      volcanicIntensity: 0.85,
      iceCapCoverage: 0.0
    }
  },
  {
    id: 'proterozoic',
    index: '02',
    name: 'Proterozoic',
    spanLabel: '2,500 – 541 Ma',
    startMa: 2500,
    endMa: 541,
    defaultMa: 650,
    tagline: 'The Great Oxidation, Snowball Earth & Ediacaran Soft Animals',
    headline: 'The Great Oxidation, Snowball Earth & Ediacaran Soft Animals',
    summary:
      'Cyanobacterial photosynthesis oxygenates the oceans, precipitating massive Banded Iron Formations and triggering global Cryogenian glaciations before the enigmatic Ediacaran biota blossom.',
    tectonicConfiguration: 'Columbia & Rodinia Supercontinents',
    atmosphereComposition: 'N₂, rising O₂ (1–3%), depleted CH₄ greenhouse',
    oxygenPercent: 2.5,
    meanSurfaceTempC: 12,
    ambientSoundLabel: 'Sub-aquatic deep ocean resonance',
    robotQuip:
      'Cyanobacteria just invented oxygen and accidentally froze the entire planet into a snowball. Classic overachievers.',
    dominantLife: [
      'Ediacaran Soft-Bodied Metazoans (Dickinsonia, Charnia) & Eukaryotic Algae',
      'Macroscopic Ribbon Eukaryotes (Grypania)'
    ],
    keyHighlights: [
      '2,400 Ma: Great Oxidation Event rusts the oceans and forms Banded Iron Formations',
      '717–635 Ma: Sturtian and Marinoan "Snowball Earth" global glaciations',
      '565–558 Ma: Charnia and Dickinsonia pioneer macroscopic multicellular animal life'
    ],
    palette: {
      eraTintName: 'Deep Ocean (#1F6F8B)',
      sceneBgTint: '#1F6F8B',
      keyLightTint: '#5BC0DE',
      oceanColor: '#0e2b3c',
      continentColor: '#6d4c3d',
      highlandColor: '#8b634b',
      coastalShelfColor: '#215f78',
      atmosphereColor: '#4fa3c7',
      riftGlowColor: '#FF7043',
      cloudOpacity: 0.5,
      lavaGlowIntensity: 0.05,
      volcanicIntensity: 0.15,
      iceCapCoverage: 0.42
    }
  },
  {
    id: 'paleozoic',
    index: '03',
    name: 'Paleozoic',
    spanLabel: '541 – 252 Ma',
    startMa: 541,
    endMa: 252,
    defaultMa: 375,
    tagline: 'Cambrian Explosion, Colonization of Land & The Great Dying',
    headline: 'Cambrian Explosion, Colonization of Land & The Great Dying',
    summary:
      'Biomineralized shells, compound eyes, and jaws ignite an evolutionary arms race in the seas; vascular plants and tetrapods conquer the continents before the Siberian Traps trigger Earth’s worst mass extinction.',
    tectonicConfiguration: 'Gondwana & Laurussia Colliding into Pangaea',
    atmosphereComposition: 'Hyper-oxygenated Carboniferous air (up to 31% O₂)',
    oxygenPercent: 26.0,
    meanSurfaceTempC: 18,
    ambientSoundLabel: 'Humid coal-swamp air & insect stridulation',
    robotQuip:
      'Everything suddenly grew eyes, shells, and jaws. Then Tiktaalik decided to do push-ups on the mud and ruined our quiet beaches forever.',
    dominantLife: [
      'Radiodonts (Anomalocaris), Trilobites, Placoderms (Dunkleosteus) & Early Tetrapods (Tiktaalik)',
      'Lycopsid Coal Forests & Synapsids'
    ],
    keyHighlights: [
      '508 Ma: Burgess Shale preserves Anomalocaris and early chordates',
      '375 Ma: Tiktaalik roseae bridges lobe-finned fish and four-limbed tetrapods',
      '251.9 Ma: Permian–Triassic "Great Dying" erases 96% of marine species'
    ],
    palette: {
      eraTintName: 'Fern Green (#4C9A5B)',
      sceneBgTint: '#4C9A5B',
      keyLightTint: '#8CE09A',
      oceanColor: '#0d3142',
      continentColor: '#2d5738',
      highlandColor: '#4b6e44',
      coastalShelfColor: '#1b6d6b',
      atmosphereColor: '#56a386',
      riftGlowColor: '#FF5722',
      cloudOpacity: 0.45,
      lavaGlowIntensity: 0.08,
      volcanicIntensity: 0.25,
      iceCapCoverage: 0.15
    }
  },
  {
    id: 'mesozoic',
    index: '04',
    name: 'Mesozoic',
    spanLabel: '252 – 66 Ma',
    startMa: 252,
    endMa: 66,
    defaultMa: 66.8,
    tagline: 'Breakup of Pangaea, Age of Dinosaurs & Chicxulub Impact',
    headline: 'Breakup of Pangaea, Age of Dinosaurs & Chicxulub Impact',
    summary:
      'Pangaea rifts apart to open the Atlantic Ocean and warm epicontinental seaways. Archosaurs, ammonites, feathered theropods, and angiosperm flowers flourish until a 10-km asteroid strikes the Yucatán.',
    tectonicConfiguration: 'Rifting Pangaea (Laurasia & Gondwana Separation)',
    atmosphereComposition: 'High CO₂ greenhouse atmosphere, warm ice-free poles',
    oxygenPercent: 21.5,
    meanSurfaceTempC: 24,
    ambientSoundLabel: 'Warm greenhouse canopy & low archosaur resonance',
    robotQuip:
      '186 million years of dinosaur dominance. Surely nothing incoming at 20 kilometers per second will interrupt this.',
    dominantLife: [
      'Non-Avian Dinosaurs (Tyrannosaurus), Early Birds (Archaeopteryx) & Ammonoid Cephalopods',
      'Conifers, Cycads & Early Angiosperms'
    ],
    keyHighlights: [
      '201.3 Ma: Central Atlantic Magmatic Province rifts Pangaea apart',
      '150 Ma: Archaeopteryx lithographica takes flight over Solnhofen lagoons',
      '66.0 Ma: Chicxulub Asteroid Impact ends the reign of non-avian dinosaurs'
    ],
    palette: {
      eraTintName: 'Amber (#E0701A)',
      sceneBgTint: '#E0701A',
      keyLightTint: '#FFB347',
      oceanColor: '#0c3b52',
      continentColor: '#486832',
      highlandColor: '#697a42',
      coastalShelfColor: '#1ca39c',
      atmosphereColor: '#e08b3e',
      riftGlowColor: '#FF8A65',
      cloudOpacity: 0.38,
      lavaGlowIntensity: 0.02,
      volcanicIntensity: 0.12,
      iceCapCoverage: 0.02
    }
  },
  {
    id: 'cenozoic',
    index: '05',
    name: 'Cenozoic',
    spanLabel: '66 – 0 Ma',
    startMa: 66,
    endMa: 0,
    defaultMa: 1.4,
    tagline: 'Mammalian Radiation, Ice Ages, Hominins & Written History',
    headline: 'Mammalian Radiation, Ice Ages, Hominins & Written History',
    summary:
      'India collides with Eurasia to uplift the Himalayas, cooling the planet into Pleistocene glaciations. In the East African Rift, bipedal hominins knap stone tools, engrave symbols, and invent writing.',
    tectonicConfiguration: 'Modern Seven-Continent Configuration',
    atmosphereComposition: '78% N₂, 21% O₂, 0.04% CO₂ (Modern atmosphere)',
    oxygenPercent: 20.95,
    meanSurfaceTempC: 14.5,
    ambientSoundLabel: 'High-altitude wind, avian harmonics & sparse tones',
    robotQuip:
      'Welcome to the last 0.01% of the timeline. You invented stone axes, pottery, and accounting tablets in the blink of an eye.',
    dominantLife: [
      'Placental Mammals (Mammuthus), Bipedal Hominins (Australopithecus, Homo sapiens) & Angiosperm Grasslands',
      'Avian Theropods & Teleost Fishes'
    ],
    keyHighlights: [
      '3.3–3.2 Ma: Australopithecus ("Lucy") walks upright; Lomekwi 3 stone tools knapped',
      '75,000 BP: Homo sapiens engraves geometric ochre symbols at Blombos Cave',
      '3100 BCE: Uruk proto-cuneiform clay tablets inaugurate recorded history'
    ],
    palette: {
      eraTintName: 'Open Sky (#4F86F7)',
      sceneBgTint: '#4F86F7',
      keyLightTint: '#8AB4F8',
      oceanColor: '#0b2e4e',
      continentColor: '#3b5e3c',
      highlandColor: '#6d6552',
      coastalShelfColor: '#1b7a94',
      atmosphereColor: '#4f86f7',
      riftGlowColor: '#FF7043',
      cloudOpacity: 0.45,
      lavaGlowIntensity: 0.0,
      volcanicIntensity: 0.05,
      iceCapCoverage: 0.22
    }
  }
];
