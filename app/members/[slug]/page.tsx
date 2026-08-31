import type { Metadata } from "next";
import { getMemberBySlug } from "@/lib/supabase/actions/members";
import { notFound } from "next/navigation";
import { pageMetadata, toDescription } from "@/lib/seo";
import MemberPageClient from "./MemberPageClient";

interface MemberPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: MemberPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);

  if (!member) {
    return {
      title: "Member Not Found",
      robots: { index: false, follow: true },
    };
  }

  const role: string | undefined = member.role ?? member.status;
  const image: string | undefined =
    member.imageUrl ?? member.image_url ?? member.heroImageUrl ?? member.hero_image_url;
  const bio: string = (member.bio ?? "").toString();
  const description = bio.trim()
    ? toDescription(bio)
    : `${member.name}${role ? `, ${role},` : ""} at the AIMS Lab at the University of Michigan.`;

  return pageMetadata({
    title: `${member.name}${role ? ` - ${role}` : ""}`,
    description,
    path: `/members/${slug}`,
    image: image && image.startsWith("/") ? image : undefined,
  });
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);

  if (!member) {
    notFound();
    return null;
  }

  return <MemberPageClient member={member} />;
}