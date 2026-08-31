import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "People & Team",
  description:
    "Meet the members of the AIMS Lab at the University of Michigan - Prof. Majdi Radaideh, postdoctoral scholars, graduate students, and undergraduate researchers in AI and multiphysics simulation.",
  path: "/members",
});

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
