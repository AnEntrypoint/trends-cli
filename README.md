# Google Trends CLI

Atomic command-line tool for Google Trends lookups using playwriter.

## Installation

```bash
npm install -g @remorses/playwriter
git clone https://github.com/AnEntrypoint/trends-cli.git
cd trends-cli
chmod +x trends
```

## Usage

**Start playwriter with browser open:**
```bash
playwriter
# Browser window opens with playwriter extension active
```

**In another terminal, run queries:**
```bash
./trends "artificial intelligence"
./trends "python"
./trends "machine learning"
```

## Output

```json
{
  "query": "artificial intelligence",
  "success": true,
  "url": "https://trends.google.com/trends/explore?q=...",
  "timestamp": "2026-04-15T...",
  "timeSeriesData": [
    { "date": "Apr 13, 2025", "value": 23 },
    { "date": "Apr 20, 2025", "value": 24 }
  ],
  "dataPoints": 52,
  "attemptsRequired": 1
}
```

## How It Works

1. CLI spawns temporary script and executes via `playwriter` command
2. Playwriter navigates to trends.google.com
3. Extracts time-series data from chart table
4. Returns JSON with results

## Requirements

- Node.js 14+
- @remorses/playwriter CLI installed globally
- Browser window with playwriter extension active
