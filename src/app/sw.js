/* eslint-disable no-restricted-globals */

self.addEventListener('fetch', event => {
    console.log('[ServiceWorker] Fetch', event.request.url);

    event.respondWith(fetch(event.request));
});

/* eslint-enable */
