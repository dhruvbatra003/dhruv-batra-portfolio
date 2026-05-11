import { supabase } from '@/lib/supabase'
import fallback from '../content.json'
import HomeClient from './components/HomeClient'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let content = fallback
  try {
    const { data } = await supabase.from('site_content').select('data').eq('id', 1).single()
    if (data?.data) content = data.data
  } catch {}
  return <HomeClient content={content} />
}
