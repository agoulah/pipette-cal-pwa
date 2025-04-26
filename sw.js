// --- START OF FILE sw.js ---

const CACHE_NAME = "pipette-cal-cache-v3"; // Increment version if you change cached files
const urlsToCache = [
  "/", // The root path, often serves index.html
  "/index.html",
  "/style.css",
  "/src/calibrationEngine.js",
  "/src/charts.js",
  "/src/constants.js",
  "/src/dom.js",
  "/src/main.js",
  "/src/report.js",
  "/src/spinner.js",
  "/src/state.js",
  "/src/storage.js",
  "/src/utils.js",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/icon-maskable-192x192.png",
  "/icons/icon-maskable-512x512.png",
  "/icons/favicon-32x32.png",
  "https://cdn.jsdelivr.net/npm/chart.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js",
];
// --- Install Event ---
// Caches core assets when the Service Worker is first installed.
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Install event");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Caching core assets:", urlsToCache);
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error("[Service Worker] Failed to cache core assets:", error);
      })
  );
  self.skipWaiting(); // Force the waiting service worker to become the active service worker
});

// --- Activate Event ---
// Cleans up old caches when a new Service Worker activates.
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activate event");
  const cacheWhitelist = [CACHE_NAME]; // Only keep the current cache
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              console.log("[Service Worker] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("[Service Worker] Claiming clients");
        return self.clients.claim(); // Take control of open clients/tabs immediately
      })
  );
});

// --- Fetch Event ---
// Intercepts network requests and serves cached assets first (Cache-First strategy).
self.addEventListener("fetch", (event) => {
  // console.log('[Service Worker] Fetching:', event.request.url);

  // Use a cache-first strategy for all requests within the scope
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // console.log('[Service Worker] Returning from Cache:', event.request.url);
        return cachedResponse; // Return the cached version
      }

      // console.log('[Service Worker] Not in cache, fetching from Network:', event.request.url);
      // Not in cache, fetch from network
      return fetch(event.request)
        .then((networkResponse) => {
          // Check if we received a valid response
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            (networkResponse.type !== "basic" &&
              !networkResponse.type === "cors")
          ) {
            // Don't cache opaque responses (like from CDNs without CORS headers sometimes)
            // or error responses unless specifically handled.
            return networkResponse;
          }

          // Clone the response because it's a stream and can only be consumed once.
          const responseToCache = networkResponse.clone();

          // Cache the newly fetched resource.
          caches.open(CACHE_NAME).then((cache) => {
            // console.log('[Service Worker] Caching new resource:', event.request.url);
            // Only cache GET requests
            if (event.request.method === "GET") {
              cache.put(event.request, responseToCache);
            }
          });

          return networkResponse; // Return the network response
        })
        .catch((error) => {
          console.error(
            "[Service Worker] Fetch failed; returning offline fallback or error:",
            error
          );
          return caches.match("/offline.html");
        });
    })
  );
});

// --- END OF FILE sw.js ---
