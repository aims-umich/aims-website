'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getNews() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('timestamp', { ascending: false })

  if (error) {
    console.error('Error fetching news:', error)
    return []
  }

  return data
}

export async function getNewsItemBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching news item:', error)
    return null
  }

  return data
}

async function generateUniqueSlug(dateString: string, id?: string) {
  const supabase = await createClient()
  
  // Convert date string (e.g., "January 1, 2026") to MM-DD-YYYY
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    const today = new Date()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    const yyyy = today.getFullYear()
    dateString = `${mm}-${dd}-${yyyy}`
  } else {
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    const yyyy = date.getFullYear()
    dateString = `${mm}-${dd}-${yyyy}`
  }

  let slug = dateString
  let count = 1
  let isUnique = false

  while (!isUnique) {
    const checkSlug = count === 1 ? slug : `${slug}_${count}`
    const { data } = await supabase
      .from('news')
      .select('id')
      .eq('slug', checkSlug)
      .maybeSingle()

    if (!data || (id && data.id === id)) {
      slug = checkSlug
      isUnique = true
    } else {
      count++
    }
  }

  return slug
}

export async function upsertNewsItem(item: any) {
  const supabase = await createClient()
  
  // Check if admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: admin } = await supabase
    .from('admins')
    .select('email')
    .eq('email', user.email)
    .single()

  if (!admin) throw new Error('Unauthorized')

  const payload = { ...item };
  
  // Generate slug if it's a new item or if we're forcing a slug refresh
  // For existing items being edited, we typically keep the slug unless it's missing
  if (!payload.id || !payload.slug) {
    payload.slug = await generateUniqueSlug(payload.date, payload.id);
  }

  if (!payload.id) delete payload.id;

  const { data, error } = await supabase
    .from('news')
    .upsert(payload, { onConflict: 'id' })

  if (error) {
    console.error('Error upserting news item:', error)
    throw error
  }

  revalidatePath('/')
  revalidatePath('/news')
  return data
}

import { deleteImage } from './upload'

export async function deleteNewsItem(id: string) {
  const supabase = await createClient()

  // Fetch news data to get image URLs before deletion
  const { data: item } = await supabase
    .from('news')
    .select('image_url, images')
    .eq('id', id)
    .single()
  
  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting news item:', error)
    throw error
  }

  // Delete images from storage if they exist
  if (item) {
    if (item.image_url) await deleteImage(item.image_url)
    if (Array.isArray(item.images)) {
      for (const url of item.images) {
        await deleteImage(url)
      }
    }
  }

  revalidatePath('/')
  revalidatePath('/news')
}
