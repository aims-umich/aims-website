"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getHomepageRecentResearch() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("recent_research")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching homepage research:", error);
    return null;
  }

  return data;
}

export async function upsertHomepageRecentResearch(item: any) {
  const supabase = await createClient();
  
  // Admin check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !user.email) throw new Error('Unauthorized')

  const { data: admin } = await supabase
    .from('admins')
    .select('email')
    .eq('email', user.email)
    .single()

  if (!admin) throw new Error('Unauthorized')

  const payload: any = {
    title: item.title,
    group_name: item.group_name,
    authors: item.authors,
    journal: item.journal,
    year: item.year?.toString(),
    abstract: item.abstract,
    doi: item.doi,
    image_url: item.image_url,
    pdf_url: item.pdf_url,
  };

  if (item.id) {
    payload.id = item.id;
  }

  const { data, error } = await supabase
    .from("recent_research")
    .upsert(payload, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("Error upserting homepage research:", error);
    throw new Error(error.message);
  }

  revalidatePath("/");
  return data;
}
