# Google Sites Proxy Server

This project provides a proxy server to embed Google Sites in iframes by stripping X-Frame-Options and other security headers that prevent embedding.

## Setup

1. Install Node.js if you don't have it already: https://nodejs.org/

2. Install dependencies:
```bash
npm install
```

## Running the Server

Start the proxy server:
```bash
npm start
```

The server will run on `http://localhost:3000` and proxy requests to your Google Sites page.

## Usage

1. Start the proxy server with `npm start`
2. Open `index.html` in your browser
3. The iframe will load your Google Sites page through the proxy

## How It Works

The proxy server:
- Fetches content from the Google Sites URL
- Strips X-Frame-Options, Content-Security-Policy, and other security headers
- Sets permissive headers to allow iframe embedding
- Proxies all assets (CSS, JS, images) to ensure the page renders correctly

## Customization

To proxy a different Google Sites URL, edit the `TARGET_URL` variable in `server.js`:
```javascript
const TARGET_URL = 'https://sites.google.com/YOUR_URL';
```

Then update the iframe src in `index.html` to match your proxy server port.
