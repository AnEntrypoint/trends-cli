#!/bin/bash
# Batch query script for Google Trends
# Usage: ./scripts/batch-trends.sh

QUERIES=("python" "javascript" "golang" "rust" "typescript" "machine learning" "artificial intelligence")
OUTPUT_DIR="trends_data"

mkdir -p "$OUTPUT_DIR"

for query in "${QUERIES[@]}"; do
  echo "Fetching trends for: $query"
  node trends-cli.js "$query" --output json > "$OUTPUT_DIR/$query.json"
  sleep 2  # Rate limiting
done

echo "Done. Data saved to $OUTPUT_DIR/"
