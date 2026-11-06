//pro práci offline a ukládání do cache
// Zvýšení verze na "v2" zajistí, že si prohlížeč všimne změny a stáhne si nová data. 
// Kdybych tam nechal "v1", mohl by si držet starou verzi v paměti.
const CACHE_NAME = "v2"; 
const cacheAssets = [
  "/",
  "/index.html",
  "/styles.css",
  "/index.js",
  "/manifest.json",
  "/icon128.png",
  "/icon192.png",
  "/TheOneRing01.png",
  "/TheOneRing02.png"
];
  
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Caching files");
        return cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});
  
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Removing old cache", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
  
self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      // Když selže internet, zkusíme najít soubor v paměti
      return caches.match(e.request).then(response => {
        if (response) {
          return response;
        } else if (e.request.mode === 'navigate') {
          // Pokud telefon chce hlavní stránku a v paměti není, dáme mu index.html
          return caches.match("/index.html");
        }
      });
    })
  );
});