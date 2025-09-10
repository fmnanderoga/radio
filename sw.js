self.addEventListener('install', event => {
    console.log('SW instalado');
    self.skipWaiting();
});

self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request));
});
