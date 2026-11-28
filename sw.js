/* ZEST APP service worker – fast start:
   pages & posts: network, but fall back to the saved copy if the network is slow (2.5 s)
   scripts, images, video, fonts: saved copy first (they change name/version when updated) */
const CACHE = 'zest-app-v244';
const CORE = ['/', '/centreinfo/', '/manifest.webmanifest', '/i18n.js?v=40', '/gate.js?v=36', '/notify.js?v=41', '/drawer.js?v=68', '/app.js?v=107', '/prime.js?v=34', '/library.js?v=16', '/medical.js?v=20', '/corner.js?v=17', '/media/logowhite-450.webp', '/icons/icon-192.png', '/icons/icon-512.png'];
const WAIT = 2500;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {}).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const put = (req, res) => { if (res && (res.ok || res.type === 'opaque')) { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)).catch(() => {}); } return res; };
const saved = req => caches.match(req, { ignoreVary: true });

/* network, but answer from the saved copy if the network is slower than WAIT */
function netOrSaved(req, fallback) {
  return new Promise(resolve => {
    let done = false;
    const finish = r => { if (!done && r) { done = true; resolve(r); } };
    const t = setTimeout(() => saved(req).then(finish), WAIT);
    fetch(req, { cache: 'no-cache' })
      .then(res => { clearTimeout(t); put(req, res); finish(res); if (!done) resolve(res); })
      .catch(() => { clearTimeout(t); saved(req).then(r => r || (fallback ? fallback() : undefined)).then(r => { if (!done) { done = true; resolve(r || Response.error()); } }); });
  });
}

/* saved copy first, update in the background */
function savedFirst(req) {
  return saved(req).then(r => {
    const net = fetch(req).then(res => put(req, res)).catch(() => r);
    return r || net;
  });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || req.headers.has('range')) return;
  const url = new URL(req.url);
  const same = url.origin === location.origin;

  // ZEST posts from Supabase
  if (url.hostname.endsWith('supabase.co')) {
    if (url.pathname.includes('/storage/v1/object/public/')) { e.respondWith(savedFirst(req)); return; }
    if (url.pathname.startsWith('/rest/v1/posts')) { e.respondWith(netOrSaved(req)); return; }
    return;
  }
  // Google fonts
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') { e.respondWith(savedFirst(req)); return; }
  if (!same) return;

  if (req.mode === 'navigate') {
    e.respondWith(netOrSaved(req, () => caches.match(url.pathname.startsWith('/centreinfo') ? '/centreinfo/' : url.pathname.startsWith('/zest-admin') ? '/zest-admin-r01pm/' : '/')));
    return;
  }
  if (/\.(mp4|webm)$/i.test(url.pathname)) return; // video: browser handles
  if (url.search.includes('v=') || /^\/(media|icons)\//.test(url.pathname) || /\.(png|jpe?g|webp|svg|woff2?)$/i.test(url.pathname)) {
    e.respondWith(savedFirst(req));
    return;
  }
  e.respondWith(netOrSaved(req));
});

self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'ZEST APP', {
    body: d.body || 'New update from ZEST',
    icon: '/icons/icon-192.png',
    tag: d.tag || 'zest',
    renotify: true,
    data: { url: d.url || '/centreinfo/' }
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || '/centreinfo/', self.location.origin).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if ('focus' in c) { c.navigate(url).catch(() => {}); return c.focus(); } }
    return self.clients.openWindow(url);
  }));
});
