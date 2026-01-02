"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProjectsByGroup(group: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("group_name", group)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data || [];
}

export async function upsertProject(project: any) {
  const supabase = await createClient();
  
  // Extract id from project and remove it from payload if it's empty to allow Supabase to generate one
  const { id, ...projectData } = project;
  const payload = id ? { id, ...projectData } : projectData;

  const { data, error } = await supabase
    .from("projects")
    .upsert(payload, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("Error upserting project:", error);
    throw new Error(error.message);
  }

  revalidatePath("/research/[category]", "page");
  return data;
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    throw new Error(error.message);
  }

  revalidatePath("/research/[category]", "page");
  return true;
}
