'use client'

import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'

export function TopicActions({ topicId }: { topicId: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const supabase = createClient()

  const handleDelete = async () => {
    // 確認ダイアログを表示
    if (!confirm('本当にこの投稿を削除しますか？この操作は取り消せません。')) {
      return
    }

    setIsDeleting(true)

    try {
      const { error } = await supabase.from('topics').delete().eq('id', topicId)

      if (error) throw error

      toast.success('投稿を削除しました')
      router.push('/')
      router.refresh()
    } catch (error: any) {
      console.error('削除エラー:', error)
      toast.error(error.message || '削除に失敗しました')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex gap-3">
      <Button variant="outline" asChild>
        <Link href={`/topic/${topicId}/edit`}>編集</Link>
      </Button>
      <Button
        variant="destructive"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? '削除中...' : '削除'}
      </Button>
    </div>
  )
}
