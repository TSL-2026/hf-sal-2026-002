/*
  ============================================================
  FILE: sw.js
  VERSION: 1.0
  DATE: 2026-06-11
  PURPOSE: Service worker — enables offline functionality,
           caches static assets for PWA installation,
           allows the app to work without internet connection
  DEPLOYMENT: GitHub Pages + Cloudflare DNS
  AUTHOR: HF Training Module
  ============================================================
*/

const CACHE_NAME = 'tara-air-hf-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Assets to cache for offline use
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/casestudy.html',
  '/facilitator.html',
  '/facilitator-login.html',
  '/offline.html',
  '/manifest.json',
  '/css/styles.css',
  '/js/app.js',
  '/js/case-data.js',
  '/js/game-engine.js',
  '/js/utils.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network, then offline page
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and chrome-extension requests
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension')) {
    return;
  }
  
  // Skip analytics and external tracking
  if (event.request.url.includes('analytics') || event.request.url.includes('tracking')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if available
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // Otherwise fetch from network
      return fetch(event.request).then((networkResponse) => {
        // Don't cache non-successful responses or external APIs
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        
        // Cache the fetched response for future offline use
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        
        return networkResponse;
      }).catch(() => {
        // If offline and no cache, show offline page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
        return new Response('Offline - Content not available', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
});

// Background sync for offline answers (future enhancement)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-answers') {
    console.log('[Service Worker] Syncing offline answers');
    event.waitUntil(syncAnswers());
  }
});

async function syncAnswers() {
  // Future: sync pending answers to IndexedDB or server
  console.log('[Service Worker] Answer sync placeholder - to be implemented');
} 
