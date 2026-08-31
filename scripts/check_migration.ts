import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkMigration() {
  console.log('--- Database Check ---')
  const tables = ['news', 'members', 'research', 'gallery_items', 'map_locations', 'map_connections', 'admins']
  
  for (const table of tables) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(1)

    if (error) {
      console.log(`❌ Table "${table}": ${error.message} (${error.code})`)
      if (error.code === 'PGRST205') {
        console.log(`   HINT: Table "${table}" does not exist in schema "public".`)
      }
    } else {
      console.log(`✅ Table "${table}": ${data?.length || 0} rows found (limit 1)`)
    }
  }

  console.log('\n--- Storage Check ---')
  const { data: files, error: storageError } = await supabase.storage
    .from('media')
    .list('', { limit: 10 })

  if (storageError) {
    console.log(`❌ Bucket "media": ${storageError.message}`)
  } else {
    console.log(`✅ Bucket "media": ${files?.length || 0} files found (top 10: ${files?.map(f => f.name).join(', ')})`)
  }
}

checkMigration()
