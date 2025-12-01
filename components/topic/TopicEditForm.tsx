'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type Topic = {
  id: string
  title: string
  content: string
  category: string
}

export function TopicEditForm({ topic }: { topic: Topic }) {
  const router = useRouter()
  const [title, setTitle] = useState(topic.title)
  const [category, setCategory] = useState(topic.category)
  const [content, setContent] = useState(topic.content)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error('タイトルと本文を入力してください')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase
        .from('topics')
        .update({
          title: title.trim(),
          category,
          content: content.trim(),
        })
        .eq('id', topic.id)

      if (error) throw error

      toast.success('投稿を更新しました')
      router.push(`/topic/${topic.id}`)
      router.refresh()
    } catch (error: any) {
      console.error('更新エラー:', error)
      toast.error(error.message || '更新に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push(`/topic/${topic.id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          タイトル
        </label>
        <Input
          id="title"
          type="text"
          placeholder="タイトルを入力"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-2">
          カテゴリ
        </label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="カテゴリを選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bug_report">Bug Report</SelectItem>
            <SelectItem value="feature_request">Feature Request</SelectItem>
            <SelectItem value="feedback">Feedback</SelectItem>
            <SelectItem value="discussion">Discussion</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          本文
        </label>
        <Textarea
          id="content"
          placeholder="詳細を入力してください"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? '更新中...' : '更新する'}
        </Button>
        <Button type="button" variant="outline" onClick={handleCancel}>
          キャンセル
        </Button>
      </div>
    </form>
  )
}
