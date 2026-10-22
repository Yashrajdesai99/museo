import type { CulturalArtifact } from '../types/catalog';

export const CULTURAL_ARTIFACTS: CulturalArtifact[] = [
  {
    id: 'lomekwi-stone-core',
    accessionNumber: 'ACC-A-001',
    type: 'artifact',
    name: 'Lomekwi 3 Basalt Anvil Core (LOM3-2011)',
    subtitle: 'Oldest Known Stone Tool Technology in the Archaeological Record',
    hook: 'Knapped 3.3 million years ago in Kenya, this heavy volcanic stone core proves hominins invented toolmaking half a million years before the genus Homo even existed.',
    story:
      'In 2011, an archaeological team led by Sonia Harmand took a wrong turn through the eroded badlands west of Lake Turkana, Kenya, and stumbled upon a discovery that rewrote human origins. Eroding out of 3.3-million-year-old volcanic sediments were massive basaltic cores, anvils, and razor-sharp flakes. Named the Lomekwian industry, these artifacts are 700,000 years older than the famous Oldowan tools and predate the earliest known fossils of the genus Homo. By smashing cobbles against stationary stone anvils, Pliocene hominins launched the technological trajectory that defines our species.',
    facts: [
      'Dated to 3.30 million years ago via paleomagnetic stratigraphy and Argon-Argon dated volcanic tuffs.',
      'Predates the earliest known fossil of the genus Homo (LD 350-1 at 2.8 Ma) by 500,000 years.',
      'Crafted using passive-hammer and bipolar anvil percussion rather than freehand knapping.',
      'Demonstrates that stone fracture mechanics were understood by Australopithecus or Kenyanthropus hominins.'
    ],
    whyItMatters:
      'Pushed the dawn of archaeology back by 700,000 years and decoupled the invention of technology from the origin of the genus Homo.',
    description:
      'Massive volcanic phonolite core knapped by bipolar percussion 3.3 million years ago—predating the earliest fossil evidence of the genus Homo.',
    curatorialEssay:
      'Excavated west of Lake Turkana in Kenya in 2011, the Lomekwi 3 assemblage pushed the origin of lithic technology back by 700,000 years before the Oldowan industry. Discrete percussion scars show that Pliocene hominins (likely Kenyanthropus platyops or Australopithecus afarensis) deliberately rotated cobbles against fixed stone anvils to detach sharp cutting flakes.',
    stageIds: ['cenozoic'],
    ageMa: 3.3,
    ageDisplay: '3.30 Ma',
    culture: 'Lomekwian Lithic Industry',
    archaeologicalPeriod: 'Pliocene / Pre-Oldowan Paleolithic',
    originRegion: 'West Turkana, Rift Valley, Kenya',
    material: 'Basaltic phonolite volcanic cobble',
    technique: 'Passive hammer & bipolar anvil percussion knapping',
    homininSpecies: 'Kenyanthropus platyops / Australopithecus afarensis',
    dimensions: '19.5 cm × 14.8 cm × 11.2 cm (Weight: 3.15 kg)',
    model: '/models/lomekwi-core.glb',
    modelPreset: 'lomekwi-core',
    source: 'Harmand et al. (2015), Nature 521, 310–315; National Museums of Kenya WT-LOM3.',
    sourceInstitution: 'National Museums of Kenya / Turkana Basin Institute',
    sourceUrl: 'https://doi.org/10.1038/nature14464',
    license: 'Public Scientific Record / Academic Citation',
    orbitCoordinates: { lat: 3.91, lon: 35.81 }
  },
  {
    id: 'acheulean-biface-handaxe',
    accessionNumber: 'ACC-A-002',
    type: 'artifact',
    name: 'Olduvai Gorge Acheulean Biface Handaxe',
    subtitle: 'Symmetrical Teardrop Stone Tool of Homo erectus',
    hook: 'The Swiss Army knife of the Paleolithic: a symmetrical teardrop stone axe whose design lasted over a million years across three continents.',
    story:
      'Around 1.76 million years ago in East Africa, Homo erectus stopped merely knocking sharp chips off river cobbles and began sculpting the stone core itself toward a mental blueprint. This Olduvai Gorge Bed II handaxe is a masterpiece of Acheulean bifacial engineering. Using heavy hammerstones for roughing out and softer bone or antler billets to thin the edges, the maker achieved striking bilateral symmetry across both planes. From butchering megafauna to digging tubers, the Acheulean handaxe remained humanity’s flagship technology for over 1.3 million years—the longest-running product design on Earth.',
    facts: [
      'Exhibits intentional three-dimensional bilateral symmetry requiring multi-step hierarchical planning.',
      'Brain imaging of modern knappers shows Acheulean biface production activates Broca’s language area.',
      'Carried by Homo erectus out of Africa across Eurasia, from South Africa to Boxgrove in Britain.',
      'Excavated from Bed II at Olduvai Gorge, Tanzania, following Mary Leakey’s stratigraphic typology.'
    ],
    whyItMatters:
      'Marks the cognitive emergence of an internal mental template, aesthetic symmetry, and high-fidelity cultural transmission across tens of thousands of generations.',
    description:
      'Bifacially flaked quartzite handaxe exhibiting bilateral symmetry, a mental template, and ergonomic cutting edges across a million-year tradition.',
    curatorialEssay:
      'Emerging around 1.76 million years ago, the Acheulean handaxe represents the longest-lasting technological design in human history. Unlike opportunistic Oldowan flakes, crafting a symmetrical teardrop biface required hierarchical planning, soft-hammer bone retouching, and a shared cultural aesthetic passed across thousands of generations.',
    stageIds: ['cenozoic'],
    ageMa: 1.4,
    ageDisplay: '1.40 Ma',
    culture: 'Acheulean Industry (Mode 2 Lithic)',
    archaeologicalPeriod: 'Lower Paleolithic (Early Stone Age)',
    originRegion: 'Olduvai Gorge (Bed II), Serengeti Plains, Tanzania',
    material: 'Coarse-grained metamorphic quartzite & phonolite',
    technique: 'Hard-hammer primary flaking with soft-hammer bifacial retouch',
    homininSpecies: 'Homo erectus / Homo ergaster',
    dimensions: '17.6 cm × 9.8 cm × 4.4 cm',
    model: '/models/acheulean-handaxe.glb',
    modelPreset: 'acheulean-handaxe',
    source: 'Leakey (1971), Olduvai Gorge Vol. 3; Smithsonian NMNH Anthropology Cast A412980.',
    sourceInstitution: 'Smithsonian National Museum of Natural History / British Museum',
    sourceUrl: 'https://humanorigins.si.edu/evidence/behavior/stone-tools',
    license: 'Smithsonian CC0 Open Access',
    featured: true,
    orbitCoordinates: { lat: -2.99, lon: 35.35 }
  },
  {
    id: 'blombos-engraved-ochre',
    accessionNumber: 'ACC-A-003',
    type: 'artifact',
    name: 'Blombos Cave Engraved Ochre Plaque (SAM-AA 8938)',
    subtitle: 'Earliest Abstract Geometric Symbolism by Homo sapiens',
    hook: 'Seventy-five thousand years ago on the South African coast, a human ground a crimson stone flat and carved the world’s oldest surviving geometric design.',
    story:
      'High in a limestone cliff overlooking the Indian Ocean at Blombos Cave, South Africa, archaeologists uncovered a palm-sized slab of deep red iron-oxide ochre sealed in 75,000-year-old hearth ash. First, an early Homo sapiens ground one edge flat against coarse quartzite to create a prepared canvas. Then, using a sharp stone point with steady, deliberate pressure, the maker incised two parallel horizontal lines intersected by a diagonal cross-hatched diamond lattice. Thirty-five millennia older than European cave paintings, this geometric engraving is the earliest unambiguous artifact of abstract symbolic thought.',
    facts: [
      'Dated to ~75,000–77,000 BP via optically stimulated luminescence (OSL) and thermoluminescence of burnt lithics.',
      'Microscopic groove analysis confirms the cross-hatched lattice was engraved in a single planned session.',
      'Found alongside perforated Nassarius kraussianus shell beads stained with red ochre pigment.',
      'Predates Upper Paleolithic European cave art (Chauvet, Lascaux) by more than 35,000 years.'
    ],
    whyItMatters:
      'Proves that abstract symbolic syntax, visual art, and behavioral modernity originated in Africa among Middle Stone Age Homo sapiens.',
    description:
      'Hematite red ochre slab intentionally ground flat and incised with a cross-hatched diamond lattice 75,000 years ago on the South African coast.',
    curatorialEssay:
      'Recovered from Middle Stone Age strata at Blombos Cave, this crimson iron-oxide block provides irrefutable proof that behavioral modernity and abstract symbolic syntax emerged in Africa tens of millennia before the Upper Paleolithic cave paintings of Europe. Microscopic analysis shows the bevel was ground smooth before a sharp lithic point engraved the parallel chevrons.',
    stageIds: ['cenozoic'],
    ageMa: 0.075,
    ageDisplay: '0.075 Ma (75,000 BP)',
    culture: 'Still Bay Middle Stone Age Tradition',
    archaeologicalPeriod: 'Middle Stone Age (Upper Pleistocene)',
    originRegion: 'Blombos Cave, Southern Cape Coastline, South Africa',
    material: 'Ferruginous hematite-rich red ochre siltstone',
    technique: 'Quartzite grinding abrasion & lithic burin cross-hatch engraving',
    homininSpecies: 'Anatomically Modern Homo sapiens',
    dimensions: '7.58 cm × 3.48 cm × 2.47 cm',
    model: '/models/blombos-ochre.glb',
    modelPreset: 'blombos-ochre',
    source: 'Henshilwood et al. (2002), Science 295(5558), 1278–1280; Iziko South African Museum SAM-AA 8938.',
    sourceInstitution: 'Iziko South African Museum / Smithsonian Human Origins Program',
    sourceUrl: 'https://doi.org/10.1038/science.1067575',
    license: 'Smithsonian CC0 Cast Reference',
    featured: true,
    orbitCoordinates: { lat: -34.41, lon: 21.22 }
  },
  {
    id: 'willendorf-paleolithic-figurine',
    accessionNumber: 'ACC-A-004',
    type: 'artifact',
    name: 'Gravettian Oolitic Limestone Figurine',
    subtitle: 'Upper Paleolithic Portable Sculptural Icon',
    hook: 'A palm-sized Ice Age limestone sculpture carried hundreds of kilometers across the Alps by mammoth-steppe hunter-gatherers 29,500 years ago.',
    story:
      'Excavated in 1908 from Paleolithic loess terraces above the Danube River in Lower Austria, this 11-centimeter figurine was carved with flint burins 29,500 years ago as Ice Age glaciers advanced across Europe. Instead of depicting facial features, the sculptor lavished attention on seven concentric rows of braided hair or woven fiber cap and coated the stone in crimson hematite ochre. In 2022, high-resolution micro-CT scans solved the mystery of its porous oolitic limestone: the rock contains Jurassic micro-shells matched to Lake Garda in northern Italy, proving Ice Age humans carried it across the Alps.',
    facts: [
      '2022 micro-CT tomography matched internal Jurassic oolite grains and brachiopod shell fragments to northern Italy.',
      'Demonstrates trans-Alpine mobility (>700 km) of Gravettian hunter-gatherers during the Last Glacial Period.',
      'Crown features seven concentric horizontal bands representing complex Paleolithic fiber weaving.',
      'Natural navel cavity was formed by a dissolved limonitic concretion intentionally centered by the artist.'
    ],
    whyItMatters:
      'Reveals continental-scale social networks, shared figurative iconography, and sophisticated textile traditions across Ice Age Europe.',
    description:
      'Carved non-local oolitic limestone statuette tinted with red ochre, exemplifying trans-European Ice Age artistic networks 29,500 years ago.',
    curatorialEssay:
      'Carved with flint burins during the Last Glacial Maximum, Upper Paleolithic portable figurines demonstrate long-distance material transport and shared cosmological iconography across mammoth-steppe hunter-gatherer bands. High-resolution micro-CT tomography revealed that the porous oolitic limestone originated hundreds of kilometers away from the Danube find-spot.',
    stageIds: ['cenozoic'],
    ageMa: 0.03,
    ageDisplay: '0.030 Ma (29,500 BP)',
    culture: 'Gravettian Upper Paleolithic Culture',
    archaeologicalPeriod: 'Upper Paleolithic (Late Pleistocene)',
    originRegion: 'Wachau Valley, Lower Austria, Central Europe',
    material: 'Oolitic limestone with hematite red ochre pigment traces',
    technique: 'Flint lithic carving, pecking, and ochre burnishing',
    homininSpecies: 'Homo sapiens',
    dimensions: '11.1 cm × 5.7 cm × 4.5 cm',
    model: '/models/venus-figurine.glb',
    modelPreset: 'venus-figurine',
    source: 'Weber et al. (2022), Scientific Reports 12, 2926; Naturhistorisches Museum Wien NHMW-Prae-44606.',
    sourceInstitution: 'Natural History Museum Vienna (NHMW)',
    sourceUrl: 'https://doi.org/10.1038/s41598-022-06799-z',
    license: 'CC-BY 4.0 / Public Scientific Archive',
    orbitCoordinates: { lat: 48.32, lon: 15.4 }
  },
  {
    id: 'jomon-flame-rimmed-vessel',
    accessionNumber: 'ACC-A-005',
    type: 'artifact',
    name: 'Jōmon Cord-Marked Ceramic Vessel (Kaen-Doki)',
    subtitle: 'Pre-Agricultural Hunter-Gatherer Pyrotechnology',
    hook: 'Baroque, flame-crowned earthenware created by Japanese forest and maritime hunter-gatherers millennia before intensive agriculture.',
    story:
      'Archaeology once taught that pottery was invented only after farming forced humans to settle down and store grain. Japan’s Jōmon tradition overturned that rule. Beginning over 16,000 years ago, affluent hunter-gatherers along Honshu’s rivers and coastlines used fire to transform soft wet clay into durable stone-like cooking vessels—unlocking calories from acorns, chestnuts, and marine shellfish. By the Middle Jōmon period in the snowy Shinano River basin, potters pushed coiled clay to breathtaking sculptural extremes, crowning their vessels with swirling "flame-style" (Kaen-Doki) cockscomb rims and twisted-cord impressions.',
    facts: [
      'Jōmon ("cord-marked") derives from pressing twisted plant-fiber cords into damp clay before open-pit firing.',
      'Lipid residue analysis of charred interior crusts confirms boiling of salmonids, marine mammals, and forest nuts.',
      'Constructed entirely by hand-coiling tempered clay without a potter’s wheel and fired at ~600–800°C.',
      'Demonstrates that sedentary villages and monumental ceramic art flourished without cereal agriculture.'
    ],
    whyItMatters:
      'Proves that ceramic pyrotechnology and complex sedentary society emerged among foraging communities long before the Neolithic agricultural transition.',
    description:
      'Sculptural earthenware cooking vessel featuring twisted-cord (jōmon) surface impressions and dramatic flame-like rim projections.',
    curatorialEssay:
      'The Jōmon archipelago produced the world’s earliest ceramic tradition (~14,500 BCE), proving that complex pyrotechnology and sedentary village storage emerged among maritime forest hunter-gatherers millennia before intensive cereal farming. By Middle Jōmon, potters transformed utilitarian cooking pots into baroque, three-dimensional ritual sculptures.',
    stageIds: ['cenozoic'],
    ageMa: 0.012,
    ageDisplay: '0.012 Ma (c. 10,000–3,000 BCE)',
    culture: 'Jōmon Culture (Shinano River Basin Tradition)',
    archaeologicalPeriod: 'Incipient to Middle Jōmon Period (Holocene)',
    originRegion: 'Niigata Prefecture, Honshu, Japan',
    material: 'Low-fired earthenware clay tempered with mica and plant fibers',
    technique: 'Coiled clay construction, cord-wrapped rolling, open-pit firing (~700°C)',
    homininSpecies: 'Homo sapiens',
    dimensions: '46.5 cm height × 38.0 cm rim diameter',
    model: '/models/jomon-vessel.glb',
    modelPreset: 'jomon-vessel',
    source: 'Habu (2004), Ancient Jomon of Japan; Tokyo National Museum / British Museum OA+.724.',
    sourceInstitution: 'Tokyo National Museum / Smithsonian Freer Gallery of Art',
    sourceUrl: 'https://www.tnm.jp/',
    license: 'CC0 Public Domain Cultural Heritage',
    orbitCoordinates: { lat: 37.42, lon: 138.85 }
  },
  {
    id: 'uruk-proto-cuneiform-tablet',
    accessionNumber: 'ACC-A-006',
    type: 'artifact',
    name: 'Uruk IV Administrative Cuneiform Tablet',
    subtitle: 'Inauguration of Recorded Human Writing & Accounting',
    hook: 'Pressed with a cut reed into wet Mesopotamian river clay 5,100 years ago, this barley ledger marks the exact boundary where prehistory ends and recorded history begins.',
    story:
      'Around 3100 BCE in the southern Mesopotamian metropolis of Uruk (modern Warka, Iraq), tens of thousands of citizens depended on temple granaries, herds, and breweries. Spoken memory could no longer track the flow of barley and labor. Scribes solved the bottleneck by smoothing a cushion of alluvial Euphrates clay and pressing the corner of a cut reed stylus into the surface: circular impressions recorded sexagesimal numbers, while incised pictograms denoted grain, beer jars, and officials. With this humble accounting ledger, humanity externalized memory outside the biological brain.',
    facts: [
      'Excavated from the Eanna temple precinct at Uruk (Level IV–III, c. 3100–3000 BCE).',
      'Uses a proto-sexagesimal (base-60) numerical system that still governs our 60-minute hour and 360-degree circle.',
      'Combines impressed numerical metrological marks with incised ideographs for barley (ŠE) and ration bowls (NINDA).',
      'Digitized by the Cuneiform Digital Library Initiative (CDLI) and The British Museum.'
    ],
    whyItMatters:
      'Inaugurated recorded human history by inventing writing—allowing knowledge, law, science, and memory to survive across millennia.',
    description:
      'Sun-baked alluvial clay tablet impressed with reed-stylus numerical bullae and wedge-shaped pictograms recording barley rations in ancient Sumer.',
    curatorialEssay:
      'When urban populations surged in the southern Mesopotamian floodplain around 3100 BCE, temple administrators outgrew human memory. By pressing a bevel-cut reed stylus into damp Tigris–Euphrates clay, scribes invented external information storage—marking the formal boundary between geological prehistory and documented human history.',
    stageIds: ['cenozoic'],
    ageMa: 0.005,
    ageDisplay: '0.005 Ma (c. 3100 BCE)',
    culture: 'Sumerian / Late Uruk Urban Civilization (Uruk III–IV)',
    archaeologicalPeriod: 'Chalcolithic to Early Bronze Age',
    originRegion: 'Uruk (Warka), Southern Mesopotamia (Modern Iraq)',
    material: 'Levigated alluvial Euphrates clay',
    technique: 'Cut-reed stylus impression and sun/kiln hardening',
    homininSpecies: 'Homo sapiens',
    dimensions: '9.4 cm × 6.8 cm × 2.3 cm',
    model: '/models/cuneiform-tablet.glb',
    modelPreset: 'cuneiform-tablet',
    source: 'Nissen, Damerow & Englund (1993), Archaic Bookkeeping; British Museum ME 116730 / CDLI P005312.',
    sourceInstitution: 'The British Museum / Cuneiform Digital Library Initiative (CDLI)',
    sourceUrl: 'https://cdli.mpiwg-berlin.mpg.de/',
    license: 'CC0 Open Access Archival Record',
    featured: true,
    orbitCoordinates: { lat: 31.32, lon: 45.64 }
  }
];
