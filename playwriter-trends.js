/**
 * Playwriter Google Trends Scraper
 * Fetches and parses Google Trends data via playwriter browser automation
 * 
 * Note: trends.google.com loads data dynamically. This scraper waits for
 * data to appear in the DOM and extracts from visible chart table.
 */

async function fetchTrendsData(query, browserPage, options = {}) {
  if (!browserPage) {
    throw new Error('Browser page required - must be called with playwriter page instance');
  }
  
  const maxRetries = options.retries || 3;
  const waitTime = options.waitTime || 4000;
  const query_param = encodeURIComponent(query);
  const trendsUrl = `https://trends.google.com/trends/explore?q=${query_param}`;
  
  try {
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
  } catch (error) {
    return {
      query,
      url: trendsUrl,
      timestamp: new Date().toISOString(),
      timeSeriesData: [],
      success: false,
      error: error.message
    };
  }
}
module.exports = { fetchTrendsData };
