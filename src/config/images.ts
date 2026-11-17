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
 * Entries with `src: null` show an elegant temporary panel until a genuine
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

  /* ------- Awaiting genuine photographs ------- */
  ecotherapy: {
    src: null,
    alt: "Nature-based wellbeing setting",
    width: 1600,
    height: 2000,
    placeholderLabel: "Ecotherapy photograph to follow",
  },
  premisesReception: {
    src: null,
    alt: "Calm Restored reception",
    width: 2000,
    height: 1333,
    placeholderLabel: "Premises photograph to follow",
  },
  premisesLounge: {
    src: null,
    alt: "Calm Restored consultation lounge",
    width: 1600,
    height: 2000,
    placeholderLabel: "Premises photograph to follow",
  },
  premisesGarden: {
    src: null,
    alt: "Calm Restored outdoor space",
    width: 1600,
    height: 2000,
    placeholderLabel: "Outdoor photograph to follow",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
