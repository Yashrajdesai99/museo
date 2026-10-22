import type { ExtinctionEvent } from '../types/evolution';

export const EXTINCTION_EVENTS: ExtinctionEvent[] = [
  {
    id: 'ordovician-silurian',
    name: 'Late Ordovician Mass Extinction (LOME)',
    shortName: 'Ordovician–Silurian',
    ageMa: 444,
    stageId: 'paleozoic',
    speciesLostPercent: 85,
    marineGeneraLostPercent: 60,
    primaryCause: 'Gondwanan Hirnantian glaciation followed by rapid ocean anoxia',
    summary:
      'As the supercontinent Gondwana drifted over the South Pole, massive continental ice sheets locked up seawater, draining shallow epicontinental reef habitats in two sharp pulses.',
    geologicalMarker: 'Hirnantian positive δ13C excursion & black graptolite shales',
    hasCutscene: false,
    source: 'Sheehan (2001), Annual Review of Earth and Planetary Sciences 29, 331–364.'
  },
  {
    id: 'late-devonian',
    name: 'Late Devonian Kellwasser & Hangenberg Crises',
    shortName: 'Late Devonian',
    ageMa: 372,
    stageId: 'paleozoic',
    speciesLostPercent: 75,
    marineGeneraLostPercent: 55,
    primaryCause: 'Deep-rooted vascular land plant weathering & widespread marine eutrophication',
    summary:
      'The rapid spread of deep-rooted Archaeopteris forests accelerated continental silicate weathering, flushing nutrients into tropical seas and suffocating stromatoporoid reefs and armored placoderms.',
    geologicalMarker: 'Frasnian–Famennian Kellwasser anoxic limestone horizon',
    hasCutscene: false,
    source: 'Algeo & Scheckler (1998), Phil. Trans. Royal Society B 353, 113–130.'
  },
  {
    id: 'permian-triassic',
    name: 'Permian–Triassic "Great Dying" Extinction',
    shortName: 'Permian–Triassic',
    ageMa: 252,
    stageId: 'paleozoic',
    speciesLostPercent: 96,
    marineGeneraLostPercent: 83,
    primaryCause: 'Siberian Traps flood basalt volcanism, coal-bed thermogenic methane & hypercapnia',
    summary:
      'Earth’s severest biotic crisis. Millions of cubic kilometers of basaltic lava erupted across Siberia, baking organic-rich sediments, raising equatorial ocean temperatures above 40°C, and wiping out trilobites.',
    geologicalMarker: 'Meishan GSSP Hindeodus parvus conodont zone & fungal spike',
    hasCutscene: false,
    source: 'Erwin (1994), Nature 367, 231–236; Burgess, Bowring & Shen (2014), PNAS 111(9).'
  },
  {
    id: 'triassic-jurassic',
    name: 'End-Triassic Mass Extinction',
    shortName: 'Triassic–Jurassic',
    ageMa: 201,
    stageId: 'mesozoic',
    speciesLostPercent: 80,
    marineGeneraLostPercent: 48,
    primaryCause: 'Central Atlantic Magmatic Province (CAMP) rifting of Pangea',
    summary:
      'As Pangea began tearing apart to form the proto-Atlantic Ocean, volcanic CO₂ spikes and ocean acidification eliminated large pseudosuchian archosaurs and conodonts, clearing the way for dinosaurian dominance.',
    geologicalMarker: 'CAMP flood basalts & fern-spore abundance spike',
    hasCutscene: false,
    source: 'Blackburn et al. (2013), Science 340(6135), 941–945.'
  },
  {
    id: 'cretaceous-paleogene',
    name: 'Cretaceous–Paleogene (K-Pg) Chicxulub Impact',
    shortName: 'K-Pg Asteroid Impact',
    ageMa: 66,
    stageId: 'mesozoic',
    speciesLostPercent: 75,
    marineGeneraLostPercent: 47,
    primaryCause: '10–15 km Chicxulub carbonaceous chondrite bolide impact (+ Deccan volcanism)',
    summary:
      'A 10-kilometer asteroid struck the carbonate-evaporite platform of the Yucatán Peninsula at 20 km/s, releasing 100 миллиона megatons of energy, triggering a global thermal pulse, mega-tsunamis, and a decade-long impact winter that ended the reign of non-avian dinosaurs and ammonites.',
    geologicalMarker: 'Global K-Pg boundary clay with 30× Iridium anomaly & shocked quartz',
    hasCutscene: true,
    impactCoordinates: {
      lat: 21.4,
      lon: -89.51,
      locationName: 'Chicxulub Crater, Yucatán Platform (21.40°N, 89.51°W)'
    },
    source: 'Alvarez et al. (1980), Science 208(4448), 1095–1108; Schulte et al. (2010), Science 327, 1214–1218.'
  }
];
