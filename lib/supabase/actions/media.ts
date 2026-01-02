"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Gallery Actions
export async function getGalleryItems(homepageOnly: boolean = false) {
  const supabase = await createClient();
  let query = supabase.from("gallery_items").select("*");

  if (homepageOnly) {
    query = query.eq("is_homepage", true);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching gallery items:", error);
    return [];
  }
  return data;
}

export async function upsertGalleryItem(item: any) {
  const supabase = await createClient();

  // Admin check
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: admin } = await supabase
    .from("admins")
    .select("email")
    .eq("email", user.email)
    .single();

  if (!admin) throw new Error("Unauthorized");

  const { id, ...itemData } = item;
  const payload = id ? { id, ...itemData } : itemData;

  const { data, error } = await supabase
    .from("gallery_items")
    .upsert(payload, { onConflict: "id" });

  if (error) {
    console.error("Error upserting gallery item:", error);
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/gallery");
  return data;
}

import { deleteImage } from './upload'

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient();

  // Fetch data to get image URL before deletion
  const { data: item } = await supabase
    .from("gallery_items")
    .select("src")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("gallery_items").delete().eq("id", id);

  if (error) {
    console.error("Error deleting gallery item:", error);
    throw error;
  }

  // Delete image from storage if it exists
  if (item?.src) {
    await deleteImage(item.src);
  }

  revalidatePath("/");
  revalidatePath("/gallery");
}

// Map Actions
export async function getMapConnections() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("map_connections").select(`
      id,
      start:start_location_id(lat, lng, country),
      end:end_location_id(lat, lng, country)
    `);

  if (error) {
    console.error("Error fetching map connections:", error);
    return [];
  }
  return data;
}

export async function addMapConnection(start: any, end: any) {
  const supabase = await createClient();

  // 1. Ensure locations exist
  const { data: startLoc } = await supabase
    .from("map_locations")
    .upsert(start, { onConflict: "country" })
    .select()
    .single();

  const { data: endLoc } = await supabase
    .from("map_locations")
    .upsert(end, { onConflict: "country" })
    .select()
    .single();

  if (!startLoc || !endLoc) throw new Error("Could not create locations");

  // 2. Create connection
  const { data, error } = await supabase.from("map_connections").insert({
    start_location_id: startLoc.id,
    end_location_id: endLoc.id,
  });

  if (error) {
    console.error("Error adding map connection:", error);
    throw error;
  }

  revalidatePath("/");
  return data;
}
