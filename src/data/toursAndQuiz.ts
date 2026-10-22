import type { SpecimenModelPreset } from '../types/catalog';
import type { EvolutionStageId } from '../types/evolution';

export interface SpecimenHotspot {
  id: string;
  index: string;
  title: string;
  detail: string;
  localPosition: [number, number, number];
  explodeOffset: [number, number, number];
}

export interface GuidedTourStop {
  ageMa: number;
  stageId: EvolutionStageId;
  entityId: string;
  headline: string;
  docentCommentary: string;
}

export interface GuidedTour {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  durationLabel: string;
  stops: GuidedTourStop[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedEntityId: string;
  ageDisplay: string;
}

/**
 * 3D Anatomical & Structural Hotspot Pins for all 20 Specimen Presets.
 */
export const SPECIMEN_HOTSPOTS: Record<SpecimenModelPreset, SpecimenHotspot[]> = {
  'zircon-crystal': [
    {
      id: 'z-1',
      index: '01',
      title: 'Tetragonal Bipyramidal Termination',
      detail: 'Sharp crystal faces survived 4.4 billion years of sedimentary recycling due to ZrSiO₄ hardness (7.5 Mohs).',
      localPosition: [0.0, 0.85, 0.25],
      explodeOffset: [0, 0.45, 0]
    },
    {
      id: 'z-2',
      index: '02',
      title: 'Oscillatory U-Pb Growth Zoning',
      detail: 'Concentric uranium-lead growth rings act as a radiometric stopwatch locked at 4,404 ± 8 Ma.',
      localPosition: [0.35, 0.1, 0.35],
      explodeOffset: [0.3, 0, 0.3]
    },
    {
      id: 'z-3',
      index: '03',
      title: 'Elevated δ18O Hydrosphere Inclusion',
      detail: 'Heavy oxygen isotope signatures prove the parent Hadean magma assimilated cool surface liquid water.',
      localPosition: [-0.35, -0.55, 0.25],
      explodeOffset: [-0.35, -0.35, 0.2]
    }
  ],
  'stromatolite-dome': [
    {
      id: 's-1',
      index: '01',
      title: 'Phototrophic Apex Cone',
      detail: 'Cyanobacterial filaments migrated upward toward Paleoarchean sunlight, forming conical pinnacles.',
      localPosition: [0.0, 0.68, 0.25],
      explodeOffset: [0, 0.5, 0]
    },
    {
      id: 's-2',
      index: '02',
      title: 'Wrinkled Chert & Barite Laminae',
      detail: 'Alternating organic-rich dark chert and carbonate-replaced layers trap microscopic biofilm textures.',
      localPosition: [0.52, 0.05, 0.42],
      explodeOffset: [0.35, 0.1, 0.3]
    },
    {
      id: 's-3',
      index: '03',
      title: 'Fenestral Gas-Bubble Voids',
      detail: 'Primary cavities where metabolic gases accumulated beneath cohesive microbial mats 3,480 Ma.',
      localPosition: [-0.55, -0.35, 0.45],
      explodeOffset: [-0.3, -0.25, 0.25]
    }
  ],
  'grypania-coil': [
    {
      id: 'g-1',
      index: '01',
      title: 'Helical Carbonaceous Thallus',
      detail: 'Coiled 14 mm ribbon width exceeds prokaryotic diffusion limits, signaling true eukaryotic organization.',
      localPosition: [0.22, 0.2, 0.22],
      explodeOffset: [0, 0.45, 0.2]
    },
    {
      id: 'g-2',
      index: '02',
      title: 'Hematite-Magnetite Iron Band',
      detail: 'Precipitated as photosynthetic O₂ oxidized dissolved ferrous iron in Paleoproterozoic seas.',
      localPosition: [-0.48, 0.02, 0.35],
      explodeOffset: [-0.3, 0, 0.25]
    },
    {
      id: 'g-3',
      index: '03',
      title: 'Negaunee Ironstone Matrix',
      detail: 'Low-energy marine basin sediment that preserved soft algal ribbons without bioturbation.',
      localPosition: [0.45, -0.15, -0.3],
      explodeOffset: [0.25, -0.3, -0.2]
    }
  ],
  'dickinsonia-ribbed': [
    {
      id: 'd-1',
      index: '01',
      title: 'Glide-Reflection Midline Axis',
      detail: 'Isomers alternate with subtle offset symmetry along the longitudinal furrow.',
      localPosition: [0.0, 0.22, 0.15],
      explodeOffset: [0, 0.45, 0.2]
    },
    {
      id: 'd-2',
      index: '02',
      title: 'Quilted Pneu-Chamber Isomers',
      detail: 'Fluid-filled tubular modules expanded as Dickinsonia crept across Ediacaran microbial mats.',
      localPosition: [0.42, 0.14, 0.38],
      explodeOffset: [0.35, 0.25, 0.3]
    },
    {
      id: 'd-3',
      index: '03',
      title: 'Cholesteroid Biomarker Horizon',
      detail: 'Preserved C27 animal steroid molecules that proved Dickinsonia was a true basal metazoan.',
      localPosition: [-0.52, -0.05, 0.45],
      explodeOffset: [-0.35, -0.25, 0.25]
    }
  ],
  'charnia-frond': [
    {
      id: 'c-1',
      index: '01',
      title: 'Self-Similar Rangeomorph Branches',
      detail: 'Fractal first-, second-, and third-order branches maximized surface area for osmotrophy.',
      localPosition: [0.25, 0.45, 0.15],
      explodeOffset: [0.35, 0.35, 0.15]
    },
    {
      id: 'c-2',
      index: '02',
      title: 'Zig-Zag Central Rachis',
      detail: 'Flexible axial stalk allowed the frond to sway in deep-water contour currents.',
      localPosition: [-0.2, -0.05, 0.15],
      explodeOffset: [-0.3, 0.05, 0.15]
    },
    {
      id: 'c-3',
      index: '03',
      title: 'Benthic Bulbous Holdfast',
      detail: 'Anchored the organism into dark abyssal turbidite muds well below the photic zone.',
      localPosition: [0.0, -0.75, 0.28],
      explodeOffset: [0, -0.45, 0.2]
    }
  ],
  'anomalocaris-predator': [
    {
      id: 'a-1',
      index: '01',
      title: 'Articulated Raptorial Appendages',
      detail: '14-segmented grasping arms lined with paired ventral spines for impaling Cambrian trilobites.',
      localPosition: [0.82, -0.05, 0.25],
      explodeOffset: [0.5, -0.15, 0.25]
    },
    {
      id: 'a-2',
      index: '02',
      title: '16,000-Lens Stalked Compound Eyes',
      detail: 'Granted acute trichromatic or dichromatic motion tracking in sunlit Burgess Shale waters.',
      localPosition: [0.65, 0.22, 0.32],
      explodeOffset: [0.35, 0.35, 0.35]
    },
    {
      id: 'a-3',
      index: '03',
      title: 'Undulating Lateral Swimming Flaps',
      detail: 'Overlapping flexible lobes functioned as a single sinusoidal hydrofoil.',
      localPosition: [-0.15, 0.05, 0.55],
      explodeOffset: [-0.2, 0.1, 0.45]
    }
  ],
  'trilobite-paradoxides': [
    {
      id: 'tp-1',
      index: '01',
      title: 'Cephalic Shield & Calcite Eyes',
      detail: 'Crescentic holochroal eyes composed of oriented calcite crystals that eliminated spherical aberration.',
      localPosition: [0.35, 0.18, -0.35],
      explodeOffset: [0.25, 0.35, -0.35]
    },
    {
      id: 'tp-2',
      index: '02',
      title: 'Tri-Lobed Thoracic Axial Rings',
      detail: 'Articulated calcitic tergites allowed the arthropod to enroll defensively on the seafloor.',
      localPosition: [0.0, 0.15, 0.1],
      explodeOffset: [0, 0.4, 0]
    },
    {
      id: 'tp-3',
      index: '03',
      title: 'Spinose Pleural Margins',
      detail: 'Backward-swept pleural spines distributed weight across soft Cambrian muds.',
      localPosition: [-0.55, 0.05, 0.25],
      explodeOffset: [-0.45, 0, 0.2]
    }
  ],
  'dunkleosteus-jaw': [
    {
      id: 'dk-1',
      index: '01',
      title: 'Self-Sharpening Gnathal Bone Blades',
      detail: 'Vertical shearing action honed the dermal bone edges into fangs capable of puncturing arthrodiran armor.',
      localPosition: [0.55, -0.05, 0.25],
      explodeOffset: [0.45, -0.1, 0.25]
    },
    {
      id: 'dk-2',
      index: '02',
      title: 'Four-Bar Kinetic Cranial Joint',
      detail: 'Biomechanical linkage dropped the mandible and lifted the skull roof simultaneously in 20 ms.',
      localPosition: [-0.25, 0.25, 0.35],
      explodeOffset: [-0.35, 0.35, 0.25]
    },
    {
      id: 'dk-3',
      index: '03',
      title: 'Inferognathal Mandibular Lever',
      detail: 'Delivered over 5,300 newtons of bite force at the anterior fang tip.',
      localPosition: [0.35, -0.32, 0.25],
      explodeOffset: [0.25, -0.45, 0.2]
    }
  ],
  'tiktaalik-limb': [
    {
      id: 'tk-1',
      index: '01',
      title: 'Flattened Tetrapodomorph Cranium',
      detail: 'Dorsally positioned orbits and loss of the opercular gill cover freed the neck to turn independently.',
      localPosition: [0.45, 0.2, 0.15],
      explodeOffset: [0.45, 0.3, 0]
    },
    {
      id: 'tk-2',
      index: '02',
      title: 'Homologous Humerus, Radius & Ulna',
      detail: 'Endochondral fin skeleton preserves the exact one-bone / two-bone limb formula of all land vertebrates.',
      localPosition: [-0.08, -0.12, 0.45],
      explodeOffset: [-0.1, -0.25, 0.45]
    },
    {
      id: 'tk-3',
      index: '03',
      title: 'Weight-Bearing Distal Carpal Wrist',
      detail: 'Allowed the pectoral fin to flex at a 90° palm-down posture on Devonian stream shallows.',
      localPosition: [0.08, -0.28, 0.62],
      explodeOffset: [0.15, -0.4, 0.55]
    }
  ],
  'ammonite-spiral': [
    {
      id: 'am-1',
      index: '01',
      title: 'Ammolite Nacreous Outer Layer',
      detail: 'Biogenic aragonite platelets diffract light into emerald and crimson spectral iridescence.',
      localPosition: [0.55, 0.35, 0.18],
      explodeOffset: [0.4, 0.3, 0.25]
    },
    {
      id: 'am-2',
      index: '02',
      title: 'Fractal Ammonitic Suture Septa',
      detail: 'Complexly fluted chamber dividers buttressed the phragmocone against deep mesopelagic water pressure.',
      localPosition: [-0.45, 0.25, 0.18],
      explodeOffset: [-0.4, 0.25, 0.25]
    },
    {
      id: 'am-3',
      index: '03',
      title: 'Siphuncle Buoyancy Conduit',
      detail: 'Ventral tube that osmotically pumped water and gas to regulate vertical swimming depth.',
      localPosition: [0.1, -0.58, 0.18],
      explodeOffset: [0.1, -0.45, 0.2]
    }
  ],
  'archaeopteryx-slab': [
    {
      id: 'ar-1',
      index: '01',
      title: 'Asymmetrical Primary Remiges',
      detail: 'Aerodynamic leading-edge feather vanes prove active powered or gliding flight capability by 150 Ma.',
      localPosition: [0.52, 0.05, 0.12],
      explodeOffset: [0.45, 0.1, 0.35]
    },
    {
      id: 'ar-2',
      index: '02',
      title: 'Three-Clawed Manus & Furcula',
      detail: 'Retained unfused raptorial wing digits alongside an avian wishbone (furcula) for flight muscle attachment.',
      localPosition: [-0.35, 0.22, 0.12],
      explodeOffset: [-0.35, 0.3, 0.35]
    },
    {
      id: 'ar-3',
      index: '03',
      title: 'Bony Caudal Theropod Tail',
      detail: '20+ unfused caudal vertebrae before later Cretaceous birds evolved a fused pygostyle.',
      localPosition: [0.0, -0.35, 0.12],
      explodeOffset: [0, -0.4, 0.3]
    }
  ],
  'trex-skull': [
    {
      id: 'tr-1',
      index: '01',
      title: 'Fused Nasal Vault & Maxilla',
      detail: 'Co-ossified nasal bones absorbed compressive bending stresses during 35,000-newton bone-crushing bites.',
      localPosition: [0.52, 0.28, 0.22],
      explodeOffset: [0.45, 0.35, 0.2]
    },
    {
      id: 'tr-2',
      index: '02',
      title: 'Stereoscopic Keyhole Orbits',
      detail: 'Forward-canting temporal region provided a 55° binocular overlap rivaling modern raptors.',
      localPosition: [-0.15, 0.32, 0.36],
      explodeOffset: [-0.25, 0.4, 0.35]
    },
    {
      id: 'tr-3',
      index: '03',
      title: 'D-Section Serrated Dentition',
      detail: 'Thick, deep-rooted ziphodont crowns with chisel-like denticles that splintered ceratopsian cortical bone.',
      localPosition: [0.42, -0.14, 0.26],
      explodeOffset: [0.35, -0.35, 0.25]
    }
  ],
  'lucy-hominid': [
    {
      id: 'lu-1',
      index: '01',
      title: 'Broad Shortened Iliac Blades',
      detail: 'Bowl-shaped pelvis anchored gluteal abductors to stabilize the torso on a single supporting leg.',
      localPosition: [0.28, 0.22, 0.12],
      explodeOffset: [0.38, 0.2, 0.2]
    },
    {
      id: 'lu-2',
      index: '02',
      title: 'Bicondylar Femoral Valgus Angle',
      detail: 'Inward-angled femur positioned the knee joint directly beneath the body’s center of gravity.',
      localPosition: [-0.22, -0.35, 0.12],
      explodeOffset: [-0.35, -0.35, 0.2]
    },
    {
      id: 'lu-3',
      index: '03',
      title: 'Lordotic Lumbar Vertebral Column',
      detail: 'Curved lower spine absorbed vertical heel-strike forces across Pliocene savanna woodlands.',
      localPosition: [0.0, 0.58, 0.12],
      explodeOffset: [0, 0.45, 0.15]
    }
  ],
  'mammoth-molar': [
    {
      id: 'mm-1',
      index: '01',
      title: 'Occlusal Enamel Lophs (24 Plates)',
      detail: 'Hard enamel ridges stood in relief above softer dentine and cementum to form a self-sharpening grater.',
      localPosition: [0.0, 0.48, 0.22],
      explodeOffset: [0, 0.45, 0.2]
    },
    {
      id: 'mm-2',
      index: '02',
      title: 'Hypsodont Cementum Matrix',
      detail: 'Deep-crowned architecture resisted silica phytolith abrasion from Pleistocene steppe sedges.',
      localPosition: [0.45, 0.12, 0.28],
      explodeOffset: [0.4, 0, 0.25]
    },
    {
      id: 'mm-3',
      index: '03',
      title: 'Horizontal Conveyor Root Base',
      detail: 'Molars erupted sequentially from the rear of the jaw six times across a mammoth’s life.',
      localPosition: [-0.42, -0.22, 0.25],
      explodeOffset: [-0.35, -0.35, 0.2]
    }
  ],
  'lomekwi-core': [
    {
      id: 'lm-1',
      index: '01',
      title: 'Unifacial Flake Detachment Scars',
      detail: 'Stepped conchoidal fracture surfaces where sharp phonolite flakes were struck 3.3 million years ago.',
      localPosition: [0.35, 0.35, 0.25],
      explodeOffset: [0.4, 0.35, 0.3]
    },
    {
      id: 'lm-2',
      index: '02',
      title: 'Bipolar Anvil Percussion Cortex',
      detail: 'Crushing impact marks show the heavy 3.15 kg block was battered against a stationary stone anvil.',
      localPosition: [-0.42, -0.15, 0.28],
      explodeOffset: [-0.4, -0.2, 0.25]
    },
    {
      id: 'lm-3',
      index: '03',
      title: 'West Turkana Phonolite Matrix',
      detail: 'Fine-grained volcanic cobble selected deliberately from Pliocene stream channels.',
      localPosition: [0.0, -0.45, -0.25],
      explodeOffset: [0, -0.4, -0.25]
    }
  ],
  'acheulean-handaxe': [
    {
      id: 'ac-1',
      index: '01',
      title: 'Convergent Distal Cutting Tip',
      detail: 'Thinned via soft-hammer bone or antler retouch for precision butchery and woodworking.',
      localPosition: [0.0, 0.72, 0.15],
      explodeOffset: [0, 0.48, 0.15]
    },
    {
      id: 'ac-2',
      index: '02',
      title: 'Bilateral Bifacial Symmetry Margin',
      detail: 'Continuous sinuous cutting edge worked on both faces according to a mental geometric template.',
      localPosition: [0.36, 0.08, 0.18],
      explodeOffset: [0.4, 0.05, 0.25]
    },
    {
      id: 'ac-3',
      index: '03',
      title: 'Globular Ergonomic Butt Grip',
      detail: 'Rounded proximal base fit comfortably in the palm of Homo erectus without a haft.',
      localPosition: [-0.25, -0.58, 0.18],
      explodeOffset: [-0.25, -0.45, 0.2]
    }
  ],
  'blombos-ochre': [
    {
      id: 'bl-1',
      index: '01',
      title: 'Cross-Hatched Diamond Engraving',
      detail: 'Incised with a sharp lithic point in two sequential stages to create a bounded geometric motif.',
      localPosition: [0.0, 0.12, 0.22],
      explodeOffset: [0, 0.35, 0.35]
    },
    {
      id: 'bl-2',
      index: '02',
      title: 'Ground Faceted Bevel Surface',
      detail: 'Intentionally abraded flat on coarse quartzite grindstones prior to engraving 75,000 years ago.',
      localPosition: [0.52, 0.25, 0.18],
      explodeOffset: [0.4, 0.25, 0.2]
    },
    {
      id: 'bl-3',
      index: '03',
      title: 'Hematite-Rich Ferruginous Core',
      detail: 'Yielded vibrant red iron-oxide pigment powder used for body ornamentation and symbolic art.',
      localPosition: [-0.48, -0.22, -0.15],
      explodeOffset: [-0.4, -0.25, -0.2]
    }
  ],
  'venus-figurine': [
    {
      id: 'vf-1',
      index: '01',
      title: 'Concentric Braided Headband Rows',
      detail: 'Seven horizontal rows of carved notches representing woven fiber headgear or coiled hair.',
      localPosition: [0.0, 0.65, 0.22],
      explodeOffset: [0, 0.45, 0.2]
    },
    {
      id: 'vf-2',
      index: '02',
      title: 'Volumetric Oolitic Limestone Torso',
      detail: 'Carved from non-local Jurassic oolite transported over 130 km to the Danube Valley.',
      localPosition: [0.35, 0.12, 0.28],
      explodeOffset: [0.38, 0.1, 0.28]
    },
    {
      id: 'vf-3',
      index: '03',
      title: 'Red Ochre Pigment Residue',
      detail: 'Microscopic pockets retain hematite coating applied during Gravettian Ice Age rituals.',
      localPosition: [-0.2, -0.48, 0.22],
      explodeOffset: [-0.25, -0.45, 0.2]
    }
  ],
  'jomon-vessel': [
    {
      id: 'jv-1',
      index: '01',
      title: 'Kaen-Doki Flame Rim Projections',
      detail: 'Four sculptural cockscomb handles ("suikō") modeled from applied clay coils.',
      localPosition: [0.48, 0.55, 0.15],
      explodeOffset: [0.4, 0.45, 0.2]
    },
    {
      id: 'jv-2',
      index: '02',
      title: 'Jōmon Twisted-Cord Impressions',
      detail: 'Plaited plant fibers rolled across wet clay created characteristic textured heat-transfer walls.',
      localPosition: [-0.42, 0.0, 0.32],
      explodeOffset: [-0.38, 0, 0.3]
    },
    {
      id: 'jv-3',
      index: '03',
      title: 'Carbonized Cooking Base',
      detail: 'Lipid residue analysis confirms processing of salmonids, acorns, and wild boar stews.',
      localPosition: [0.0, -0.58, 0.28],
      explodeOffset: [0, -0.45, 0.2]
    }
  ],
  'cuneiform-tablet': [
    {
      id: 'ct-1',
      index: '01',
      title: 'Circular & D-Shaped Sexagesimal Numerals',
      detail: 'Impressed with the round end of a reed stylus to record quantities of malted barley in Uruk.',
      localPosition: [-0.25, 0.42, 0.16],
      explodeOffset: [-0.25, 0.38, 0.3]
    },
    {
      id: 'ct-2',
      index: '02',
      title: 'Wedge-Incised Ideographic Signs',
      detail: 'Triangular stylus impressions representing vessels, grain rations, and temple officials (c. 3100 BCE).',
      localPosition: [0.28, 0.02, 0.16],
      explodeOffset: [0.3, 0, 0.35]
    },
    {
      id: 'ct-3',
      index: '03',
      title: 'Ruled Accounting Case Registers',
      detail: 'Horizontal and vertical dividers organizing hierarchical economic transactions before phonetic script.',
      localPosition: [0.0, -0.45, 0.16],
      explodeOffset: [0, -0.4, 0.25]
    }
  ]
};

/**
 * 3 Guided Robot Docent Tours across the 4.6-Billion-Year Globe & Specimen Archive.
 */
export const GUIDED_TOURS: GuidedTour[] = [
  {
    id: 'tour-apex-predators',
    index: '01',
    title: 'Rise of the Apex Predators',
    subtitle: '508 Ma to 66.8 Ma · From Cambrian Seas to Hell Creek',
    durationLabel: '3 Stops · Paleozoic & Mesozoic',
    stops: [
      {
        ageMa: 508,
        stageId: 'paleozoic',
        entityId: 'anomalocaris-canadensis',
        headline: 'Stop 1: Anomalocaris canadensis (508 Ma)',
        docentCommentary:
          'Welcome to the Cambrian Explosion! With 16,000 compound eye lenses and spiny raptorial arms, Anomalocaris was Earth’s very first meter-long super-predator, triggering an evolutionary arms race of mineralized shells.'
      },
      {
        ageMa: 358,
        stageId: 'paleozoic',
        entityId: 'dunkleosteus-terrelli',
        headline: 'Stop 2: Dunkleosteus terrelli (358 Ma)',
        docentCommentary:
          'Jumping 150 million years forward into the Late Devonian Age of Fishes: vertebrates now possess hinged jaws. Dunkleosteus used self-sharpening dermal bone blades and a four-bar linkage skull to snap open in 20 milliseconds.'
      },
      {
        ageMa: 66.8,
        stageId: 'mesozoic',
        entityId: 'tyrannosaurus-rex-skull',
        headline: 'Stop 3: Tyrannosaurus rex (66.8 Ma)',
        docentCommentary:
          'At the close of the Cretaceous, terrestrial predation peaked with Tyrannosaurus rex. Its fused nasal bones and banana-sized serrated teeth delivered 35,000 newtons of force—just 800,000 years before the Chicxulub asteroid struck.'
      }
    ]
  },
  {
    id: 'tour-water-to-toolmakers',
    index: '02',
    title: 'From Fins to Bipedal Toolmakers',
    subtitle: '375 Ma to 3100 BCE · The Vertebrate & Hominin Odyssey',
    durationLabel: '4 Stops · Paleozoic to Cenozoic',
    stops: [
      {
        ageMa: 375,
        stageId: 'paleozoic',
        entityId: 'tiktaalik-roseae',
        headline: 'Stop 1: Tiktaalik roseae Steps Ashore (375 Ma)',
        docentCommentary:
          'Every human arm and hand traces its blueprint to this Late Devonian lobe-finned "fishapod". Inside Tiktaalik’s pectoral fin lie a single humerus, radius, ulna, and functional wrist bones.'
      },
      {
        ageMa: 3.3,
        stageId: 'cenozoic',
        entityId: 'lomekwi-stone-core',
        headline: 'Stop 2: Lomekwi 3 Stone Cores (3.30 Ma)',
        docentCommentary:
          'Fast-forward to the Pliocene Rift Valley of Kenya. Before the genus Homo even appeared, hominins rotated heavy volcanic cobbles against stone anvils to detach sharp cutting flakes.'
      },
      {
        ageMa: 3.2,
        stageId: 'cenozoic',
        entityId: 'australopithecus-afarensis-lucy',
        headline: 'Stop 3: Australopithecus afarensis "Lucy" (3.20 Ma)',
        docentCommentary:
          'Lucy’s flared pelvis and inward-angled valgus femur prove that habitual upright walking evolved millions of years before large brains—freeing hominin hands to carry tools.'
      },
      {
        ageMa: 0.005,
        stageId: 'cenozoic',
        entityId: 'uruk-proto-cuneiform-tablet',
        headline: 'Stop 4: Uruk Proto-Cuneiform Tablet (3100 BCE)',
        docentCommentary:
          'In the final fraction of a second on the 24-hour planetary clock, Sumerian scribes pressed reed styluses into wet clay—inventing external memory and ending geological prehistory.'
      }
    ]
  },
  {
    id: 'tour-origins-and-extinctions',
    index: '03',
    title: 'Planetary Genesis & The K-Pg Impact',
    subtitle: '4,404 Ma to 66.0 Ma · Crust, Oxygen, and Catastrophe',
    durationLabel: '4 Stops · Hadean to Mesozoic',
    stops: [
      {
        ageMa: 4404,
        stageId: 'hadean-archean',
        entityId: 'jack-hills-zircon',
        headline: 'Stop 1: Jack Hills Detrital Zircon (4,404 Ma)',
        docentCommentary:
          'Our oldest terrestrial time capsule. Oxygen isotopes locked inside this microscopic Western Australian crystal prove liquid water oceans already cooled the crust 160 million years after Earth formed.'
      },
      {
        ageMa: 3480,
        stageId: 'hadean-archean',
        entityId: 'dresser-stromatolite',
        headline: 'Stop 2: Pilbara Conical Stromatolites (3,480 Ma)',
        docentCommentary:
          'In shallow Archean volcanic lagoons, photosynthetic microbial mats trapped sediment into conical reefs—initiating the biological production of oxygen that would transform the planet.'
      },
      {
        ageMa: 558,
        stageId: 'proterozoic',
        entityId: 'dickinsonia-costata',
        headline: 'Stop 3: Dickinsonia & Ediacaran Dawn (558 Ma)',
        docentCommentary:
          'Following the thawing of Cryogenian "Snowball Earth" glaciations, macroscopic soft-bodied animals like Dickinsonia glided across microbial seafloors without shells or jaws.'
      },
      {
        ageMa: 66,
        stageId: 'mesozoic',
        entityId: 'placenticeras-meeki',
        headline: 'Stop 4: The 66.0 Ma Chicxulub Boundary',
        docentCommentary:
          'Click "66 Ma Asteroid Cutscene" on the dock below to witness the 10-kilometer bolide impact on the Yucatán platform that wiped out ammonites and non-avian dinosaurs in hours.'
      }
    ]
  }
];

/**
 * 10 Fact-Verified Multiple-Choice Questions for the Deep Time Mastery Quiz.
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    question: 'What crucial planetary evidence is preserved inside the 4,404 Ma Jack Hills zircon crystal from Western Australia?',
    options: [
      'Elevated δ18O ratios proving liquid surface water existed in the Hadean Eon',
      'Fossilized multicellular eukaryotic nuclei',
      'Iridium fallout from the Chicxulub asteroid impact',
      'Free atmospheric oxygen exceeding 21%'
    ],
    correctIndex: 0,
    explanation:
      'Heavy oxygen isotope (δ18O) ratios in the Jack Hills zircon (W74-2/36) show that its parent magma assimilated rock that had interacted with cool liquid water just 160 million years after Earth’s formation.',
    relatedEntityId: 'jack-hills-zircon',
    ageDisplay: '4,404 Ma'
  },
  {
    id: 'q-2',
    question: 'How did paleobiologists definitively prove in 2018 that the 558 Ma quilted organism Dickinsonia costata was an animal rather than a lichen or protist?',
    options: [
      'By discovering calcified trilobite eyes inside its rib segments',
      'By extracting C27 cholesteroid (cholesterol) biomarker molecules from organically preserved White Sea fossils',
      'By carbon-14 dating its sandstone matrix',
      'By finding gnathal jaw plates attached to its midline'
    ],
    correctIndex: 1,
    explanation:
      'Bobrovskiy et al. (2018) extracted diagnostic C27 cholesteroid biomarkers directly from organically preserved Dickinsonia specimens, placing it firmly within the animal kingdom (Metazoa).',
    relatedEntityId: 'dickinsonia-costata',
    ageDisplay: '558 Ma'
  },
  {
    id: 'q-3',
    question: 'Which Late Devonian "fishapod" discovered on Ellesmere Island (375 Ma) bridges lobe-finned fish and four-limbed tetrapods with functional wrist bones?',
    options: [
      'Anomalocaris canadensis',
      'Dunkleosteus terrelli',
      'Tiktaalik roseae',
      'Paradoxides davidis'
    ],
    correctIndex: 2,
    explanation:
      'Tiktaalik roseae possessed fish gills and scales alongside a mobile neck, flat skull, and weight-bearing humerus, radius, ulna, and carpal wrist joints.',
    relatedEntityId: 'tiktaalik-roseae',
    ageDisplay: '375 Ma'
  },
  {
    id: 'q-4',
    question: 'Which mass extinction was the severest biotic crisis in Earth history, eliminating ~96% of marine species at 252 Ma due to Siberian Traps volcanism?',
    options: [
      'Late Ordovician Mass Extinction (444 Ma)',
      'Permian–Triassic "Great Dying" Extinction (252 Ma)',
      'Cretaceous–Paleogene Chicxulub Impact (66 Ma)',
      'Late Devonian Kellwasser Crisis (372 Ma)'
    ],
    correctIndex: 1,
    explanation:
      'The Permian–Triassic extinction (252 Ma) was triggered by massive flood basalt eruptions in the Siberian Traps, causing extreme global warming, ocean anoxia, and hypercapnia.',
    relatedEntityId: 'paradoxides-davidis',
    ageDisplay: '252 Ma'
  },
  {
    id: 'q-5',
    question: 'What anatomical combination makes the 150 Ma Berlin specimen of Archaeopteryx lithographica an iconic transitional fossil?',
    options: [
      'Asymmetrical flight feathers paired with a toothed jaw, three-clawed wings, and a long bony theropod tail',
      'Whale-like flippers paired with herbivorous grinding molars',
      'Calcite compound eyes paired with a coiled aragonite shell',
      'Self-sharpening dermal bone plates lacking true teeth'
    ],
    correctIndex: 0,
    explanation:
      'Preserved in fine Solnhofen limestone, Archaeopteryx combines avian aerodynamic flight feathers and a furcula with classic non-avian theropod traits.',
    relatedEntityId: 'archaeopteryx-lithographica',
    ageDisplay: '150.0 Ma'
  },
  {
    id: 'q-6',
    question: 'What does the 3.30 Ma Lomekwi 3 stone core assemblage from West Turkana, Kenya demonstrate about hominin technology?',
    options: [
      'Stone tool knapping began 700,000 years before the earliest fossils of the genus Homo',
      'Bronze smelting originated in the Pliocene epoch',
      'Homo sapiens invented stone tools only 40,000 years ago',
      'Bifacial handaxes were used during the Mesozoic Era'
    ],
    correctIndex: 0,
    explanation:
      'Dated to 3.3 million years ago, Lomekwi 3 proves that Pliocene hominins (such as Kenyanthropus or Australopithecus) knapped stone cores well before Homo habilis.',
    relatedEntityId: 'lomekwi-stone-core',
    ageDisplay: '3.30 Ma'
  },
  {
    id: 'q-7',
    question: 'What key evolutionary insight was confirmed by the 3.20 Ma Australopithecus afarensis skeleton ("Lucy", AL 288-1)?',
    options: [
      'Brain enlargement to 1,400 cm³ occurred before upright walking',
      'Habitual upright bipedalism (flared pelvis & valgus knee) evolved millions of years before brain expansion',
      'Early hominins were exclusively aquatic swimmers',
      'Written cuneiform script existed in the Pliocene'
    ],
    correctIndex: 1,
    explanation:
      'While Lucy had a small ape-sized cranial capacity (~385 cm³), her broad pelvis and valgus femur angle prove habitual upright bipedal locomotion at 3.2 Ma.',
    relatedEntityId: 'australopithecus-afarensis-lucy',
    ageDisplay: '3.20 Ma'
  },
  {
    id: 'q-8',
    question: 'Why is the 75,000-year-old Blombos Cave engraved red ochre plaque from South Africa archaeologically significant?',
    options: [
      'It is the earliest known iron sword blade',
      'It preserves an intentionally ground bevel incised with an abstract cross-hatched geometric design by Middle Stone Age Homo sapiens',
      'It contains the DNA of Mammuthus primigenius',
      'It records barley rations in Sumerian script'
    ],
    correctIndex: 1,
    explanation:
      'The Blombos Cave ochre plaque (SAM-AA 8938) demonstrates abstract symbolic behavior in African Homo sapiens tens of thousands of years before European cave art.',
    relatedEntityId: 'blombos-engraved-ochre',
    ageDisplay: '0.075 Ma'
  }
];
