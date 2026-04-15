#!/usr/bin/env node
/**
 * Google Trends CLI via Playwriter
 * Usage: node trends-cli.js <query> [options]
 * Example: node trends-cli.js "python" --output json
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function scrapeGoogleTrends(query, options = {}) {
  const output = options.output || 'json'; // json | csv | table
  const queryParam = encodeURIComponent(query);
  const trendsUrl = `https://trends.google.com/trends/explore?q=${queryParam}`;
  const result = {
    query,
    url: trendsUrl,
    timestamp: new Date().toISOString(),
    data: {
      timeSeriesData: [],
      topRegions: [],
      relatedQueries: []
    }
  };
  
  return result;
}
const args = process.argv.slice(2);
if (!args.length) {
  console.error('Usage: trends-cli.js <query> [--output json|csv|table]');
  process.exit(1);
}

const query = args[0];
const outputFormat = args.includes('--output') 
  ? args[args.indexOf('--output') + 1] 
  : 'json';

scrapeGoogleTrends(query, { output: outputFormat })
  .then(result => {
    if (outputFormat === 'json') {
      console.log(JSON.stringify(result, null, 2));
    } else if (outputFormat === 'csv') {
      console.log('date,interest_index');
      result.data.timeSeriesData.forEach(row => {
        console.log(`${row.date},${row.value}`);
      });
    } else {
      console.table(result.data.timeSeriesData);
    }
  })
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
