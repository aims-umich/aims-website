import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Photo Gallery",
  description:
    "Photos from the AIMS Lab at the University of Michigan - lab events, conferences, and day-to-day life in Prof. Majdi Radaideh's research group.",
  path: "/gallery",
});

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
