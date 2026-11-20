/**
 * Every photograph position on the website that Dr Sedohia can change in the editor.
 * The key matches src/config/images.ts; the group decides where it appears in the editor.
 */
export const photoGroups = [
  { name: "home", title: "Homepage" },
  { name: "about", title: "About Dr Sedohia" },
  { name: "clinic", title: "Clinic rooms" },
  { name: "grounds", title: "Grounds and gardens" },
  { name: "other", title: "Other pages" },
] as const;

export const photoSlots: { key: string; title: string; where: string; group: (typeof photoGroups)[number]["name"] }[] = [
  { key: "heroPortrait", title: "Main homepage portrait", where: "Large photo at the top of the homepage", group: "home" },
  { key: "welcome", title: "Welcome section", where: "Homepage, beside the welcome text; also the Home Visits page", group: "home" },
  { key: "meetDoctor", title: "Meet Dr Sedohia", where: "Homepage, Meet Dr Sedohia section; also the Addiction and Concierge Care pages", group: "home" },
  { key: "philosophy", title: "Our approach", where: "Homepage, approach section; also the ADHD and Second Opinions pages", group: "home" },
  { key: "ecotherapy", title: "Make room for calm", where: "Homepage, beside the breathing guide; also the Stress Management page", group: "home" },
  { key: "aboutHero", title: "About page portrait", where: "Top of the About page", group: "about" },
  { key: "aboutClinical", title: "Clinical experience", where: "About page, clinical experience section", group: "about" },
  { key: "aboutPortraitFull", title: "Portrait gallery 1", where: "About page, bottom gallery (left)", group: "about" },
  { key: "aboutAcademic", title: "Portrait gallery 2", where: "About page, bottom gallery (middle); also the Advocacy page", group: "about" },
  { key: "aboutProfile", title: "Portrait gallery 3", where: "About page, bottom gallery (right)", group: "about" },
  { key: "clinicSeating", title: "Consultation seating", where: "Homepage band, The Experience page and Concierge Care page", group: "clinic" },
  { key: "clinicWide", title: "Clinic room (wide)", where: "The Experience page", group: "clinic" },
  { key: "clinicOverview", title: "Clinic room (overview)", where: "The Experience page, Concierge Care and Ghana pages", group: "clinic" },
  { key: "clinicCorner", title: "Clinic seating corner", where: "Spare clinic photo", group: "clinic" },
  { key: "aerialGardens", title: "Aerial view of the grounds", where: "Homepage Our setting band and The Experience page", group: "grounds" },
  { key: "premisesReception", title: "Entrance veranda", where: "The Experience page", group: "grounds" },
  { key: "waterfall", title: "Waterfall", where: "Homepage and The Experience page", group: "grounds" },
  { key: "premisesLounge", title: "Balcony view", where: "The Experience page", group: "grounds" },
  { key: "gardenPaths", title: "Garden paths", where: "The Experience page and Stress Management page", group: "grounds" },
  { key: "poolCourtyard", title: "Pool courtyard", where: "The Experience page", group: "grounds" },
  { key: "royalPalms", title: "Royal palms", where: "The Experience page and Stress Management page", group: "grounds" },
  { key: "premisesGarden", title: "Orchard garden", where: "Stress Management page", group: "grounds" },
  { key: "consultation", title: "At the desk", where: "Urgent Care, Second Opinions, Virtual Consultations and Ghana pages", group: "other" },
  { key: "contact", title: "Contact page portrait", where: "Top of the Contact page and contact sections", group: "other" },
  { key: "workplace", title: "Workplace page", where: "Workplace Mental Health page and homepage", group: "other" },
];
