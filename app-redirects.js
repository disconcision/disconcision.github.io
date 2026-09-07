/* Canonical app hosts. The personal site keeps links, not duplicate app builds. */
(function () {
  function destination(pathname, search, hash) {
    const match = pathname.match(/^\/(furl-next|superfurl|supernool|furl|nool)(?:\/(.*))?$/);
    if (!match) return null;
    const app = match[1];
    let tail = (match[2] || '').replace(/(^|\/)index\.html$/, '$1');
    const classic = app === 'furl' || app === 'nool';
    const furl = app === 'furl' || app === 'furl-next' || app === 'superfurl';
    if (classic) tail = tail.replace(/^main(?:\/|$)/, '');
    else tail = tail.replace(furl ? /^furl(?:\/|$)/ : /^main(?:\/|$)/, '');
    if (app === 'furl-next') {
      tail = tail.replace(/^live(?:\/|$)/, '');
      if (tail === 'studies.html') tail = 'comb-studies.html';
    }
    return 'https://' + (furl ? 'furl.farm/' : 'nool.ing/') +
      (classic ? 'classic/' : '') + tail + (search || '') + (hash || '');
  }
  if (typeof module !== 'undefined') module.exports = destination;
  if (typeof window === 'undefined') return;
  const target = destination(location.pathname, location.search, location.hash);
  if (!target) return;
  const link = document.getElementById('destination');
  if (link) { link.href = target; link.textContent = target; }
  location.replace(target);
})();
