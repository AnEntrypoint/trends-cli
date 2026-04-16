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

**Terminal 1 - Start playwriter relay server:**
```bash
playwriter serve
```

**Terminal 2 - Open browser with playwriter extension active:**
Open Chrome/Brave/Edge with the playwriter extension, navigate to any page.

**Terminal 3 - Run queries:**
```bash
./trends "artificial intelligence"
./trends "python" --geo US
./trends "golang" --time "today 12-m"
./trends "machine learning" --csv
./trends "python,golang,rust"
```

## Options

| Flag | Description | Example |
|------|-------------|---------|
| `--geo <code>` | Region filter | `--geo US`, `--geo DE` |
| `--time <range>` | Time range | `--time "today 12-m"` |
| `--csv` | CSV output instead of JSON | `--csv` |
| `-h, --help` | Show help | |

## Output

```json
{
  "query": "artificial intelligence",
  "success": true,
  "geo": "worldwide",
  "url": "https://trends.google.com/trends/explore?q=...",
  "timestamp": "2026-04-15T...",
  "timeSeriesData": [
    { "date": "Apr 13, 2025", "value": 23 },
    { "date": "Apr 20, 2025", "value": 24 }
  ],
  "relatedQueries": [
    { "label": "chatgpt", "value": "100" }
  ],
  "risingTopics": [
    { "label": "Claude AI", "value": "Breakout" }
  ],
  "dataPoints": 52,
  "attemptsRequired": 1
}
```

## How It Works

1. CLI creates a playwriter session and builds eval script
2. Playwriter navigates to trends.google.com with query parameters
3. Extracts time-series data, related queries, and rising topics from page
4. Returns structured JSON (or CSV with `--csv`)

## Requirements

- Node.js 14+
- @remorses/playwriter CLI installed globally: `npm install -g @remorses/playwriter`
- Chrome/Brave/Edge with playwriter extension installed
- `playwriter serve` running (relay server)
- Browser with playwriter extension active on any page
