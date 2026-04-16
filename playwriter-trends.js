async function fetchTrendsData(query, browserPage, options = {}) {
  if (!browserPage) {
    throw new Error('Browser page required. Playwriter must be running.');
  }

  const maxRetries = options.retries || 3;
  const waitTime = options.waitTime || 5000;
  const geo = options.geo || '';
  const time = options.time || '';

  const params = new URLSearchParams({ q: query });
  if (geo) params.set('geo', geo);
  if (time) params.set('date', time);
  const trendsUrl = `https://trends.google.com/trends/explore?${params}`;

  await browserPage.goto(trendsUrl, { waitUntil: 'domcontentloaded', timeout: 8000 }).catch(() => null);
  await browserPage.waitForTimeout(waitTime);

  let result = null;
  let attempts = 0;

  while (!result && attempts < maxRetries) {
    result = await browserPage.evaluate(() => {
      const tables = Array.from(document.querySelectorAll('table'));
      if (tables.length === 0) return null;

      const parseTable = (table) => {
        const rows = Array.from(table.querySelectorAll('tr')).slice(1);
        return rows.map(row => {
          const cells = Array.from(row.querySelectorAll('td, th'));
          if (cells.length < 2) return null;
          const label = cells[0].textContent.trim();
          const value = parseInt(cells[1].textContent.trim(), 10);
          return isNaN(value) ? null : { date: label, value };
        }).filter(Boolean);
      };

      const timeSeriesData = parseTable(tables[0]);
      if (timeSeriesData.length === 0) return null;

      const relatedQueries = [];
      const risingTopics = [];

      document.querySelectorAll('[class*="related"]').forEach(section => {
        const items = Array.from(section.querySelectorAll('tr')).slice(1);
        const heading = (section.closest('[class*="widget"]') || section).textContent || '';
        const target = heading.toLowerCase().includes('topic') ? risingTopics : relatedQueries;
        items.forEach(row => {
          const cells = Array.from(row.querySelectorAll('td'));
          if (cells.length >= 2) {
            target.push({
              label: cells[0].textContent.trim(),
              value: cells[1].textContent.trim()
            });
          }
        });
      });

      return { timeSeriesData, relatedQueries, risingTopics };
    });

    if (!result) {
      attempts++;
      if (attempts < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempts), 10000);
        process.stderr.write(`Retry ${attempts}/${maxRetries} in ${delay}ms...\n`);
        await browserPage.waitForTimeout(delay);
      }
    }
  }

  return {
    query,
    url: trendsUrl,
    geo: geo || 'worldwide',
    timestamp: new Date().toISOString(),
    timeSeriesData: result ? result.timeSeriesData : [],
    relatedQueries: result ? result.relatedQueries : [],
    risingTopics: result ? result.risingTopics : [],
    dataPoints: result ? result.timeSeriesData.length : 0,
    success: !!result && result.timeSeriesData.length > 0,
    attemptsRequired: attempts + 1
  };
}

module.exports = { fetchTrendsData };
