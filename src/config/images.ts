/**
 * CENTRAL IMAGE CONFIGURATION
 * ---------------------------------------------------------------------------
 * Every photograph on the website is defined here.
 *
 * To replace or add a photograph:
 *   1. Put the file in /public/images/... (JPEG, about 2000px on the long edge).
 *   2. Update `src`, `width`, `height` and `alt` below.
 *   3. Adjust `focal` (and `focalMobile`) so the face stays in frame.
 *      Focal values are CSS object-position values, e.g. "50% 25%"
 *      means centred horizontally and a quarter of the way down.
 *
 * An entry with `src: null` shows an elegant temporary panel until a genuine
 * photograph is supplied. Never use stock interiors as "our premises".
 */

export type SiteImage = {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  /** object-position on tablet and desktop */
  focal?: string;
  /** object-position on mobile (falls back to focal) */
  focalMobile?: string;
  /** Shown inside the temporary panel when src is null */
  placeholderLabel?: string;
};

const doctor = (file: string) => `/images/doctor/${file}`;
const prem = (file: string) => `/images/premises/${file}`;

export const images = {
  /* Home: hero portrait */
  heroPortrait: {
    src: doctor("sedohia-blazer-portrait.jpg"),
    alt: "Dr Albert Sedohia, Specialist Psychiatrist, smiling in a checked jacket against a warm amber backdrop",
    width: 1600,
    height: 2000,
    focal: "55% 30%",
    focalMobile: "56% 22%",
  },
  /* Home: Meet Dr Sedohia */
  meetDoctor: {
    src: doctor("sedohia-white-coat-standing.jpg"),
    alt: "Dr Albert Sedohia in a white clinical coat, arms folded, standing in his consulting room",
    width: 1333,
    height: 2000,
    focal: "50% 25%",
  },
  /* Home: personal welcome */
  welcome: {
    src: doctor("sedohia-consulting-room-door.jpg"),
    alt: "Dr Albert Sedohia standing at the entrance to his consulting room",
    width: 1333,
    height: 2000,
    focal: "45% 30%",
  },
  /* Home and Experience: care philosophy */
  philosophy: {
    src: doctor("sedohia-desk-writing.jpg"),
    alt: "Dr Albert Sedohia seated at his desk, writing notes during a consultation",
    width: 1600,
    height: 2000,
    focal: "50% 45%",
  },
  /* Consultation and contact sections */
  consultation: {
    src: doctor("sedohia-desk-landscape.jpg"),
    alt: "Dr Albert Sedohia seated at his desk with a laptop, looking towards the camera",
    width: 2000,
    height: 1333,
    focal: "45% 30%",
  },
  contact: {
    src: doctor("sedohia-seated-white.jpg"),
    alt: "Dr Albert Sedohia seated, dressed in white, with a calm and attentive expression",
    width: 1333,
    height: 2000,
    focal: "50% 25%",
  },

  /* About page */
  aboutHero: {
    src: doctor("sedohia-smock-seated.jpg"),
    alt: "Dr Albert Sedohia wearing a green and white woven smock, seated against a warm backdrop",
    width: 1600,
    height: 2000,
    focal: "50% 20%",
  },
  aboutClinical: {
    src: doctor("sedohia-white-coat-standing.jpg"),
    alt: "Dr Albert Sedohia in his clinical coat",
    width: 1333,
    height: 2000,
    focal: "50% 22%",
  },
  aboutAcademic: {
    src: doctor("sedohia-academic-dress.jpg"),
    alt: "Dr Albert Sedohia in academic dress",
    width: 1600,
    height: 2000,
    focal: "50% 30%",
  },
  aboutPortraitFull: {
    src: doctor("sedohia-blazer-full.jpg"),
    alt: "Full-length portrait of Dr Albert Sedohia in a checked jacket",
    width: 1333,
    height: 2000,
    focal: "50% 20%",
  },
  aboutProfile: {
    src: doctor("sedohia-blazer-profile.jpg"),
    alt: "Dr Albert Sedohia standing side-on, looking over his shoulder",
    width: 1429,
    height: 2000,
    focal: "50% 20%",
  },

  /* Workplace page */
  workplace: {
    src: doctor("sedohia-desk-landscape.jpg"),
    alt: "Dr Albert Sedohia at his desk, ready to advise organisations",
    width: 2000,
    height: 1333,
    focal: "45% 30%",
  },

  /* ------- Grounds and setting (genuine photographs supplied 15 Nov 2026) ------- */
  ecotherapy: {
    src: prem("garden-bench-reading.jpg"),
    alt: "A woman reading on a wooden bench in a sunlit garden among palms and flowering shrubs",
    width: 1080,
    height: 1080,
    focal: "50% 45%",
  },
  premisesGarden: {
    src: prem("garden-orchard.jpg"),
    alt: "A small garden of young papaya trees and tropical plants on a lawn",
    width: 1080,
    height: 719,
    focal: "45% 50%",
  },
  premisesReception: {
    src: prem("entrance-veranda.jpg"),
    alt: "A shaded veranda entrance framed by potted plants and palms",
    width: 1080,
    height: 719,
    focal: "40% 50%",
  },
  premisesLounge: {
    src: prem("balcony-view.jpg"),
    alt: "A curved, cushioned balcony looking out over palm trees and the grounds",
    width: 809,
    height: 1080,
    focal: "50% 60%",
  },
  aerialGardens: {
    src: prem("aerial-gardens.jpg"),
    alt: "Aerial view of the grounds: tall palms surrounding a swimming pool and garden paths",
    width: 1080,
    height: 571,
    focal: "50% 55%",
  },
  gardenPaths: {
    src: prem("garden-paths.jpg"),
    alt: "Stone garden paths winding across a lawn between planted beds",
    width: 960,
    height: 601,
    focal: "45% 50%",
  },
  waterfall: {
    src: prem("waterfall.jpg"),
    alt: "A tiered stone waterfall flowing into a pool, surrounded by tropical foliage",
    width: 1080,
    height: 1080,
    focal: "50% 50%",
  },
  royalPalms: {
    src: prem("royal-palms.jpg"),
    alt: "A row of tall royal palms against a clear sky",
    width: 1080,
    height: 720,
    focal: "50% 40%",
  },
  poolCourtyard: {
    src: prem("pool-courtyard.jpg"),
    alt: "A swimming pool and sun loungers in a courtyard shaded by palms",
    width: 810,
    height: 1080,
    focal: "50% 60%",
  },
  poolOverhead: {
    src: prem("pool-overhead.jpg"),
    alt: "Overhead view of a curved swimming pool with clear blue water",
    width: 960,
    height: 640,
  },
  groundsTrees: {
    src: prem("grounds-trees.jpg"),
    alt: "Mature trees and palms in the grounds, with the pool beyond",
    width: 810,
    height: 1080,
    focal: "50% 50%",
  },
  courtyardPool: {
    src: prem("courtyard-pool.jpg"),
    alt: "The building and garden courtyard seen from above, with the pool in the foreground",
    width: 1080,
    height: 717,
  },

  /* ------- Clinical rooms (genuine photographs supplied 18 Nov 2026) ------- */
  clinicSeating: {
    src: prem("clinic-consultation-seating.jpg"),
    alt: "A private clinical room with two armchairs facing each other across a low table",
    width: 2000,
    height: 1333,
    focal: "45% 60%",
  },
  clinicOverview: {
    src: prem("clinic-room-overview.jpg"),
    alt: "A bright clinical room with armchairs, a monitoring unit, an adjustable bed and a private washroom",
    width: 2000,
    height: 1125,
    focal: "55% 55%",
  },
  clinicWide: {
    src: prem("clinic-room-wide.jpg"),
    alt: "A spacious, light-filled clinical room with seating and an adjustable bed",
    width: 2000,
    height: 1333,
    focal: "50% 55%",
  },
  clinicCorner: {
    src: prem("clinic-room-corner.jpg"),
    alt: "A quiet seating corner in a clinical room, with armchairs beside a window",
    width: 2000,
    height: 1125,
    focal: "60% 55%",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

/** Garden walk-through video (silent). Plays only when the visitor presses play. */
export const gardenVideo = {
  src: "/media/garden-walk.mp4",
  poster: "/media/garden-walk-poster.jpg",
  label: "A short walk through the gardens",
};
