'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getMembers() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching members:', error)
    return []
  }

  return data
}

export async function getMemberBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching member:', error)
    return null
  }

  return data
}

export async function upsertMember(member: any) {
  const supabase = await createClient()
  
  // Admin check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: admin } = await supabase
    .from('admins')
    .select('email')
    .eq('email', user.email)
    .single()

  if (!admin) throw new Error('Unauthorized')

  const { id, ...memberData } = member;
  const payload = id ? { id, ...memberData } : memberData;

  const { data, error } = await supabase
    .from('members')
    .upsert(payload, { onConflict: 'id' });

  if (error) {
    console.error('Error upserting member:', error)
    throw error
  }

  revalidatePath('/')
  revalidatePath('/members')
  revalidatePath(`/members/${member.slug}`)
  return data
}

import { deleteImage } from './upload'

export async function deleteMember(id: string) {
  const supabase = await createClient()

  // Fetch member data to get image URLs before deletion
  const { data: member } = await supabase
    .from('members')
    .select('image_url, hero_image_url')
    .eq('id', id)
    .single()
  
  const { error } = await supabase
    .from('members')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting member:', error)
    throw error
  }

  // Delete images from storage if they exist
  if (member) {
    if (member.image_url) await deleteImage(member.image_url)
    if (member.hero_image_url) await deleteImage(member.hero_image_url)
  }

  revalidatePath('/')
  revalidatePath('/members')
}
