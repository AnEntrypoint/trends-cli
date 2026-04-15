const http = require('http');
const { fetchTrendsData } = require('./playwriter-trends.js');

let cachedPage = null;
const PORT = 3847;

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'POST' && req.url === '/query') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { query } = JSON.parse(body);

        if (!cachedPage) {
          throw new Error('No browser page available. Run this in playwriter context.');
        }

        const result = await fetchTrendsData(query, cachedPage, {
          retries: 3,
          waitTime: 5000
        });

        res.writeHead(200);
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: cachedPage ? 'ready' : 'waiting' }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Trends server listening on http://localhost:${PORT}`);
});

global.trendsServer = { setCachedPage: (page) => { cachedPage = page; } };
module.exports = { server };
