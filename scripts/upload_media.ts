import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function uploadFile(filePath: string) {
  const relativePath = filePath.replace(/^public\//, '')
  const fileContent = fs.readFileSync(filePath)
  
  let ext = path.extname(filePath).slice(1).toLowerCase()
  if (ext === 'jpg') ext = 'jpeg'
  
  const { data, error } = await supabase.storage
    .from('media')
    .upload(relativePath, fileContent, {
      upsert: true,
      contentType: 'image/' + ext
    })

  if (error) {
    console.error(`Error uploading ${filePath}:`, error.message)
    return null
  }

  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(relativePath)

  return publicUrl
}

async function migrateImages() {
  console.log('Starting image migration...')

  // 1. Members
  console.log('Migrating Member images...')
  const { data: members } = await supabase.from('members').select('*')
  if (members) {
    for (const member of members) {
      let updates: any = {}
      if (member.image_url && member.image_url.startsWith('/')) {
        const localPath = path.join('public', member.image_url)
        if (fs.existsSync(localPath)) {
          const url = await uploadFile(localPath)
          if (url) updates.image_url = url
        }
      }
      if (member.hero_image_url && member.hero_image_url.startsWith('/')) {
        const localPath = path.join('public', member.hero_image_url)
        if (fs.existsSync(localPath)) {
          const url = await uploadFile(localPath)
          if (url) updates.hero_image_url = url
        }
      }
      if (Object.keys(updates).length > 0) {
        await supabase.from('members').update(updates).eq('id', member.id)
      }
    }
  }

  // 2. Research
  console.log('Migrating Research images...')
  const { data: research } = await supabase.from('research').select('*')
  if (research) {
    for (const item of research) {
      if (item.image_url && item.image_url.startsWith('/')) {
        const localPath = path.join('public', item.image_url)
        if (fs.existsSync(localPath)) {
          const url = await uploadFile(localPath)
          if (url) {
            await supabase.from('research').update({ image_url: url }).eq('id', item.id)
          }
        }
      }
    }
  }

  // 3. News
  console.log('Migrating News images...')
  const { data: news } = await supabase.from('news').select('*')
  if (news) {
    for (const item of news) {
      if (item.image_url && item.image_url.startsWith('/')) {
        const localPath = path.join('public', item.image_url)
        if (fs.existsSync(localPath)) {
          const url = await uploadFile(localPath)
          if (url) {
            await supabase.from('news').update({ image_url: url }).eq('id', item.id)
          }
        }
      }
    }
  }

  // 4. Gallery
  console.log('Migrating Gallery images...')
  const { data: gallery } = await supabase.from('gallery_items').select('*')
  if (gallery) {
    for (const item of gallery) {
      if (item.src && item.src.startsWith('/')) {
        const localPath = path.join('public', item.src)
        if (fs.existsSync(localPath)) {
          const url = await uploadFile(localPath)
          if (url) {
            await supabase.from('gallery_items').update({ src: url }).eq('id', item.id)
          }
        }
      }
    }
  }

  console.log('Migration complete!')
}

migrateImages()
