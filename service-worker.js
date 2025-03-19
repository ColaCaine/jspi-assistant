const cacheName = 'my-pwa-cache-v1'; // Name of the cache
const assetsToCache = [ // Files to cache
  '/', // Cache the root
  '/index.html',
  '/style.css', // If you have a CSS file
  '/script.js', // If you have a JavaScript file
  '/images/icon-192x192.png', // Example icon
  '/images/icon-512x512.png' // Example icon
];

// Install event: Caches the assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(assetsToCache);
      })
  );
});

// Fetch event: Serves cached assets or fetches from the network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request); // Fetch from network if not in cache
      })
  );
});
