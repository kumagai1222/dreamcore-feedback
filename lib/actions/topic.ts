'use server'

import { createClient } from '@/lib/supabase-server'

export async function incrementViewCount(topicId: string) {
  const supabase = await createClient()

  // view_countをインクリメント
  const { error } = await supabase.rpc('increment_view_count', {
    topic_id: topicId,
  })

  if (error) {
    console.error('Failed to increment view count:', error)
  }
}
