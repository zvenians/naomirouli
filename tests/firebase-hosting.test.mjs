import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const firebase = JSON.parse(readFileSync(new URL('../firebase.json', import.meta.url), 'utf8'));
const project = JSON.parse(readFileSync(new URL('../.firebaserc', import.meta.url), 'utf8'));

test('deploys only the intended Firebase Hosting site', () => {
  assert.equal(project.projects.default, 'gmahk-galilea-archive');
  assert.equal(firebase.hosting.site, 'naomirouli');
  assert.equal(firebase.hosting.public, '.');
});

test('excludes repository-only content from static Hosting upload', () => {
  for (const pattern of ['firebase.json', '**/.*', '**/node_modules/**', 'README.md', 'tests/**']) {
    assert.ok(firebase.hosting.ignore.includes(pattern), `Missing Hosting exclusion: ${pattern}`);
  }
});
