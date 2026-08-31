import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "News & Announcements",
  description:
    "Latest news, awards, publications, and announcements from the AIMS Lab at the University of Michigan, led by Prof. Majdi Radaideh.",
  path: "/news",
});

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
