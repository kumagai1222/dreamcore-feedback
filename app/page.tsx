import { createClient } from '@/lib/supabase-server'
import { TopicList } from '@/components/topic/TopicList'

export default async function Home() {
  const supabase = await createClient()

  // ユーザー情報を取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 全トピックを取得
  const { data: topics } = await supabase
    .from('topics')
    .select('*, profiles(*)')
    .order('created_at', { ascending: false })

  // ユーザーの投票情報を取得
  let userVotes: string[] = []
  if (user) {
    const { data: votes } = await supabase
      .from('votes')
      .select('topic_id')
      .eq('user_id', user.id)
    userVotes = votes?.map((v) => v.topic_id) || []
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">DreamCore Feedback</h1>
        <p className="text-muted-foreground mt-2">
          DreamCore への機能要望やバグ報告を共有しましょう
        </p>
      </div>

      <TopicList topics={topics || []} userVotes={userVotes} />
    </div>
  )
}
