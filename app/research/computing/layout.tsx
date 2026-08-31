import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Scientific Computing & Machine Learning",
  description:
    "AIMS Lab research on high-performance scientific computing, surrogate modeling, and large language models applied to nuclear engineering and multiphysics simulation at the University of Michigan.",
  path: "/research/computing",
});

export default function ComputingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
