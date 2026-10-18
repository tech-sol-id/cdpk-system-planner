/**
 * CDPK System Planner - Progressive Web App Service Worker
 * Version: v8.6.0-pwa
 * Strategy: 
 *  - Stale-While-Revalidate for app static assets (JS, CSS, Leaflet, fonts, icons)
 *  - Network-First for HTML navigation
 *  - Network-Only for /api/*, /health, and Google Auth (Zero stale project data)
 */

const CACHE_NAME = 'cdpk-pwa-v8.6.3';

const STATIC_PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/maskable-icon-512.png',
  '/apple-touch-icon.png',
  '/favicon.png',
  '/favicon.ico',
  '/js/logo_b64.js?v=8.6.3',
  '/js/i18n.js?v=8.6.3',
  '/js/engines.js?v=8.6.3',
  '/js/exporters.js?v=8.6.3',
  '/js/gis_engine.js?v=8.6.3',
  '/js/das_engine.js?v=8.6.3',
  '/js/cctv_engine.js?v=8.6.3',
  '/js/floorplan_engine.js?v=8.6.3',
  '/js/app_core.js?v=8.6.3'
];

// Install: Cache critical app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_PRECACHE).catch((err) => {
        console.warn('[PWA SW] Pre-cache partial warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[PWA SW] Purging old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Route-aware smart caching
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 1. NEVER cache /api/, /health, or Google Auth requests
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname === '/health' ||
    url.hostname.includes('google') ||
    url.hostname.includes('googleapis')
  ) {
    event.respondWith(
      fetch(req).catch(() => {
        return new Response(
          JSON.stringify({
            status: 'offline',
            message: 'Mode offline: Operasi cloud tidak dapat dihubungi saat tidak ada koneksi internet.'
          }),
          {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      })
    );
    return;
  }

  // 2. Navigation & local /js/ requests: Network-first, fallback to cache
  if (req.mode === 'navigate' || url.pathname === '/' || url.pathname === '/index.html' || url.pathname.startsWith('/js/')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return res;
        })
        .catch(() => {
          return caches.match(req) || caches.match('/index.html') || caches.match('/');
        })
    );
    return;
  }

  // 3. Static Assets (CSS, JS, Fonts, Images, Leaflet, CDNs): Stale-While-Revalidate
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200 && networkRes.type !== 'opaque') {
            const clone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return networkRes;
        })
        .catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
