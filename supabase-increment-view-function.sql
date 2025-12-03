-- トピックの閲覧数を増やす関数
CREATE OR REPLACE FUNCTION increment_view_count(topic_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE topics
  SET view_count = view_count + 1
  WHERE id = topic_id;
END;
$$;
