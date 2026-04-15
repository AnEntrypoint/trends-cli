# Google Trends CLI via Playwriter

Automated search interest scraper using playwriter browser automation (MCP-connected).

## Setup

This requires:
1. Playwriter installed and connected via MCP
2. Node.js (for CLI wrapper)
3. A browser with playwriter extension active

## Usage

### Direct Playwriter Script
Use playwriter to query trends directly:

```javascript
// In playwriter console
const { fetchTrendsData } = await import('/path/to/playwriter-trends.js');
const result = await fetchTrendsData('python', page);
console.log(JSON.stringify(result, null, 2));
```

### Via CLI Script
```bash
# JSON output (default)
node trends-cli.js "python" --output json

# CSV output (for spreadsheets)
node trends-cli.js "python" --output csv

# Table format
node trends-cli.js "python" --output table
```

## Query Examples

```bash
node trends-cli.js "artificial intelligence"
node trends-cli.js "machine learning"
node trends-cli.js "web development"
```

## Output Format (JSON)

```json
{
  "query": "python",
  "url": "https://trends.google.com/trends/explore?q=python",
  "timestamp": "2026-04-15T20:52:40.805Z",
  "timeSeriesData": [
    { "date": "Apr 13, 2025", "value": 69 },
    { "date": "Apr 20, 2025", "value": 71 }
  ],
  "dataPoints": 52,
  "success": true,
  "attemptsRequired": 1
}
```

## CSV Output

```
date,interest_index
Apr 13 2025,69
Apr 20 2025,71
...
```

## How It Works

1. Navigates to trends.google.com with the search query
2. Waits for React to render (configurable, default 5s)
3. Extracts time-series data from the chart table
4. Returns structured data in requested format
5. Includes error handling and retry logic

## Module API

```javascript
const { fetchTrendsData } = require('./playwriter-trends.js');

// Call from within playwriter context (page available)
const result = await fetchTrendsData(query, page, {
  retries: 3,      // Number of retries if data not found
  waitTime: 5000   // Milliseconds to wait for render
});
```

## Data Points Returned

- **query**: The search term used
- **url**: Direct link to the trends page
- **timestamp**: When data was fetched
- **timeSeriesData**: Array of {date, value} pairs
  - date: Formatted date string
  - value: Search interest index (0-100)
- **dataPoints**: Total number of data points
- **success**: Whether extraction succeeded
- **attemptsRequired**: How many retries were needed
- **error**: Error message if failed

## Limitations

- trends.google.com data is updated periodically (not real-time)
- Data is relative (0-100 scale, normalized to peak)
- Some queries may return fewer data points
- Requires active browser session via playwriter

## Example: Batch Query

```bash
#!/bin/bash
queries=("python" "javascript" "golang" "rust" "typescript")
for query in "${queries[@]}"; do
  node trends-cli.js "$query" --output json > trends_${query}.json
done
```
