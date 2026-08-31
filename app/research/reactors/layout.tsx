import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nuclear Reactor Design & Optimization",
  description:
    "AIMS Lab research on AI-driven nuclear reactor design, core optimization, and safety analysis, combining physics-based simulation with machine learning at the University of Michigan.",
  path: "/research/reactors",
});

export default function ReactorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
