'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getResearch() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('research')
    .select('*')
    .order('timestamp', { ascending: false })

  if (error) {
    console.error('Error fetching research:', error)
    return []
  }

  return data
}

export async function getResearchByGroup(groupName: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('research')
    .select('*')
    .eq('group_name', groupName)
    .order('timestamp', { ascending: false })

  if (error) {
    console.error('Error fetching research by group:', error)
    return []
  }

  return data
}

export async function getRecentResearch(limit: number = 5) {
  const supabase = await createClient()
  
  // First try to get items marked as recent
  const { data, error } = await supabase
    .from('research')
    .select('*')
    .eq('is_recent', true)
    .order('timestamp', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent research:', error)
    return []
  }

  // If no items are marked as recent, fall back to most recent by timestamp
  if (!data || data.length === 0) {
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('research')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit)
    
    if (fallbackError) {
      console.error('Error fetching fallback research:', fallbackError)
      return []
    }
    return fallbackData || []
  }

  return data
}

export async function upsertResearchItem(item: any) {
  const supabase = await createClient()
  
  // Admin check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !user.email) throw new Error('Unauthorized')

  const { data: admin } = await supabase
    .from('admins')
    .select('email')
    .eq('email', user.email)
    .single()

  if (!admin) throw new Error('Unauthorized')

  const { id, ...itemData } = item;
  const payload = id ? { id, ...itemData } : itemData;

  const { data, error } = await supabase
    .from('research')
    .upsert(payload, { onConflict: 'id' })

  if (error) {
    console.error('Error upserting research item:', error)
    throw error
  }

  revalidatePath('/')
  revalidatePath('/research')
  revalidatePath('/research/reactors')
  revalidatePath('/research/controls')
  revalidatePath('/research/computing')
  return data
}

import { deleteImage } from './upload'

export async function deleteResearchItem(id: string) {
  const supabase = await createClient()

  // Fetch data to get image URL before deletion
  const { data: item } = await supabase
    .from('research')
    .select('image_url')
    .eq('id', id)
    .single()
  
  const { error } = await supabase
    .from('research')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting research item:', error)
    throw error
  }

  // Delete image from storage if it exists
  if (item?.image_url) {
    await deleteImage(item.image_url)
  }

  revalidatePath('/')
  revalidatePath('/research')
}
