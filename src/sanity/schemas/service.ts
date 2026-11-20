import { defineArrayMember, defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Service name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Web address", description: "Set by the website. Please do not change.", type: "slug", readOnly: true }),
    defineField({ name: "order", title: "Position in the list", description: "1 appears first.", type: "number" }),
    defineField({ name: "summary", title: "One-line summary", description: "Shown on the services overview.", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "intro", title: "Opening paragraph", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "coversHeading", title: "Heading above the list", type: "string" }),
    defineField({ name: "covers", title: "List of points", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "body", title: "Further paragraphs", description: "One box per paragraph.", type: "array", of: [defineArrayMember({ type: "text", rows: 4 })] }),
    defineField({
      name: "note",
      title: "Highlighted note (optional)",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
      ],
    }),
  ],
  orderings: [{ title: "Position", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "summary" } },
});
