import { defineField, defineType } from "sanity";

/** A photograph with the text that describes it. */
export const photo = defineType({
  name: "photo",
  title: "Photograph",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Describe the photo",
      description: "A short description for people using screen readers and for Google, e.g. \"Dr Sedohia at his desk\".",
      type: "string",
      validation: (r) => r.required().warning("Please add a short description."),
    }),
    defineField({
      name: "caption",
      title: "Caption (optional)",
      description: "Shown under the photo in galleries.",
      type: "string",
    }),
  ],
});
