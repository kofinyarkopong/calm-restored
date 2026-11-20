import { defineField, defineType } from "sanity";
import { photoGroups, photoSlots } from "../photo-slots";

/** One field for every photograph position on the site. Empty means "keep the current photo". */
export const photographs = defineType({
  name: "photographs",
  title: "Website photographs",
  type: "document",
  groups: photoGroups.map((g, i) => ({ name: g.name, title: g.title, default: i === 0 })),
  fields: photoSlots.map((slot) =>
    defineField({
      name: slot.key,
      title: slot.title,
      description: `Where it appears: ${slot.where}. Click the photo to replace it, or drag the circle to choose which part stays in view.`,
      type: "photo",
      group: slot.group,
    }),
  ),
  preview: { prepare: () => ({ title: "Website photographs" }) },
});
