-- トピックテーブルに閲覧数カラムを追加
ALTER TABLE topics
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- 既存のレコードに0を設定
UPDATE topics SET view_count = 0 WHERE view_count IS NULL;

-- インデックスを作成（ソート用）
CREATE INDEX IF NOT EXISTS idx_topics_view_count ON topics(view_count DESC);
CREATE INDEX IF NOT EXISTS idx_topics_vote_count ON topics(vote_count DESC);
CREATE INDEX IF NOT EXISTS idx_topics_created_at ON topics(created_at DESC);
