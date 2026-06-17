//step two
const cacheName = "site-cache-v2";
const files = [
  "/",
  "index.html",
  "script.js",
  "service-worker.js",
  "style.css"
];
self.addEventListener("install",(event)=>{
  event.waitUntil(
    caches.open(cacheName).then((cache)=>{
      return cache.addAll(files);
    })
  )
});
//step three
self.addEventListener("fetch",(event)=>{
  event.respondWith(
    caches.match(event.request).then((response)=>{
      return response || fetch(event.request);
    })
  )
});