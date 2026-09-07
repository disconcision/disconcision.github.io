const assert = require('node:assert/strict');
const destination = require('../app-redirects.js');
for (const [path, target] of [
  ['/furl', 'https://furl.farm/classic/'],
  ['/furl/main/index.html', 'https://furl.farm/classic/'],
  ['/furl/cursor-animation/', 'https://furl.farm/classic/cursor-animation/'],
  ['/nool/main/', 'https://nool.ing/classic/'],
  ['/nool/draggable/', 'https://nool.ing/classic/draggable/'],
  ['/supernool/', 'https://nool.ing/'],
  ['/supernool/codex/canopy-growth/', 'https://nool.ing/codex/canopy-growth/'],
  ['/superfurl/feature/nested/', 'https://furl.farm/feature/nested/'],
  ['/furl-next/live/navigation.html', 'https://furl.farm/navigation.html'],
  ['/furl-next/studies.html', 'https://furl.farm/comb-studies.html'],
]) {
  assert.equal(destination(path, '?mode=body&x=1', '#selection'), target + '?mode=body&x=1#selection');
}
for (const path of ['/', '/other-project/', '/furlish/', '/noolness/']) {
  assert.equal(destination(path), null);
}
console.log('App redirects preserve branches, nested paths, queries and fragments.');
