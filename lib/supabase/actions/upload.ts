"use server";

import { createClient } from "@/lib/supabase/server";

export async function uploadImage(formData: FormData): Promise<string | null> {
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

  const file = formData.get("file") as File;
  const path = formData.get("path") as string;

  if (!file || !path) {
    throw new Error("File and path are required");
  }

  // Convert File to ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Determine content type
  let contentType = file.type;
  if (!contentType) {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext === "jpg" || ext === "jpeg") {
      contentType = "image/jpeg";
    } else if (ext === "png") {
      contentType = "image/png";
    } else if (ext === "gif") {
      contentType = "image/gif";
    } else if (ext === "webp") {
      contentType = "image/webp";
    } else {
      contentType = "image/jpeg";
    }
  }

  // Upload to storage
  const { data, error } = await supabase.storage
    .from("media")
    .upload(path, buffer, {
      upsert: true,
      contentType: contentType,
    });

  if (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(path);

  return publicUrl;
}

export async function deleteImage(url: string | null | undefined): Promise<void> {
  if (!url || !url.includes(".supabase.co/storage/v1/object/public/media/")) return;

  const supabase = await createClient();

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

  const path = url.split("/media/").pop();
  if (!path) return;

  const { error } = await supabase.storage.from("media").remove([path]);

  if (error) {
    console.error("Error deleting image from storage:", error);
  }
}
