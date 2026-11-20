import { defineArrayMember, defineField, defineType } from "sanity";

export const video = defineType({
  name: "video",
  title: "Video",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", description: "Shown on the video before it plays, e.g. \"A short walk through the gardens\".", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "file",
      title: "Video file",
      description: "MP4 works best. Keep videos short (under a minute) so they load quickly on phones.",
      type: "file",
      options: { accept: "video/mp4,video/quicktime,video/webm" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "poster", title: "Cover picture (optional)", description: "The still picture shown before the video plays.", type: "image" }),
    defineField({
      name: "portrait",
      title: "Filmed upright (portrait)?",
      description: "Tick if the video was filmed with the phone held upright.",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: { select: { title: "title", media: "poster" } },
});

export const media = defineType({
  name: "media",
  title: "Gallery and videos",
  type: "document",
  fields: [
    defineField({
      name: "featuredVideo",
      title: "Garden video",
      description: "The walk-through video on The Experience and Stress Management pages.",
      type: "video",
    }),
    defineField({
      name: "gallery",
      title: "Photo gallery",
      description: "Extra photos shown in the gallery on The Experience page. Add, remove or drag to reorder.",
      type: "array",
      of: [defineArrayMember({ type: "photo" })],
      options: { layout: "grid" },
    }),
    defineField({
      name: "videos",
      title: "More videos",
      description: "Further videos shown on The Experience page.",
      type: "array",
      of: [defineArrayMember({ type: "video" })],
    }),
  ],
  preview: { prepare: () => ({ title: "Gallery and videos" }) },
});
