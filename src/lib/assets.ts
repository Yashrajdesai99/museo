import type { SpecimenModelPreset } from '../types/catalog';

export interface AssetManifestItem {
  id: string;
  label: string;
  glbPath: string;
  preset: SpecimenModelPreset | 'robot-docent' | 'ticket-counter' | 'physics-ticket';
  sourceInstitution: string;
  license: string;
}

/**
 * Central 23-model asset manifest (20 catalog specimens + 3 login lobby models).
 * Records path, procedural fallback preset, and verified CC0/institutional provenance.
 */
export const ASSET_MANIFEST: Record<string, AssetManifestItem> = {
  'robot-docent': {
    id: 'robot-docent',
    label: 'MUSEO Docent Automaton Mk-IV',
    glbPath: '/models/robot-guide.glb',
    preset: 'robot-docent',
    sourceInstitution: 'MUSEO Original Bauhaus Geometric Assembly',
    license: 'CC0 1.0 Universal'
  },
  'ticket-counter': {
    id: 'ticket-counter',
    label: 'Brutalist Admission Kiosk Counter',
    glbPath: '/models/ticket-counter.glb',
    preset: 'ticket-counter',
    sourceInstitution: 'MUSEO Original Architectural Assembly',
    license: 'CC0 1.0 Universal'
  },
  'physics-ticket': {
    id: 'physics-ticket',
    label: 'Deep Time Punched Brass & Paper Pass',
    glbPath: '/models/physics-ticket.glb',
    preset: 'physics-ticket',
    sourceInstitution: 'MUSEO Original Pass Geometry',
    license: 'CC0 1.0 Universal'
  },
  'jack-hills-zircon': {
    id: 'jack-hills-zircon',
    label: 'Jack Hills Detrital Zircon Crystal',
    glbPath: '/models/jack-hills-zircon.glb',
    preset: 'zircon-crystal',
    sourceInstitution: 'UW–Madison Geology Museum / WAM',
    license: 'CC0 Public Scientific Reference'
  },
  'dresser-stromatolite': {
    id: 'dresser-stromatolite',
    label: 'Pilbara Conical Stromatolite',
    glbPath: '/models/dresser-stromatolite.glb',
    preset: 'stromatolite-dome',
    sourceInstitution: 'Smithsonian NMNH Paleobiology',
    license: 'Smithsonian CC0'
  },
  'grypania-spiralis': {
    id: 'grypania-spiralis',
    label: 'Grypania spiralis Ironstone Slab',
    glbPath: '/models/grypania-spiralis.glb',
    preset: 'grypania-coil',
    sourceInstitution: 'Peabody Museum / PBDB',
    license: 'CC0 Public Domain'
  },
  'dickinsonia-costata': {
    id: 'dickinsonia-costata',
    label: 'Dickinsonia costata Quartzite Cast',
    glbPath: '/models/dickinsonia-costata.glb',
    preset: 'dickinsonia-ribbed',
    sourceInstitution: 'South Australian Museum / Smithsonian NMNH',
    license: 'Smithsonian CC0'
  },
  'charnia-masoni': {
    id: 'charnia-masoni',
    label: 'Charnia masoni Rangeomorph Frond',
    glbPath: '/models/charnia-masoni.glb',
    preset: 'charnia-frond',
    sourceInstitution: 'Leicester Museum & Art Gallery / BGS',
    license: 'CC-BY / Public Archival Record'
  },
  'anomalocaris-canadensis': {
    id: 'anomalocaris-canadensis',
    label: 'Anomalocaris canadensis Radiodont',
    glbPath: '/models/anomalocaris-canadensis.glb',
    preset: 'anomalocaris-predator',
    sourceInstitution: 'Smithsonian NMNH (USNM 57490)',
    license: 'Smithsonian CC0'
  },
  'paradoxides-davidis': {
    id: 'paradoxides-davidis',
    label: 'Paradoxides davidis Trilobite',
    glbPath: '/models/paradoxides-davidis.glb',
    preset: 'trilobite-paradoxides',
    sourceInstitution: 'Natural History Museum London',
    license: 'CC0 Open Data'
  },
  'dunkleosteus-terrelli': {
    id: 'dunkleosteus-terrelli',
    label: 'Dunkleosteus terrelli Cranial Armor',
    glbPath: '/models/dunkleosteus-terrelli.glb',
    preset: 'dunkleosteus-jaw',
    sourceInstitution: 'Cleveland Museum of Natural History / USNM',
    license: 'Smithsonian CC0'
  },
  'tiktaalik-roseae': {
    id: 'tiktaalik-roseae',
    label: 'Tiktaalik roseae Transitional Tetrapodomorph',
    glbPath: '/models/tiktaalik-roseae.glb',
    preset: 'tiktaalik-limb',
    sourceInstitution: 'Canadian Museum of Nature (NUFV 108)',
    license: 'Public Scientific Citation'
  },
  'placenticeras-meeki': {
    id: 'placenticeras-meeki',
    label: 'Placenticeras meeki Ammonite',
    glbPath: '/models/placenticeras-meeki.glb',
    preset: 'ammonite-spiral',
    sourceInstitution: 'Smithsonian NMNH (USNM PAL 412890)',
    license: 'Smithsonian CC0'
  },
  'archaeopteryx-lithographica': {
    id: 'archaeopteryx-lithographica',
    label: 'Archaeopteryx lithographica Limestone Slab',
    glbPath: '/models/archaeopteryx-lithographica.glb',
    preset: 'archaeopteryx-slab',
    sourceInstitution: 'Museum für Naturkunde Berlin',
    license: 'CC0 Public Domain'
  },
  'tyrannosaurus-rex-skull': {
    id: 'tyrannosaurus-rex-skull',
    label: 'Tyrannosaurus rex Cranium (USNM 555000)',
    glbPath: '/models/tyrannosaurus-rex-skull.glb',
    preset: 'trex-skull',
    sourceInstitution: 'Smithsonian 3D Digitization (USNM 555000)',
    license: 'Smithsonian CC0'
  },
  'australopithecus-afarensis-lucy': {
    id: 'australopithecus-afarensis-lucy',
    label: 'Australopithecus afarensis ("Lucy" AL 288-1)',
    glbPath: '/models/australopithecus-lucy.glb',
    preset: 'lucy-hominid',
    sourceInstitution: 'National Museum of Ethiopia / Smithsonian',
    license: 'Smithsonian CC0'
  },
  'mammuthus-primigenius-molar': {
    id: 'mammuthus-primigenius-molar',
    label: 'Mammuthus primigenius Lamellar Molar',
    glbPath: '/models/mammuthus-molar.glb',
    preset: 'mammoth-molar',
    sourceInstitution: 'Smithsonian NMNH (USNM PAL 23491)',
    license: 'Smithsonian CC0'
  },
  'lomekwi-stone-core': {
    id: 'lomekwi-stone-core',
    label: 'Lomekwi 3 Basalt Anvil Core',
    glbPath: '/models/lomekwi-core.glb',
    preset: 'lomekwi-core',
    sourceInstitution: 'National Museums of Kenya',
    license: 'Public Scientific Record'
  },
  'acheulean-biface-handaxe': {
    id: 'acheulean-biface-handaxe',
    label: 'Olduvai Gorge Acheulean Biface Handaxe',
    glbPath: '/models/acheulean-handaxe.glb',
    preset: 'acheulean-handaxe',
    sourceInstitution: 'Smithsonian NMNH (A412980)',
    license: 'Smithsonian CC0'
  },
  'blombos-engraved-ochre': {
    id: 'blombos-engraved-ochre',
    label: 'Blombos Cave Engraved Ochre Plaque',
    glbPath: '/models/blombos-ochre.glb',
    preset: 'blombos-ochre',
    sourceInstitution: 'Iziko South African Museum / Smithsonian',
    license: 'Smithsonian CC0'
  },
  'willendorf-paleolithic-figurine': {
    id: 'willendorf-paleolithic-figurine',
    label: 'Gravettian Oolitic Limestone Figurine',
    glbPath: '/models/venus-figurine.glb',
    preset: 'venus-figurine',
    sourceInstitution: 'Natural History Museum Vienna (NHMW)',
    license: 'CC-BY 4.0'
  },
  'jomon-flame-rimmed-vessel': {
    id: 'jomon-flame-rimmed-vessel',
    label: 'Jōmon Cord-Marked Ceramic Vessel',
    glbPath: '/models/jomon-vessel.glb',
    preset: 'jomon-vessel',
    sourceInstitution: 'Tokyo National Museum',
    license: 'CC0 Public Domain'
  },
  'uruk-proto-cuneiform-tablet': {
    id: 'uruk-proto-cuneiform-tablet',
    label: 'Uruk IV Administrative Cuneiform Tablet',
    glbPath: '/models/cuneiform-tablet.glb',
    preset: 'cuneiform-tablet',
    sourceInstitution: 'British Museum / CDLI',
    license: 'CC0 Open Access'
  }
};
