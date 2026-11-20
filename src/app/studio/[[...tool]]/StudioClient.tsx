"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isCmsConfigured } from "@/sanity/env";

export default function StudioClient() {
  if (!isCmsConfigured) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1.5rem", maxWidth: 560, margin: "0 auto" }}>
        <h1>Website editor</h1>
        <p>The editor is not connected yet. Please contact Expedyte 360 on 055 931 3198.</p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
