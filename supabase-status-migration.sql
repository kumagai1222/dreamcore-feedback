-- ============================================
-- ステータス管理機能の追加
-- ============================================

-- 1. topics テーブルに status カラムを追加
ALTER TABLE topics
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'unconfirmed'
CHECK (status IN ('unconfirmed', 'in_progress', 'completed'));

-- 2. status用のインデックスを作成（パフォーマンス最適化）
CREATE INDEX IF NOT EXISTS idx_topics_status ON topics(status);

-- 3. 既存データのステータスを未確認に設定
UPDATE topics SET status = 'unconfirmed' WHERE status IS NULL;

-- ============================================
-- セットアップ完了
-- ============================================
-- 上記のSQLをSupabase SQL Editorで実行してください
