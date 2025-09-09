const CACHE_NAME = 'fm-nanderoga-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/estilo.css',
    '/codigo.js',
    '/img/logo (2).png',
    '/img/isg logo.png',
    '/manifest.json'
    // Si tenés un archivo de audio base que querés cachear, agregalo aquí
    // '/audio/radio.mp3'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
    console.log('[Service Worker] Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Cacheando archivos...');
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activado');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(name => {
                    if (name !== CACHE_NAME) {
                        console.log('[Service Worker] Limpiando cache antigua:', name);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Interceptar solicitudes
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Servir desde cache
                }
                return fetch(event.request) // Si no está en cache, buscar online
                    .then(resp => {
                        // Cachear nueva respuesta si es GET
                        if (!resp || resp.status !== 200 || resp.type !== 'basic') return resp;
                        const responseToCache = resp.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return resp;
                    });
            })
            .catch(() => {
                // Opcional: devolver un fallback si no hay conexión
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
            })
    );
});
