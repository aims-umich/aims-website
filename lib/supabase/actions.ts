'use server'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login() {
  const supabase = await createClient()
  const host = (await headers()).get('host')
  const protocol = host?.includes('localhost') ? 'http' : 'https'
  const siteUrl = process.env.NEXT_PUBLIC_NEXT_PUBLIC_SUPABASE_URL || `${protocol}://${host}`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
    },
  })

  if (error) {
    console.error('Error logging in:', error)
    return redirect('/')
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export async function getAdminStatus() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !user.email) return false

  const { data: admin, error } = await supabase
    .from('admins')
    .select('email')
    .eq('email', user.email)
    .single()

  if (error) {
    console.error('Admin check error:', error)
    return false
  }

  return !!admin
}
