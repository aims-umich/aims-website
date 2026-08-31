import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Teaching & Courses",
  description:
    "Courses and teaching by Prof. Majdi Radaideh and the AIMS Lab at the University of Michigan, spanning machine learning, data science, and nuclear engineering.",
  path: "/teaching",
});

export default function TeachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
