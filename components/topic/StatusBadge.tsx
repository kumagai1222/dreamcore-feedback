import { Badge } from '@/components/ui/badge'

type Status = 'unconfirmed' | 'in_progress' | 'completed'

const statusConfig: Record<
  Status,
  { label: string; className: string }
> = {
  unconfirmed: {
    label: '未確認',
    className: 'bg-gray-500 hover:bg-gray-600',
  },
  in_progress: {
    label: '対応中',
    className: 'bg-yellow-500 hover:bg-yellow-600',
  },
  completed: {
    label: '完了',
    className: 'bg-green-500 hover:bg-green-600',
  },
}

export function StatusBadge({ status }: { status: Status | undefined }) {
  // statusが未定義の場合はデフォルトで未確認にする
  const currentStatus = status || 'unconfirmed'
  const config = statusConfig[currentStatus]

  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  )
}
