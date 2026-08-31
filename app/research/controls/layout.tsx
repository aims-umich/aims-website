import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Control & Digital Twins",
  description:
    "AIMS Lab research on reinforcement learning for control, autonomous operation, and digital twins of nuclear and other complex engineering systems at the University of Michigan.",
  path: "/research/controls",
});

export default function ControlsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
