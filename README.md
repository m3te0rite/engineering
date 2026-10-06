# Google Sites Proxy

This project provides a Vercel serverless function to embed Google Sites in iframes by stripping X-Frame-Options and other security headers that prevent embedding.

## Vercel Deployment

This project is designed to be deployed on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy - Vercel will automatically detect the serverless function

The proxy will be available at `https://your-project.vercel.app/api/proxy`

## Local Development (Optional)

If you want to run locally with the Express server:

1. Install Node.js: https://nodejs.org/
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
npm start
```
4. Update `index.html` iframe src to `http://localhost:3000`

## How It Works

The serverless function:
- Fetches content from the Google Sites URL
- Strips X-Frame-Options, Content-Security-Policy, and other security headers
- Sets permissive headers to allow iframe embedding
- Returns the proxied content to the iframe

## Customization

To proxy a different Google Sites URL, edit the `TARGET_URL` variable in `api/proxy.js`:
```javascript
const TARGET_URL = 'https://sites.google.com/YOUR_URL';
```
