import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Lab Culture & Core Values",
  description:
    "The core values of the AIMS Lab at the University of Michigan - Welcome, Support, Compete, Respect, and Listen - and what it is like to join Prof. Majdi Radaideh's research group.",
  path: "/culture",
});

export default function CultureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
