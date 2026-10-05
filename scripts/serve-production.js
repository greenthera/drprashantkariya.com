import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { gzipSync } from 'node:zlib';
import { pathToFileURL } from 'node:url';

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml', '.pdf': 'application/pdf' };

export function createProductionServer({ documentLatency = 0 } = {}) {
  const root = resolve('build/client');
  return createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      let file = resolve(root, `.${pathname}`);
      if (file !== root && !file.startsWith(root + sep)) {
        response.writeHead(403).end();
        return;
      }
      try {
        if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
      } catch {
        // Prerendered routes can be requested with or without a trailing slash.
        file = resolve(file, 'index.html');
      }
      const extension = extname(file);
      let body = await readFile(file);
      if (extension === '.html' && documentLatency > 0) {
        await new Promise(resolve => setTimeout(resolve, documentLatency));
      }
      const headers = { 'Content-Type': `${types[extension] || 'application/octet-stream'}`, 'Cache-Control': 'max-age=600', Vary: 'Accept-Encoding' };
      if (/\bgzip\b/.test(request.headers['accept-encoding'] || '') && ['.html', '.js', '.css', '.json', '.svg'].includes(extension)) {
        body = gzipSync(body);
        headers['Content-Encoding'] = 'gzip';
      }
      headers['Content-Length'] = String(body.length);
      response.writeHead(200, headers).end(request.method === 'HEAD' ? undefined : body);
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT || 4173);
  createProductionServer().listen(port, '127.0.0.1', () => console.log(`Production build: http://127.0.0.1:${port}`));
}
