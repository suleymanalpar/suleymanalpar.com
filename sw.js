/* ============================================
   suleymanalpar.com — Service Worker
   Klinik araçların çevrimdışı çalışması + hız
   ============================================ */

const SURUM = 'sa-v2';
const CEKIRDEK = [
  '/',
  '/index.html',
  '/patients.html',
  '/healthcare.html',
  '/kurslar.html',
  '/blog.html',
  '/skorlar.html',
  '/tani.html',
  '/epikriz.html',
  '/gizlilik.html',
  '/kullanim-sartlari.html',
  '/cerez.html',
  '/yazilar/acil-serviste-triaj.html',
  '/css/style.css',
  '/js/main.js',
  '/js/skorlar.js',
  '/js/tani.js',
  '/js/epikriz.js',
  '/js/makaleler-data.js',
  '/img/portre.jpg',
  '/img/icon-192.png',
  '/img/icon-512.png',
  '/manifest.webmanifest'
];

// Kurulum: çekirdek dosyaları önbelleğe al
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(SURUM).then((c) => c.addAll(CEKIRDEK)).then(() => self.skipWaiting())
  );
});

// Etkinleştirme: eski önbellekleri temizle
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((adlar) => Promise.all(adlar.filter((a) => a !== SURUM).map((a) => caches.delete(a))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // HTML navigasyonları: önce ağ (taze içerik), çevrimdışıysa önbellek
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const kopya = res.clone();
          caches.open(SURUM).then((c) => c.put(req, kopya));
          return res;
        })
        .catch(() =>
          caches.match(req).then((r) => r || caches.match('/index.html'))
        )
    );
    return;
  }

  // Günlük güncellenen literatür verisi: önce ağ
  if (url.pathname.endsWith('/makaleler-data.js')) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const kopya = res.clone();
          caches.open(SURUM).then((c) => c.put(req, kopya));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Diğer varlıklar (css/js/görsel/font): önbellek öncelikli, arka planda tazele
  e.respondWith(
    caches.match(req).then((onbellek) => {
      const ag = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && (url.origin === location.origin || res.type === 'opaque' || res.type === 'cors')) {
            const kopya = res.clone();
            caches.open(SURUM).then((c) => c.put(req, kopya));
          }
          return res;
        })
        .catch(() => onbellek);
      return onbellek || ag;
    })
  );
});
