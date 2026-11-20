import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "News article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Headline", type: "string", validation: (r) => r.required().max(110) }),
    defineField({
      name: "slug",
      title: "Web address",
      description: "Click Generate after typing the headline.",
      type: "slug",
      options: { source: "title", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "date", title: "Date", type: "date", initialValue: () => new Date().toISOString().slice(0, 10), validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Short summary", description: "One or two sentences shown in the list of news and on Google.", type: "text", rows: 3, validation: (r) => r.required().max(300) }),
    defineField({ name: "cover", title: "Main photo (optional)", type: "photo" }),
    defineField({
      name: "body",
      title: "Article",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullets", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
        }),
        defineArrayMember({ type: "photo" }),
      ],
    }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "date", media: "cover" } },
});
