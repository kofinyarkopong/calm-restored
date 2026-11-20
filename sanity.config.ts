"use client";

/**
 * The editor for Dr Sedohia, served at /studio.
 * Menu order is kept short and in plain language.
 */
import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes, singletonTypes } from "./src/sanity/schemas";

const fixedTypes = new Set([...singletonTypes, "service"]);

const structure: StructureResolver = (S) =>
  S.list()
    .title("Calm Restored Wellness")
    .items([
      S.listItem().title("News articles").schemaType("post").child(S.documentTypeList("post").title("News articles").defaultOrdering([{ field: "date", direction: "desc" }])),
      S.divider(),
      S.listItem().title("Website photographs").id("photographs").child(S.document().schemaType("photographs").documentId("photographs").title("Website photographs")),
      S.listItem().title("Gallery and videos").id("media").child(S.document().schemaType("media").documentId("media").title("Gallery and videos")),
      S.divider(),
      S.listItem().title("Services").schemaType("service").child(S.documentTypeList("service").title("Services").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.listItem().title("Questions (FAQs)").schemaType("faq").child(S.documentTypeList("faq").title("Questions (FAQs)").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.divider(),
      S.listItem().title("Contact details").id("settings").child(S.document().schemaType("settings").documentId("settings").title("Contact details")),
    ]);

export default defineConfig({
  name: "calm-restored-wellness",
  title: "Calm Restored Wellness",
  basePath: "/studio",
  projectId: projectId || "missing",
  dataset,
  apiVersion,
  schema: {
    types: schemaTypes,
    // No "create new" for one-off pages or the fixed list of services
    templates: (templates) => templates.filter(({ schemaType }) => !fixedTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      fixedTypes.has(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
    newDocumentOptions: (prev) => prev.filter((item) => !fixedTypes.has(item.templateId)),
  },
  plugins: [structureTool({ structure })],
});
