'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type SortOption =
  | 'vote_count'
  | 'view_count'
  | 'created_at_desc'
  | 'created_at_asc'

interface SortSelectorProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

export function SortSelector({ value, onChange }: SortSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        並び替え:
      </span>
      <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="vote_count">人気順</SelectItem>
          <SelectItem value="view_count">閲覧数順</SelectItem>
          <SelectItem value="created_at_desc">新着順</SelectItem>
          <SelectItem value="created_at_asc">古い順</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
