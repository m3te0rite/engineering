const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

const TARGET_URL = 'https://sites.google.com/student.roundrockisd.org/aarav-engineering/home';

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(TARGET_URL, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    // Get the content type from the response
    const contentType = response.headers['content-type'] || 'text/html';
    
    // Convert the buffer to string for HTML processing
    let content = response.data.toString('utf-8');

    // Strip X-Frame-Options and other frame-related security headers
    res.removeHeader('X-Frame-Options');
    res.removeHeader('Content-Security-Policy');
    res.removeHeader('X-Content-Type-Options');
    res.removeHeader('Referrer-Policy');

    // Set permissive headers
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Content-Security-Policy', "frame-ancestors *");
    res.setHeader('Content-Type', contentType);

    // Send the response
    res.send(content);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).send('Proxy error: ' + error.message);
  }
});

// Proxy all other requests (assets, CSS, JS, etc.)
app.get('*', async (req, res) => {
  try {
    const targetUrl = TARGET_URL + req.originalUrl;
    const response = await axios.get(targetUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const contentType = response.headers['content-type'] || 'application/octet-stream';
    
    // Strip security headers
    res.removeHeader('X-Frame-Options');
    res.removeHeader('Content-Security-Policy');
    res.removeHeader('X-Content-Type-Options');
    res.removeHeader('Referrer-Policy');

    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Content-Security-Policy', "frame-ancestors *");
    res.setHeader('Content-Type', contentType);

    res.send(response.data);
  } catch (error) {
    console.error('Proxy error for asset:', error.message);
    res.status(500).send('Proxy error: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Proxying: ${TARGET_URL}`);
});
