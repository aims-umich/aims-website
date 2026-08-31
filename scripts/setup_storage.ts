import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('Key:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Present' : 'Missing')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupStorage() {
  console.log('Setting up storage...')

  const { data, error } = await supabase.storage.updateBucket('media', {
    public: true,
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    fileSizeLimit: 52428800 // 50MB
  })

  if (error) {
    if (error.message.includes('already exists')) {
      console.log('Bucket "media" already exists.')
    } else {
      console.error('Error creating bucket:', error)
    }
  } else {
    console.log('Bucket "media" created successfully.')
  }
}

setupStorage()
