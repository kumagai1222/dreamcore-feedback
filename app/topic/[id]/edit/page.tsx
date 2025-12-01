import { createClient } from '@/lib/supabase-server'
import { TopicEditForm } from '@/components/topic/TopicEditForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { notFound, redirect } from 'next/navigation'

export default async function TopicEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // ユーザー情報を取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  // トピックを取得
  const { data: topic, error } = await supabase
    .from('topics')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !topic) {
    notFound()
  }

  // 投稿者本人でない場合はリダイレクト
  if (topic.user_id !== user.id) {
    redirect(`/topic/${id}`)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>投稿を編集</CardTitle>
        </CardHeader>
        <CardContent>
          <TopicEditForm topic={topic} />
        </CardContent>
      </Card>
    </div>
  )
}
