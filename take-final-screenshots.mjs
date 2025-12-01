import puppeteer from 'puppeteer';

async function takeFinalScreenshots() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // 1. ホームページ（検索バー付き）
  console.log('Taking screenshot of home page with search...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle0', timeout: 10000 });
  await page.screenshot({ path: 'final-home.png', fullPage: true });
  console.log('✓ Saved final-home.png');

  // 2. 検索結果ページ
  console.log('Taking screenshot of search results...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle0', timeout: 10000 });
  // 検索バーに入力
  await page.type('input[type="text"]', 'テスト');
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: 'final-search-results.png', fullPage: true });
  console.log('✓ Saved final-search-results.png');

  // 3. トピック詳細ページ（ステータス表示付き）
  console.log('Taking screenshot of topic detail with status...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle0', timeout: 10000 });

  const topicLinks = await page.$$('a[href^="/topic/"]');
  if (topicLinks.length > 0) {
    const topicHref = await topicLinks[0].evaluate(el => el.getAttribute('href'));
    await page.goto(`http://localhost:3003${topicHref}`, { waitUntil: 'networkidle0', timeout: 10000 });
    await page.screenshot({ path: 'final-topic-detail.png', fullPage: true });
    console.log('✓ Saved final-topic-detail.png');
  }

  await browser.close();
  console.log('All final screenshots taken!');
}

takeFinalScreenshots().catch(console.error);
