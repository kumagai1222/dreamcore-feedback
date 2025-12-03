'use client'

import { useEffect } from 'react'
import { incrementViewCount } from '@/lib/actions/topic'

export function ViewCounter({ topicId }: { topicId: string }) {
  useEffect(() => {
    // ページ表示時に閲覧数をインクリメント
    incrementViewCount(topicId)
  }, [topicId])

  return null // UIは表示しない
}
