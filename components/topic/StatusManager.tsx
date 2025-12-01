'use client'

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

type Status = 'unconfirmed' | 'in_progress' | 'completed'

const statusLabels: Record<Status, string> = {
  unconfirmed: '未確認',
  in_progress: '対応中',
  completed: '完了',
}

export function StatusManager({
  topicId,
  currentStatus,
}: {
  topicId: string
  currentStatus: Status | undefined
}) {
  const router = useRouter()
  const [status, setStatus] = useState<Status>(currentStatus || 'unconfirmed')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleStatusChange = async (newStatus: Status) => {
    setLoading(true)

    try {
      const { error } = await supabase
        .from('topics')
        .update({ status: newStatus })
        .eq('id', topicId)

      if (error) throw error

      setStatus(newStatus)
      toast.success(`ステータスを「${statusLabels[newStatus]}」に変更しました`)
      router.refresh()
    } catch (error: any) {
      console.error('ステータス更新エラー:', error)
      toast.error(error.message || 'ステータスの更新に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium">ステータス:</label>
      <Select
        value={status}
        onValueChange={(value) => handleStatusChange(value as Status)}
        disabled={loading}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="unconfirmed">未確認</SelectItem>
          <SelectItem value="in_progress">対応中</SelectItem>
          <SelectItem value="completed">完了</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
