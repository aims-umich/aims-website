import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description:
    "Research at the AIMS Lab, University of Michigan: scientific machine learning for nuclear reactor design, control and digital twins, high-performance scientific computing, and large language models for engineering.",
  path: "/research",
});

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
