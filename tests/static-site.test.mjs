import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = readdirSync(root).filter((name) => name.endsWith('.html')).sort();

function attribute(tag, name) {
  const expression = new RegExp('\\b' + name + '\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\')', 'i');
  const match = tag.match(expression);
  return match ? match[1] ?? match[2] : null;
}

function localTarget(page, url) {
  const clean = url.split(/[?#]/)[0];
  if (!clean || clean === '/') return path.join(root, 'index.html');
  return clean.startsWith('/')
    ? path.resolve(root, '.' + clean)
    : path.resolve(root, path.dirname(page), clean);
}

test('HTML pages are present', () => {
  assert.ok(pages.length > 0, 'Expected at least one HTML page');
});

for (const page of pages) {
  const markup = readFileSync(path.join(root, page), 'utf8');
  const ids = [...markup.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]);
  const idSet = new Set(ids);

  test(page + ': semantic structure', () => {
    assert.match(markup, /<html\b[^>]*\blang=["'][^"']+["']/i);
    assert.equal((markup.match(/<main\b/gi) ?? []).length, 1, 'Expected one main landmark');
    assert.equal((markup.match(/<h1\b/gi) ?? []).length, 1, 'Expected one primary heading');
    assert.equal(idSet.size, ids.length, 'Duplicate HTML IDs');
  });

  test(page + ': links and local assets', () => {
    for (const [tag] of markup.matchAll(/<(?:a|img|script|link)\b[^>]*>/gi)) {
      const isLink = /^<a\b/i.test(tag);
      const isImage = /^<img\b/i.test(tag);
      const ref = attribute(tag, isLink || /^<link\b/i.test(tag) ? 'href' : 'src');

      if (isImage) {
        assert.notEqual(attribute(tag, 'alt'), null, page + ': missing image alt: ' + tag);
      }
      if (isLink) {
        assert.ok(ref, page + ': anchor missing href: ' + tag);
        assert.notEqual(ref, '#', page + ': placeholder link: ' + tag);
        assert.ok(!ref.startsWith('javascript:'), page + ': script URL used as link');
      }
      if (!ref) continue;

      if (ref.startsWith('#')) {
        assert.ok(idSet.has(ref.slice(1)), page + ': missing fragment target ' + ref);
        continue;
      }
      if (/^(?:https?:|mailto:|tel:|data:|blob:|\/\/)/i.test(ref)) continue;
      const target = localTarget(page, ref);
      assert.ok(target.startsWith(root + path.sep) || target === root, 'Path leaves project: ' + ref);
      assert.ok(existsSync(target), page + ': missing local resource ' + ref);
    }

    for (const [, targetId] of markup.matchAll(/\bdata-bs-target\s*=\s*["']#([^"']+)["']/gi)) {
      assert.ok(idSet.has(targetId), page + ': missing controlled element #' + targetId);
    }
  });
}
