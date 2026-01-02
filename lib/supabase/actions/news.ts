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
