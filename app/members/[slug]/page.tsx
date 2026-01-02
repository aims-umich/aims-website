import { getMemberBySlug } from "@/lib/supabase/actions/members";
import { notFound } from "next/navigation";
import MemberPageClient from "./MemberPageClient";

interface MemberPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
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