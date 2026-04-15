async function fetchTrendsData(query, browserPage, options = {}) {
  if (!browserPage) {
    throw new Error('Browser page required. Playwriter must be running.');
  }

  const maxRetries = options.retries || 3;
  const waitTime = options.waitTime || 5000;
  const queryParam = encodeURIComponent(query);
  const trendsUrl = `https://trends.google.com/trends/explore?q=${queryParam}`;

  await browserPage.goto(trendsUrl, { waitUntil: 'domcontentloaded', timeout: 8000 }).catch(() => null);
  await browserPage.waitForTimeout(waitTime);

  let trendData = null;
  let attempts = 0;

  while (!trendData && attempts < maxRetries) {
    trendData = await browserPage.evaluate(() => {
      const table = document.querySelector('table');
      if (!table) return null;

      const rows = Array.from(table.querySelectorAll('tr'));
      if (rows.length < 2) return null;

      return rows.slice(1).map(row => {
        const cells = Array.from(row.querySelectorAll('td, th'));
        if (cells.length < 2) return null;

        const dateText = cells[0].textContent.trim();
        const valueText = cells[1].textContent.trim();
        const value = parseInt(valueText, 10);

        if (isNaN(value)) return null;

        return { date: dateText, value };
      }).filter(Boolean);
    });

    if (!trendData || trendData.length === 0) {
      attempts++;
      if (attempts < maxRetries) {
        await browserPage.waitForTimeout(1000);
      }
    }
  }

  return {
    query,
    url: trendsUrl,
    timestamp: new Date().toISOString(),
    timeSeriesData: trendData || [],
    dataPoints: trendData ? trendData.length : 0,
    success: !!trendData && trendData.length > 0,
    attemptsRequired: attempts + 1
  };
}

module.exports = { fetchTrendsData };
