import type { Metadata, Viewport } from "next";
import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";
import StudioClient from "./StudioClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  ...studioMetadata,
  title: { absolute: "Website editor | Calm Restored Wellness" },
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { ...studioViewport, viewportFit: "cover" };

export default function StudioPage() {
  return <StudioClient />;
}
