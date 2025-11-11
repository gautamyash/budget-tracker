import { createServer } from 'http';
import { parse } from 'url';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

// This will be built by Vercel
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Only in development, dynamically import the server
  if (process.env.NODE_ENV === 'development') {
    const { app } = await import('../budget-tracker-backend/src/server.js');
    return handleRequest(req, res, app);
  }
  
  // In production, require the built server
  const { app } = require('./.next/server/pages/api/_server.js');
  return handleRequest(req, res, app);
}

function handleRequest(req, res, app) {
  const parsedUrl = parse(req.url, true);
  const { pathname, query } = parsedUrl;
  
  // Remove /api prefix
  req.url = pathname.replace(/^\/api/, '') || '/';
  req.query = query;
  
  return new Promise((resolve, reject) => {
    const end = res.end;
    res.end = function () {
      end.apply(this, arguments);
      resolve();
    };
    
    app(req, res).catch(err => {
      console.error('API Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      resolve();
    });
  });
}
