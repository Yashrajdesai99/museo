import type { FossilSpecimen } from '../types/catalog';

export const FOSSIL_SPECIMENS: FossilSpecimen[] = [
  {
    id: 'jack-hills-zircon',
    accessionNumber: 'ACC-F-001',
    type: 'fossil',
    name: 'Jack Hills Detrital Zircon (W74-2/36)',
    subtitle: 'Oldest Known Terrestrial Mineral Grain',
    hook: 'A microscopic time capsule proving liquid oceans existed on Earth 4.4 billion years ago—long before the planet was supposed to be cool.',
    story:
      'Recovered from metamorphosed conglomerate rocks in the Narryer Gneiss Terrane of Western Australia, this 4,404-million-year-old zirconium silicate crystal overturned the textbook image of a purely molten Hadean Earth.Barely wider than two human hairs, the crystal locked uranium, lead, and oxygen atoms inside concentric growth rings just 160 million years after the solar system accreted. When geochemists probed its pristine core using secondary ion mass spectrometry and atom-probe tomography, they found elevated heavy oxygen-18 ratios—unmistakable chemical proof that its parent magma crystallized from rock that had already interacted with cool liquid surface water.',
    facts: [
      'Dated to 4,404 ± 8 million years ago via Uranium-Lead (U-Pb) radiometric decay.',
      'Elevated δ18O oxygen isotope values (7.4‰) confirm liquid surface oceans during the Hadean Eon.',
      'Measures only 240 micrometers across—smaller than a grain of beach sand.',
      'Confirmed by atom-probe tomography in 2014 to have zero lead migration since crystallization.'
    ],
    whyItMatters:
      'Establishes the "Cool Early Earth" hypothesis, demonstrating that habitable surface water existed nearly half a billion years earlier than previously thought.',
    description:
      'Microscopic zirconium silicate crystal preserving oxygen-isotope evidence of liquid water oceans and continental crust just 160 million years after Earth formed.',
    curatorialEssay:
      'Recovered from metamorphosed metaconglomerate rocks in the Narryer Gneiss Terrane of Western Australia, this 4,404-million-year-old zircon crystal challenged the classical view of a purely molten Hadean Earth. Elevated δ18O ratios inside the zoned crystal lattice prove that the parent magma interacted with cool liquid surface water—establishing that a hydrosphere existed long before the Late Heavy Bombardment ended.',
    stageIds: ['hadean-archean'],
    ageMa: 4404,
    ageDisplay: '4,404 Ma',
    taxon: 'Zircon (ZrSiO₄) Hadean Clast',
    clade: 'Mineralogical / Pre-Biotic Biomarker',
    geologicalPeriod: 'Hadean Eon (Cryptic Era)',
    locality: 'Erawondoo Hill, Jack Hills, Western Australia',
    stratigraphicFormation: 'Narryer Gneiss Terrane',
    preservationMode: 'Detrital oscillatory-zoned silicate crystal',
    dimensions: '0.24 mm × 0.16 mm × 0.11 mm (Displayed at 500× scale)',
    model: '/models/jack-hills-zircon.glb',
    modelPreset: 'zircon-crystal',
    source: 'Wilde et al. (2001), Nature 409, 175–178; Valley et al. (2014), Nature Geoscience 7, 219–223.',
    sourceInstitution: 'University of Wisconsin–Madison Geology Museum / Western Australian Museum',
    sourceUrl: 'https://doi.org/10.1038/35051550',
    license: 'Public Scientific Record / CC0 Reference',
    featured: true,
    orbitCoordinates: { lat: -26.17, lon: 116.99 }
  },
  {
    id: 'dresser-stromatolite',
    accessionNumber: 'ACC-F-002',
    type: 'fossil',
    name: 'Pilbara Conical Stromatolite',
    subtitle: 'Earliest Macroscopic Evidence of Life on Earth',
    hook: 'Layered stone reefs built by sunlight-harvesting microbes in a volcanic caldera lagoon 3.48 billion years ago.',
    story:
      'Long before plants, shells, or bones existed, slimy mats of photosynthetic bacteria ruled Earth’s shallow volcanic coastlines. In the Dresser Formation of Western Australia’s Pilbara Craton, these microbial communities trapped fine carbonate and silica grains layer by layer as they reached upward toward sunlight. Over millennia, their rhythmic growth created wavy, conical domes riddled with microscopic gas-bubble voids and organic carbon filaments. Silicified by hydrothermal fluids, these 3.48-billion-year-old structures remain the oldest visible architecture ever constructed by living organisms on our planet.',
    facts: [
      'Preserved in 3,480-million-year-old chert and barite beds of the Warrawoona Group.',
      'Exhibits diagnostic conical pinnacle laminae that cannot form via abiotic chemical precipitation.',
      'Contains trace organic kerogen and micro-fenestral voids from trapped metabolic gas bubbles.',
      'Serves as the primary geological benchmark for NASA Perseverance Mars biosignature searches.'
    ],
    whyItMatters:
      'Proves that thriving microbial ecosystems colonized shallow marine environments less than a billion years after Earth’s formation.',
    description:
      'Laminated organo-sedimentary dome built by ancient benthic microbial mats in a volcanic caldera lagoon 3.48 billion years ago.',
    curatorialEssay:
      'Stromatolites form as phototrophic microbial communities trap carbonate and silica sediment layer by layer toward sunlight. The Dresser Formation specimens from the Pilbara Craton exhibit characteristic wrinkled laminae, fenestral gas-bubble voids, and conical pinnacle geometries that cannot be replicated by abiotic precipitation alone.',
    stageIds: ['hadean-archean'],
    ageMa: 3480,
    ageDisplay: '3,480 Ma',
    taxon: 'Microbialithic Cyanobacterial Mat Consortium',
    clade: 'Bacteria / Terrabacteria',
    geologicalPeriod: 'Paleoarchean Era',
    locality: 'North Pole Dome, Pilbara Craton, Western Australia',
    stratigraphicFormation: 'Dresser Formation (Warrawoona Group)',
    preservationMode: 'Silicified chert replacement & barite laminae',
    dimensions: '18.4 cm × 14.2 cm × 11.0 cm',
    model: '/models/dresser-stromatolite.glb',
    modelPreset: 'stromatolite-dome',
    source: 'Allwood et al. (2006), Nature 441, 714–718; Smithsonian NMNH Paleobiology Archive.',
    sourceInstitution: 'Smithsonian National Museum of Natural History (NMNH)',
    sourceUrl: 'https://paleobiology.si.edu/',
    license: 'Smithsonian CC0 Open Access',
    featured: true,
    orbitCoordinates: { lat: -21.15, lon: 119.45 }
  },
  {
    id: 'grypania-spiralis',
    accessionNumber: 'ACC-F-003',
    type: 'fossil',
    name: 'Grypania spiralis',
    subtitle: 'Early Macroscopic Eukaryotic Ribbon Alga',
    hook: 'A coiled carbon ribbon etched in Michigan ironstone that marks life’s leap from microscopic bacteria to complex nucleated cells.',
    story:
      'For nearly two billion years, life on Earth remained microscopic. Everything changed after the Great Oxidation Event (~2,400 Ma) injected free oxygen into the oceans, unlocking high-energy aerobic metabolism. Discovered in the 1,870-million-year-old Negaunee Banded Iron Formation of Michigan, Grypania spiralis appears as gleaming black carbonaceous spirals up to 14 millimeters across. Its rigid, unbranched tubular wall and consistent helical coiling far exceed the structural limits of solitary bacteria, heralding the arrival of macroscopic eukaryotic algae with internal nuclei and organelles.',
    facts: [
      'Recovered from 1,870 Ma Paleoproterozoic banded ironstone at the Empire Mine, Michigan.',
      'Coiled ribbon thallus reaches up to 90 mm in uncoiled length and 2 mm in tube width.',
      'Emerged in the wake of the Great Oxidation Event when atmospheric oxygen crossed 1% PAL.',
      'Represents one of the earliest macroscopic fossils visible to the naked human eye.'
    ],
    whyItMatters:
      'Documents the evolutionary bridge between simple prokaryotic mats and the complex organelle-bearing eukaryotic lineage that includes all plants, fungi, and animals.',
    description:
      'Carbonaceous coiled ribbon compression fossil marking the rise of macroscopic organelle-bearing eukaryotic life after the Great Oxidation Event.',
    curatorialEssay:
      'Measuring over a centimeter in coiled diameter, Grypania spiralis from the Negaunee Iron Formation in Michigan represents a watershed leap in cellular complexity. Following the Great Oxidation Event (~2,400 Ma), aerobic respiration enabled cells to grow orders of magnitude larger than prokaryotic filaments.',
    stageIds: ['proterozoic'],
    ageMa: 1870,
    ageDisplay: '1,870 Ma',
    taxon: 'Grypania spiralis',
    clade: 'Eukaryota (Incertae sedis / Chlorophyta)',
    geologicalPeriod: 'Paleoproterozoic Era (Orosirian Period)',
    locality: 'Empire Mine, Marquette Range, Michigan, USA',
    stratigraphicFormation: 'Negaunee Iron Formation',
    preservationMode: 'Carbonaceous compression in banded ironstone',
    dimensions: '9.5 cm × 8.2 cm matrix slab (14 mm coil diameter)',
    model: '/models/grypania-spiralis.glb',
    modelPreset: 'grypania-coil',
    source: 'Han & Runnegar (1992), Science 257(5067), 232–235; Paleobiology Database #38412.',
    sourceInstitution: 'Peabody Museum of Natural History / PBDB',
    sourceUrl: 'https://paleobiodb.org/',
    license: 'CC0 Public Domain Reference',
    orbitCoordinates: { lat: 46.44, lon: -87.61 }
  },
  {
    id: 'dickinsonia-costata',
    accessionNumber: 'ACC-F-004',
    type: 'fossil',
    name: 'Dickinsonia costata',
    subtitle: 'Iconic Ediacaran Soft-Bodied Metazoan',
    hook: 'A quilted, mouthless seafloor creature whose fossilized cholesterol molecules solved a 70-year mystery by proving it was one of Earth’s first animals.',
    story:
      'When Reginald Sprigg discovered ribbed, oval impressions in South Australia’s Ediacara Hills in 1946, paleontologists argued for seventy years over what Dickinsonia actually was—a jellyfish, a marine worm, a lichen, or a failed evolutionary kingdom. Lacking mouth, gut, or shell, it glided across microbial mats 558 million years ago, digesting nutrients through its ventral sole. In 2018, researchers extracted fossilized lipid biomarkers from organically preserved Russian White Sea specimens: Dickinsonia was packed with 93% cholesteroids, the definitive molecular fingerprint of the animal kingdom.',
    facts: [
      'Grew via glide-reflection symmetry—offsetting left and right rib isomers along a central midline.',
      '2018 lipid biomarker analysis detected 85–93% animal cholesteroids (C27 steranes) vs. algal ergosteroids.',
      'Preserved as "death mask" negative sandstone molds sealed rapidly by microbial mat pyrite.',
      'Lived during the tranquil Ediacaran Period before shells, claws, or macropredation existed.'
    ],
    whyItMatters:
      'Provides the oldest molecularly verified proof of macroscopic animal life (Metazoa) in the geological record, 17 million years before the Cambrian Explosion.',
    description:
      'Quilted, bilaterally ribbed oval organism preserved in sandstone molds—confirmed by cholesteroid biomarkers as one of the earliest animals.',
    curatorialEssay:
      'For seven decades after its discovery in the Ediacara Hills of South Australia, Dickinsonia defied taxonomic placement—proposed variously as a jellyfish, lichen, or giant protist. In 2018, molecular paleobiologists extracted C27 cholesteroid biomarkers directly from organically preserved White Sea specimens, proving definitively that Dickinsonia belonged to the animal kingdom (Metazoa) before shells or skeletons evolved.',
    stageIds: ['proterozoic'],
    ageMa: 558,
    ageDisplay: '558 Ma',
    taxon: 'Dickinsonia costata',
    clade: 'Metazoa / Proarticulata',
    geologicalPeriod: 'Neoproterozoic Era (Ediacaran Period)',
    locality: 'Flinders Ranges, South Australia / White Sea, Russia',
    stratigraphicFormation: 'Rawnsley Quartzite',
    preservationMode: 'Negative hyporelief sandstone cast ("Death Mask")',
    dimensions: '14.8 cm × 11.6 cm × 2.4 cm',
    model: '/models/dickinsonia-costata.glb',
    modelPreset: 'dickinsonia-ribbed',
    source: 'Bobrovskiy et al. (2018), Science 361(6408), 1246–1249; South Australian Museum P40135.',
    sourceInstitution: 'South Australian Museum / Smithsonian NMNH Cast Collection',
    sourceUrl: 'https://doi.org/10.1126/science.aat7228',
    license: 'Smithsonian CC0 / Academic Citation',
    featured: true,
    orbitCoordinates: { lat: -31.33, lon: 138.62 }
  },
  {
    id: 'charnia-masoni',
    accessionNumber: 'ACC-F-005',
    type: 'fossil',
    name: 'Charnia masoni',
    subtitle: 'Fractal Deep-Marine Rangeomorph Frond',
    hook: 'Spotted by schoolchildren in an English quarry in 1957, this fractal deep-sea frond shattered the belief that Precambrian rocks were lifeless.',
    story:
      'Until 1957, geologists followed Charles Darwin’s assumption that rocks older than the Cambrian Period contained no complex fossils. That consensus vanished when Tina Negus and Roger Mason discovered a leaf-like impression in volcanic slate at Charnwood Forest, England. Named Charnia masoni, this 565-million-year-old organism was not a plant at all: it lived in pitch-black abyssal water far below the reach of sunlight. Anchored by a bulbous holdfast, Charnia deployed self-similar fractal branches over four orders of magnitude to absorb dissolved organic carbon directly from seawater.',
    facts: [
      'First Precambrian macroscopic fossil ever accepted by mainstream paleontology (described 1958).',
      'Exhibits mathematical self-similar fractal branching across four hierarchical orders.',
      'Inhabited aphotic deep-water turbidite slopes where photosynthesis was physically impossible.',
      'Buried in situ beneath sudden subsea volcanic ash falls (konservat-lagerstätte).'
    ],
    whyItMatters:
      'Ended a century-long scientific blind spot by proving that complex, large-bodied ecosystems thrived in deep oceans tens of millions of years before the Cambrian Period.',
    description:
      'Self-similar fractal frond anchored to the dark abyssal seafloor by a bulbous holdfast, absorbing dissolved organic nutrients directly from seawater.',
    curatorialEssay:
      'Discovered in 1957 in Charnwood Forest, England, Charnia masoni was the first fossil ever proven to come from Precambrian rock. Living well below the photic zone in deep marine turbidites, Charnia could not have been a photosynthetic alga; instead, its fractal branching maximized surface area for osmotrophic nutrient uptake.',
    stageIds: ['proterozoic'],
    ageMa: 565,
    ageDisplay: '565 Ma',
    taxon: 'Charnia masoni',
    clade: 'Rangeomorpha / Petalonamae',
    geologicalPeriod: 'Neoproterozoic Era (Ediacaran Period)',
    locality: 'Charnwood Forest, Leicestershire, UK / Mistaken Point, Newfoundland',
    stratigraphicFormation: 'Bradgate Formation (Maplewell Group)',
    preservationMode: 'Volcanic ash epirelief impression',
    dimensions: '21.5 cm × 8.4 cm × 3.1 cm',
    model: '/models/charnia-masoni.glb',
    modelPreset: 'charnia-frond',
    source: 'Ford (1958), Proc. Yorkshire Geological Society 31, 211–217; New Walk Museum LEIUG 2328.',
    sourceInstitution: 'Leicester Museum & Art Gallery / British Geological Survey',
    sourceUrl: 'https://www.bgs.ac.uk/discovering-geology/fossils-and-geological-time/',
    license: 'CC-BY / Public Archival Record',
    orbitCoordinates: { lat: 52.71, lon: -1.21 }
  },
  {
    id: 'anomalocaris-canadensis',
    accessionNumber: 'ACC-F-006',
    type: 'fossil',
    name: 'Anomalocaris canadensis',
    subtitle: 'Cambrian Explosion Apex Radiodont Predator',
    hook: 'Mistaken for three different animals for nearly a century, this meter-long hunter with 16,000-lens compound eyes was Earth’s first apex predator.',
    story:
      'When paleontologists first split open the 508-million-year-old Burgess Shale in British Columbia, Anomalocaris was so alien that its disarticulated parts were assigned to three separate phyla: its spiny grasping arms were cataloged as headless shrimp, its circular toothed mouth was named a jellyfish, and its body was labeled a sea cucumber. Only in 1985 did complete fossils unite the pieces into a single meter-long radiodont hunter. Armed with stalked compound eyes packing 16,000 hexagonal lenses and undulating lateral swim flaps, Anomalocaris ignited the evolutionary arms race of the Cambrian Explosion.',
    facts: [
      'Stalked compound eyes contained ~16,000 lenses per eye—rivaling modern dragonflies in visual acuity.',
      'Swam via rhythmic wave-like undulations of 13 pairs of overlapping lateral body flaps.',
      'Segmented raptorial appendages carried ventral barbed spines for impaling soft-bodied prey.',
      'Preserved in exquisite aluminosilicate carbon films at Walcott Quarry, Yoho National Park.'
    ],
    whyItMatters:
      'Demonstrates how the evolution of high-resolution vision and active raptorial predation drove the rapid diversification of animal armor and body plans during the Cambrian Explosion.',
    description:
      'Meter-long stem-arthropod equipped with compound eyes of 16,000 lenses, articulated raptorial frontal appendages, and a radial oral cone.',
    curatorialEssay:
      'For nearly a century, the isolated body parts of Anomalocaris found in the Burgess Shale were misidentified as three separate phyla: its grasping appendages as shrimp tails, its mouthpart as a jellyfish (Peytoia), and its trunk as a sea cucumber. Complete specimens revealed Earth’s first super-predator propelling itself via undulating lateral flaps through Cambrian seas.',
    stageIds: ['paleozoic'],
    ageMa: 508,
    ageDisplay: '508 Ma',
    taxon: 'Anomalocaris canadensis',
    clade: 'Panarthropoda / Radiodonta',
    geologicalPeriod: 'Cambrian Period (Miaolingian Epoch)',
    locality: 'Walcott Quarry, Burgess Shale, Yoho National Park, British Columbia',
    stratigraphicFormation: 'Stephen Formation (Burgess Shale Lagerstätte)',
    preservationMode: 'Burgess-type carbonaceous aluminosilicate film',
    dimensions: '38.0 cm × 22.0 cm × 1.8 cm',
    model: '/models/anomalocaris-canadensis.glb',
    modelPreset: 'anomalocaris-predator',
    source: 'Whittington & Briggs (1985), Phil. Trans. Royal Society B 309, 569–609; USNM 57490.',
    sourceInstitution: 'Smithsonian National Museum of Natural History (USNM 57490)',
    sourceUrl: 'https://collections.nmnh.si.edu/',
    license: 'Smithsonian CC0 Open Access',
    featured: true,
    orbitCoordinates: { lat: 51.43, lon: -116.47 }
  },
  {
    id: 'paradoxides-davidis',
    accessionNumber: 'ACC-F-007',
    type: 'fossil',
    name: 'Paradoxides davidis',
    subtitle: 'Giant Middle Cambrian Armored Trilobite',
    hook: 'An armored Cambrian giant that grew crystal calcite eye lenses optically corrected against spherical aberration 505 million years ago.',
    story:
      'Trilobites were the undisputed masters of the Paleozoic seafloor for 270 million years, and Paradoxides davidis was one of their earliest giants. Reaching nearly 40 centimeters across the cold-water shelves of Avalonia, this benthic arthropod forged its dorsal shield from biomineralized high-magnesium calcite. Most astonishing were its crescentic compound eyes: rather than soft protein lenses, Paradoxides aligned pure calcite crystals along their c-axis to bend light underwater without optical distortion—inventing doublet lens geometry half a billion years before René Descartes and Christian Huygens.',
    facts: [
      'Compound eyes utilized oriented inorganic calcite crystals to eliminate spherical aberration underwater.',
      'Articulated thorax of 18–21 spinose segments allowed defensive enrollment and sediment burrowing.',
      'Serves as the global biostratigraphic index fossil for the Middle Cambrian Drumian stage.',
      'Found identically in Newfoundland and Wales—key paleontological proof that the Atlantic Ocean opened later.'
    ],
    whyItMatters:
      'Illustrates the dawn of biomineralized exoskeletons and crystal optics, while providing classic paleobiogeographic proof of continental drift across the Iapetus Ocean.',
    description:
      'Articulated calcite-exoskeleton marine arthropod displaying three axial lobes, crescentic compound eyes, and spinose pleural segments.',
    curatorialEssay:
      'Trilobites were among the earliest animals to biomineralize high-magnesium calcite into both protective dorsal armor and optically corrected crystal eye lenses. Paradoxides davidis reached over 35 centimeters in length, patrolling cold-water shelves of Gondwana and Avalonia.',
    stageIds: ['paleozoic'],
    ageMa: 505,
    ageDisplay: '505 Ma',
    taxon: 'Paradoxides davidis',
    clade: 'Arthropoda / Trilobita (Redlichiida)',
    geologicalPeriod: 'Cambrian Period (Drumian Age)',
    locality: 'Manuels River, Conception Bay, Newfoundland / St. Davids, Wales',
    stratigraphicFormation: 'Manuels River Formation',
    preservationMode: 'Mineralized calcitic dorsal exoskeleton in black shale',
    dimensions: '31.2 cm × 19.8 cm × 4.2 cm',
    model: '/models/paradoxides-davidis.glb',
    modelPreset: 'trilobite-paradoxides',
    source: 'Bergström & Levi-Setti (1978), Paleobiology 4(1); Natural History Museum London NHMUK PI It 2784.',
    sourceInstitution: 'Natural History Museum, London (NHMUK)',
    sourceUrl: 'https://data.nhm.ac.uk/',
    license: 'CC0 Open Data',
    orbitCoordinates: { lat: 47.52, lon: -52.95 }
  },
  {
    id: 'dunkleosteus-terrelli',
    accessionNumber: 'ACC-F-008',
    type: 'fossil',
    name: 'Dunkleosteus terrelli Cranial Armor',
    subtitle: 'Devonian Super-Predator Arthrodire Placoderm',
    hook: 'A six-meter armored fish with self-sharpening bone guillotines that snapped open in one-fiftieth of a second.',
    story:
      'During the Late Devonian "Age of Fishes" 358 million years ago, sharks were small coastal scavengers hiding from Dunkleosteus terrelli. Instead of true teeth, this arthrodire placoderm evolved massive dermal bone jaw plates (gnathals) that honed themselves to a razor edge every time the mouth closed. Biomechanical modeling of Cleveland Shale skulls reveals a four-bar linkage mechanism connecting the cranium, thoracic shield, and mandible: Dunkleosteus could wrench its jaws open in 20 milliseconds to suck prey inside, then clamp down with 5,300 newtons of bone-shearing force.',
    facts: [
      'Delivered a fang-tip bite pressure exceeding 1,100 megapascals—capable of slicing through ammonite shells and dermal armor.',
      'Four-bar kinetic skull linkage opened the jaws in 20 milliseconds, creating high-velocity suction feeding.',
      'Posterior body was unarmored and cartilaginous; mostly the heavy cranial and thoracic bone plates fossilized.',
      'Wiped out during the terminal Devonian Hangenberg anoxic crisis (~358.9 Ma).'
    ],
    whyItMatters:
      'Marks the first time vertebrate jawed fishes (Gnathostomata) ascended to the top of global marine food webs.',
    description:
      'Self-sharpening dermal bone jaw plates capable of delivering a 5,300-newton bite force in 20 milliseconds during the "Age of Fishes".',
    curatorialEssay:
      'Lacking true teeth, Dunkleosteus evolved razor-edged gnathal bone plates that sheared past one another like industrial guillotines. Its four-bar linkage skull kinetic system allowed the jaws to snap open in one-fiftieth of a second, creating powerful suction that drew armored prey directly into its gullet.',
    stageIds: ['paleozoic'],
    ageMa: 358,
    ageDisplay: '358 Ma',
    taxon: 'Dunkleosteus terrelli',
    clade: 'Gnathostomata / Placodermi (Arthrodira)',
    geologicalPeriod: 'Late Devonian Period (Famennian Age)',
    locality: 'Rocky River Valley, Cuyahoga County, Ohio, USA',
    stratigraphicFormation: 'Cleveland Shale Member (Ohio Shale)',
    preservationMode: 'Permineralized dermal bone plates in pyritic black shale',
    dimensions: '102.0 cm × 78.5 cm × 64.0 cm',
    model: '/models/dunkleosteus-terrelli.glb',
    modelPreset: 'dunkleosteus-jaw',
    source: 'Anderson & Westneat (2007), Biology Letters 3(1), 77–80; Cleveland Museum of Natural History CMNH 5768.',
    sourceInstitution: 'Cleveland Museum of Natural History / Smithsonian USNM',
    sourceUrl: 'https://www.cmnh.org/',
    license: 'Smithsonian CC0 / Institutional Reference',
    orbitCoordinates: { lat: 41.43, lon: -81.85 }
  },
  {
    id: 'tiktaalik-roseae',
    accessionNumber: 'ACC-F-009',
    type: 'fossil',
    name: 'Tiktaalik roseae (NUFV 108)',
    subtitle: 'Transitional "Fishapod" Bridging Water and Land',
    hook: 'Predicted by evolutionary theory and found in the Canadian Arctic: a fish with a mobile neck, lungs, and functional wrists.',
    story:
      'In 1999, paleontologists Neil Shubin, Ted Daeschler, and Farish Jenkins consulted geological maps to make a bold prediction: if lobe-finned fish evolved into four-legged land vertebrates between 380 and 365 million years ago, transitional fossils should lie in 375-million-year-old river sediments on Ellesmere Island in Nunavut. After five Arctic expeditions, a flat-headed snout emerged from the permafrost cliff. Named Tiktaalik roseae ("large freshwater fish" in Inuktitut), it possessed fish scales, gills, and fin rays—yet inside its fins were a humerus, radius, ulna, and flexing wrist bones built to do push-ups on shallow mudflats.',
    facts: [
      'Discovered in 2004 in the 375 Ma Fram Formation on Ellesmere Island, Nunavut, at 77° North latitude.',
      'Lost the bony opercular gill cover, freeing the skull from the shoulder girdle to create the first vertebrate neck.',
      'Pectoral fin skeleton contains homologous tetrapod limb bones: humerus, radius, ulna, and articulating carpals.',
      'Spiracular notches on the flattened skull roof indicate air-breathing lungs alongside functional gills.'
    ],
    whyItMatters:
      'Stands as a triumph of predictive evolutionary paleontology, capturing the exact anatomical transition that enabled vertebrates to leave the water and walk onto land.',
    description:
      'Late Devonian lobe-finned vertebrate combining fish scales and gills with a mobile neck, flat crocodilian skull, and weight-bearing wrist bones.',
    curatorialEssay:
      'Predicted using stratigraphic and paleogeographic modeling before its 2004 discovery on Ellesmere Island in the Canadian Arctic, Tiktaalik roseae captures the exact anatomical transition from fin to limb. Inside its pectoral fin lie homologous humerus, radius, ulna, and functional carpal joints capable of propping the body up in shallow braided streams.',
    stageIds: ['paleozoic'],
    ageMa: 375,
    ageDisplay: '375 Ma',
    taxon: 'Tiktaalik roseae',
    clade: 'Sarcopterygii / Elpistostegalia (Tetrapodomorpha)',
    geologicalPeriod: 'Late Devonian Period (Frasnian Age)',
    locality: 'Bird Fiord, Ellesmere Island, Nunavut, Canada',
    stratigraphicFormation: 'Fram Formation',
    preservationMode: 'Three-dimensional articulated permineralized bone in siltstone',
    dimensions: '44.5 cm × 26.0 cm × 12.2 cm (Anterior skeleton)',
    model: '/models/tiktaalik-roseae.glb',
    modelPreset: 'tiktaalik-limb',
    source: 'Daeschler, Shubin & Jenkins (2006), Nature 440, 757–763; Canadian Museum of Nature NUFV 108.',
    sourceInstitution: 'Canadian Museum of Nature / Academy of Natural Sciences',
    sourceUrl: 'https://doi.org/10.1038/nature04639',
    license: 'Public Scientific Citation',
    featured: true,
    orbitCoordinates: { lat: 77.18, lon: -86.25 }
  },
  {
    id: 'placenticeras-meeki',
    accessionNumber: 'ACC-F-010',
    type: 'fossil',
    name: 'Placenticeras meeki (Ammolite Suture Shell)',
    subtitle: 'Iridescent Late Cretaceous Ammonoid Cephalopod',
    hook: 'A logarithmic spiral shell from North America’s inland sea whose fractal internal walls and rainbow aragonite survived 75 million years.',
    story:
      'Seventy-five million years ago, a warm tropical ocean—the Western Interior Seaway—split North America in two from the Arctic to the Gulf of Mexico. Gliding through those waters was Placenticeras meeki, a fast-swimming coiled cephalopod related to modern squids and octopuses. As the ammonite grew, it secreted internal chamber walls (septa) folded into intricate fern-like fractal sutures that buttressed the thin shell against deep-water pressure and mosasaur bites. Sealed in anoxic Bearpaw marine shales in Alberta, its original aragonite platelets still diffract light in fiery emerald and crimson hues.',
    facts: [
      'Regulated buoyancy via a tubular siphuncle that pumped water and gas across camerae chambers.',
      'Complex ammonitic suture lines distributed point-load stresses from marine reptile bite punctures.',
      'Preserves original biogenic aragonite nacre (ammolite) rather than secondary mineral replacement.',
      'Went globally extinct at the 66.0 Ma K-Pg boundary when ocean acidification dissolved planktonic larval shells.'
    ],
    whyItMatters:
      'Combines mathematical logarithmic growth and fractal structural engineering with the highest-resolution marine index dating of the Mesozoic Era.',
    description:
      'Planispiral aragonite shell preserving intricate fractal ammonitic suture lines and biogenic nacreous iridescence from the Western Interior Seaway.',
    curatorialEssay:
      'Ammonites dominated Mesozoic marine ecosystems for 185 million years before vanishing alongside non-avian dinosaurs at the 66 Ma K-Pg boundary. Their internal gas-filled chambers (phragmocone) were divided by folded septa whose complex fractal edges reinforced the shell against hydrostatic crushing.',
    stageIds: ['mesozoic'],
    ageMa: 75,
    ageDisplay: '75.0 Ma',
    taxon: 'Placenticeras meeki',
    clade: 'Mollusca / Cephalopoda (Ammonoidea)',
    geologicalPeriod: 'Late Cretaceous Period (Campanian Age)',
    locality: 'St. Mary River, Lethbridge, Alberta, Canada',
    stratigraphicFormation: 'Bearpaw Formation',
    preservationMode: 'Original nacreous aragonite shell with suture exposure',
    dimensions: '34.0 cm diameter × 8.5 cm thickness',
    model: '/models/placenticeras-meeki.glb',
    modelPreset: 'ammonite-spiral',
    source: 'Kennedy & Cobban (1976), Special Papers in Palaeontology 17; Smithsonian USNM PAL 412890.',
    sourceInstitution: 'Smithsonian National Museum of Natural History (USNM)',
    sourceUrl: 'https://3d.si.edu/',
    license: 'Smithsonian CC0 3D Open Access',
    orbitCoordinates: { lat: 49.55, lon: -112.88 }
  },
  {
    id: 'archaeopteryx-lithographica',
    accessionNumber: 'ACC-F-011',
    type: 'fossil',
    name: 'Archaeopteryx lithographica (Berlin Specimen)',
    subtitle: 'Jurassic Transitional Avian Dinosaur in Solnhofen Limestone',
    hook: 'A feathered theropod dinosaur with teeth, winged claws, and flight feathers that proved birds are living dinosaurs.',
    story:
      'Unearthed by quarry workers near Eichstätt, Bavaria, in 1874—just fifteen years after Charles Darwin published On the Origin of Species—the Berlin specimen of Archaeopteryx lithographica remains the most famous fossil slab on Earth. Preserved in ultra-fine Solnhofen lagoonal limestone 150 million years ago, the raven-sized skeleton is a stunning anatomical mosaic. Had its feathers not left sub-millimeter impressions in the lime mud, it would have been classified as a small carnivorous dinosaur: it retains conical teeth, three clawed fingers on each wing, and a long bony tail, yet wears asymmetrical aerodynamic flight feathers.',
    facts: [
      'Asymmetrical vane geometry of primary wing remiges confirms active aerodynamic lift generation.',
      'Retains basal theropod dinosaur traits: gastralia (belly ribs), toothed jaws, and a 22-vertebra bony tail.',
      'Fused clavicles form a boomerang-shaped furcula (wishbone) anchoring flight musculature.',
      'Synchrotron X-ray fluorescence of the Berlin slab preserves chemical traces of original feather phosphorus and sulfur.'
    ],
    whyItMatters:
      'Provided the first irrefutable fossil verification of Darwinian macroevolution and established that modern birds are surviving avian theropod dinosaurs.',
    description:
      'Exquisitely preserved skeleton showing asymmetrical flight feathers alongside clawed three-fingered wings, toothed jaws, and a long bony theropod tail.',
    curatorialEssay:
      'Unearthed in 1874 near Eichstätt, Bavaria, just fifteen years after Darwin published On the Origin of Species, the Berlin Archaeopteryx remains one of paleontology’s crown jewels. Fine-grained lagoonal micrite captured sub-millimeter barbules of primary flight remiges around a distinctly dromaeosaur-like skeleton.',
    stageIds: ['mesozoic'],
    ageMa: 150,
    ageDisplay: '150.0 Ma',
    taxon: 'Archaeopteryx lithographica',
    clade: 'Dinosauria / Theropoda (Avialae)',
    geologicalPeriod: 'Late Jurassic Period (Tithonian Age)',
    locality: 'Blumenberg Quarry, Eichstätt, Bavaria, Germany',
    stratigraphicFormation: 'Solnhofen Plattenkalk (Altmühltal Formation)',
    preservationMode: 'Articulated skeleton & feather impressions in lithographic limestone',
    dimensions: '49.2 cm × 39.8 cm × 3.6 cm slab',
    model: '/models/archaeopteryx-lithographica.glb',
    modelPreset: 'archaeopteryx-slab',
    source: 'Wellnhofer (2009), Archaeopteryx: The Icon of Evolution; Museum für Naturkunde Berlin MB.Av.101.',
    sourceInstitution: 'Museum für Naturkunde Berlin (Humboldt-Universität)',
    sourceUrl: 'https://www.museumfuernaturkunde.berlin/',
    license: 'CC0 / Public Domain Specimen Scan',
    featured: true,
    orbitCoordinates: { lat: 48.89, lon: 11.18 }
  },
  {
    id: 'tyrannosaurus-rex-skull',
    accessionNumber: 'ACC-F-012',
    type: 'fossil',
    name: 'Tyrannosaurus rex Cranium (USNM 555000)',
    subtitle: 'Terminal Cretaceous Apex Coelurosaur Theropod',
    hook: 'A 1.5-meter biomechanical fortress with binocular hawk-like vision and 35,000-newton teeth built to explode solid bone.',
    story:
      'Walk up to the 1.5-meter skull of Tyrannosaurus rex (USNM 555000, "The Nation’s T. rex") from Montana’s Hell Creek Formation, and you are looking at the culmination of 165 million years of theropod evolution. Unlike earlier blade-toothed carnivores that sliced flesh, T. rex fused its nasal bones into a shock-absorbing arch and grew thick, banana-shaped D-section teeth rooted deep in the jaw. Combined with forward-facing binocular eyes, giant olfactory bulbs, and a 35,000-newton bite force, it ruled Western North America right up to the day the Chicxulub asteroid struck 66.0 million years ago.',
    facts: [
      'Generated ~35,000 to 57,000 newtons of posterior bite force—the highest of any known land animal.',
      '55-degree binocular visual field overlap provided stereoscopic depth perception superior to a modern hawk.',
      'Serrated ziphodont teeth had rounded cross-sections to withstand torsional bone-crushing stress without snapping.',
      'Digitized at sub-millimeter resolution by the Smithsonian 3D Program under a CC0 Public Domain license.'
    ],
    whyItMatters:
      'Represents the apex of Mesozoic terrestrial biomechanics and sensory evolution immediately prior to the Cretaceous–Paleogene mass extinction.',
    description:
      'Robust 1.5-meter skull with forward-facing binocular orbits, fused nasal bones, and banana-sized serrated D-section teeth engineered to pulverize bone.',
    curatorialEssay:
      'Living during the final two million years of the Mesozoic Era right up to the 66.0 Ma Chicxulub Asteroid Impact, Tyrannosaurus rex possessed the highest bite force of any terrestrial animal in Earth history (35,000+ newtons). Enlarged olfactory bulbs and a specialized inner-ear cochlea gave it acute low-frequency hearing and stereoscopic depth perception.',
    stageIds: ['mesozoic'],
    ageMa: 66.8,
    ageDisplay: '66.8 Ma',
    taxon: 'Tyrannosaurus rex',
    clade: 'Dinosauria / Theropoda (Tyrannosauridae)',
    geologicalPeriod: 'Late Cretaceous Period (Maastrichtian Age)',
    locality: 'Fort Peck Reservoir, McCone County, Montana, USA',
    stratigraphicFormation: 'Hell Creek Formation',
    preservationMode: 'Three-dimensional permineralized cranial elements',
    dimensions: '152.0 cm × 98.0 cm × 114.0 cm',
    model: '/models/tyrannosaurus-rex-skull.glb',
    modelPreset: 'trex-skull',
    source: 'Osborn (1905), Bulletin of the AMNH 21; Smithsonian 3D Digitization Program USNM 555000 ("Nation’s T. rex").',
    sourceInstitution: 'Smithsonian National Museum of Natural History (USNM 555000)',
    sourceUrl: 'https://3d.si.edu/object/3d/tyrannosaurus-rex-skull:d8c62d28-4ebc-11ea-b77f-2e728ce88125',
    license: 'Smithsonian CC0 3D Open Access',
    featured: true,
    orbitCoordinates: { lat: 47.78, lon: -106.21 }
  },
  {
    id: 'australopithecus-afarensis-lucy',
    accessionNumber: 'ACC-F-013',
    type: 'fossil',
    name: 'Australopithecus afarensis ("Lucy" AL 288-1)',
    subtitle: 'Pliocene Bipedal Hominin Partial Skeleton',
    hook: 'Forty-seven fossil bones from Ethiopia’s Afar Triangle that proved our ancestors walked upright on two legs millions of years before evolving large brains.',
    story:
      'On November 24, 1974, paleoanthropologist Donald Johanson spotted an elbow bone glinting in a sun-baked gully at Hadar, Ethiopia. Excavations recovered 40 percent of a single female hominin skeleton dated by volcanic ash layers to 3.2 million years ago—known globally as "Lucy" and in Amharic as Dinkinesh ("you are marvelous"). For decades, scientists assumed big brains evolved first and drove upright posture. Lucy reversed the story: her brain was no larger than a chimpanzee’s, yet her bowl-shaped pelvis and angled femur proved she strode upright across Pliocene savannas.',
    facts: [
      'Preserves 47 skeletal elements (40% of the body), dated via Argon-Argon volcanic tuff chronology to 3.20 Ma.',
      'Valgus knee angle (femoral bicondylar angle) positioned the feet directly beneath the body’s center of gravity.',
      'Broad, short iliac blades of the pelvis anchored gluteal muscles for single-leg balance during bipedal walking.',
      'Endocranial brain volume measured ~385–400 cm³, proving bipedalism preceded human brain expansion by over a million years.'
    ],
    whyItMatters:
      'Settled one of anthropology’s greatest debates by demonstrating that habitual upright walking—not brain expansion—was the foundational evolutionary step of the human lineage.',
    description:
      'Forty-percent complete hominin skeleton demonstrating that habitual upright bipedal locomotion evolved millions of years before encephalization.',
    curatorialEssay:
      'Discovered by Donald Johanson and Tom Gray at Hadar in the Afar Triangle of Ethiopia in 1974, AL 288-1 ("Lucy" / Dinkinesh) revolutionized paleoanthropology. While her cranial capacity remained ape-sized (~385 cm³), her broad flared pelvis, valgus knee angle, and arched foot bones prove she walked upright across Pliocene woodland savannas 3.2 million years ago.',
    stageIds: ['cenozoic'],
    ageMa: 3.2,
    ageDisplay: '3.20 Ma',
    taxon: 'Australopithecus afarensis',
    clade: 'Primates / Hominidae (Hominini)',
    geologicalPeriod: 'Neogene Period (Pliocene Epoch)',
    locality: 'Hadar, Afar Depression, Ethiopia',
    stratigraphicFormation: 'Hadar Formation (Kada Hadar Member)',
    preservationMode: '47 mineralized postcranial & mandibular skeletal elements',
    dimensions: '105.0 cm reconstructed stature (Pelvis & femur assembly: 42 cm)',
    model: '/models/australopithecus-lucy.glb',
    modelPreset: 'lucy-hominid',
    source: 'Johanson & White (1979), Science 203(4378), 321–330; National Museum of Ethiopia AL 288-1.',
    sourceInstitution: 'National Museum of Ethiopia / Smithsonian Human Origins Program',
    sourceUrl: 'https://humanorigins.si.edu/evidence/human-fossils/fossils/al-288-1',
    license: 'Smithsonian CC0 Educational Cast Archive',
    featured: true,
    orbitCoordinates: { lat: 11.18, lon: 40.58 }
  },
  {
    id: 'mammuthus-primigenius-molar',
    accessionNumber: 'ACC-F-014',
    type: 'fossil',
    name: 'Mammuthus primigenius Lamellar Molar',
    subtitle: 'Pleistocene Ice Age Woolly Mammoth Grinding Tooth',
    hook: 'A four-kilogram washboard grinding tooth engineered to pulverize silica-rich Ice Age tundra grasses across the frozen Mammoth Steppe.',
    story:
      'As Earth plunged into the Pleistocene Ice Ages, vast treeless grasslands—the Mammoth Steppe—stretched from Spain across Eurasia into the Yukon. Grazing those wind-blown, grit-coated sedges would wear down an ordinary mammal’s teeth in months. The woolly mammoth (Mammuthus primigenius) solved this engineering challenge with massive, washboard-like molars composed of 24 tightly compressed plates of hard enamel, dentine, and cementum. Rather than erupting vertically from below, six successive sets of molars marched horizontally forward through the jaw like a conveyor belt over a mammoth’s sixty-year life.',
    facts: [
      'Contains 24 parallel enamel-dentine-cementum lamellae acting as self-sharpening millstone ridges.',
      'Replaced horizontally six times during life via "conveyor-belt" mesial drift; when the sixth set wore out, the animal starved.',
      'Strontium and oxygen isotopes in the enamel lamellae record annual seasonal migrations of over 700 kilometers.',
      'Recovered from Late Pleistocene permafrost gravels (~40,000 BP) where cold preservation retains collagen proteins.'
    ],
    whyItMatters:
      'Captures how Cenozoic global cooling and grassland expansion drove rapid mammalian adaptation—and provides an isotopic archive of Late Pleistocene climate and megafaunal extinction.',
    description:
      'High-crowned hypsodont molar composed of 24 compressed enamel-dentine-cementum plates adapted for grazing abrasive periglacial steppe grasses.',
    curatorialEssay:
      'As Cenozoic global cooling culminated in the Quaternary glaciations, Mammuthus primigenius evolved washboard-like molars that progressed horizontally through the jaw like a conveyor belt six times during a mammoth’s 60-year lifespan. Stable carbon and strontium isotopes locked in these enamel plates record seasonal migrations across the Mammoth Steppe.',
    stageIds: ['cenozoic'],
    ageMa: 0.04,
    ageDisplay: '0.04 Ma (40,000 BP)',
    taxon: 'Mammuthus primigenius',
    clade: 'Mammalia / Proboscidea (Elephantidae)',
    geologicalPeriod: 'Quaternary Period (Late Pleistocene Epoch)',
    locality: 'Yukon Permafrost Gravels, Klondike / Doggerland North Sea',
    stratigraphicFormation: 'Late Wisconsinan Loess & Permafrost Gravels',
    preservationMode: 'Sub-fossil mineralized enamel, dentine, and cementum',
    dimensions: '28.5 cm × 11.4 cm × 19.2 cm (Weight: 4.1 kg)',
    model: '/models/mammuthus-molar.glb',
    modelPreset: 'mammoth-molar',
    source: 'Lister & Bahn (2007), Mammoths: Giants of the Ice Age; Smithsonian USNM PAL 23491.',
    sourceInstitution: 'Smithsonian National Museum of Natural History (USNM)',
    sourceUrl: 'https://3d.si.edu/',
    license: 'Smithsonian CC0 Open Access',
    orbitCoordinates: { lat: 64.06, lon: -139.43 }
  }
];
