import { defineField, defineType } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Contact details",
  type: "document",
  fields: [
    defineField({ name: "phoneDisplay", title: "Telephone (as shown)", description: "For example +233 24 276 0157", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "phoneInternational",
      title: "Telephone (for dialling)",
      description: "The same number with no spaces, starting with +233. For example +233242760157",
      type: "string",
      validation: (r) => r.required().regex(/^\+\d{9,15}$/, { name: "international number" }),
    }),
    defineField({ name: "email", title: "Email address", type: "string", validation: (r) => r.required().email() }),
    defineField({ name: "location", title: "Location (as shown)", description: "For example West Trasacco, Accra, Ghana", type: "string", validation: (r) => r.required() }),
    defineField({ name: "availabilityNote", title: "Availability note", description: "Shown on the contact sections and service pages.", type: "text", rows: 3 }),
  ],
  preview: { prepare: () => ({ title: "Contact details" }) },
});
