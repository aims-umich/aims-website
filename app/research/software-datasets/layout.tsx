import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Open-Source Software & Datasets",
  description:
    "Open-source software and benchmark datasets from the AIMS Lab at the University of Michigan, including pyMAISE, NEORL, and multiphysics spatiotemporal datasets for scientific machine learning.",
  path: "/research/software-datasets",
});

export default function SoftwareDatasetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
