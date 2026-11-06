import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const filepath = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!filepath.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    const body = await readFile(filepath);
    res.writeHead(200, { 'Content-Type': mime[path.extname(filepath)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = 'http://127.0.0.1:' + server.address().port;
const browser = await chromium.launch({ headless: true });
const errors = [];
const open = async width => {
  const page = await browser.newPage({ viewport: { width, height: 860 }, reducedMotion: 'reduce' });
  page.on('pageerror', error => errors.push(error.message));
  return page;
};
const widthCheck = async page => {
  const dims = await page.evaluate(() => ({
    doc: document.documentElement.scrollWidth,
    window: window.innerWidth
  }));
  assert.ok(dims.doc <= dims.window + 1, 'Horizontal overflow: ' + JSON.stringify(dims));
};
try {
  for (const width of [375, 1440]) {
    const page = await open(width);
    await page.goto(base + '/', { waitUntil: 'load' });
    await widthCheck(page);
    assert.equal(await page.locator('h1').count(), 1);
    await page.locator('#openLetter').click();
    assert.equal(await page.locator('#note').isVisible(), true);
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'closeLetter');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#note').isVisible(), false);
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'openLetter');
    await page.close();
  }

  assert.deepEqual(errors, [], 'Unexpected JavaScript errors during browser checks');
  console.log('Browser smoke checks passed.');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
