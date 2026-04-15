#!/usr/bin/env node
const http = require('http');

const args = process.argv.slice(2);
if (!args.length) {
  console.error('Usage: trends-cli <query> [--output json|csv]');
  console.error('');
  console.error('Requirements:');
  console.error('1. Start trends-server.js in another terminal: node trends-server.js');
  console.error('2. Open trends.google.com in browser with playwriter active');
  console.error('3. Run: node trends-cli.js "your query"');
  process.exit(1);
}

const query = args[0];
const outputFormat = args.includes('--output') ? args[args.indexOf('--output') + 1] : 'json';

const data = JSON.stringify({ query });
const options = {
  hostname: 'localhost',
  port: 3847,
  path: '/query',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let responseData = '';
  res.on('data', chunk => responseData += chunk);
  res.on('end', () => {
    try {
      const result = JSON.parse(responseData);

      if (res.statusCode !== 200) {
        console.error('Error:', result.error);
        process.exit(1);
      }

      if (outputFormat === 'csv') {
        console.log('date,interest_index');
        if (result.timeSeriesData) {
          result.timeSeriesData.forEach(row => {
            console.log(`${row.date},${row.value}`);
          });
        }
      } else {
        console.log(JSON.stringify(result, null, 2));
      }
    } catch (e) {
      console.error('Error parsing response:', e.message);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error('Connection error - is trends-server.js running?');
  console.error('Start it with: node trends-server.js');
  process.exit(1);
});

req.write(data);
req.end();
