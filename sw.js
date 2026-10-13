// نبض آسان — آف لائن سپورٹ۔ فائلیں بدلیں تو V کا نمبر بڑھا دیں۔
const V='nabz-aasan-v1';
const CORE=['./','index.html','manifest.webmanifest','jnn.woff','icon-192.png','icon-512.png','apple-touch-icon.png'];
const CDN=['https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(V);await c.addAll(CORE);await Promise.allSettled(CDN.map(u=>c.add(new Request(u,{mode:'cors'}))));await self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==V)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
 const u=new URL(q.url),fixed=u.origin!==location.origin||/\.(woff|png)$/.test(u.pathname),opt={ignoreSearch:true,ignoreVary:true};
 const save=r=>{if(r&&(r.ok||r.type==='opaque')){const k=r.clone();caches.open(V).then(c=>c.put(q,k)).catch(()=>{})}return r};
 if(fixed){e.respondWith(caches.match(q,opt).then(h=>h||fetch(q).then(save)).catch(()=>new Response('',{status:504})));return}
 const net=fetch(q).then(save).catch(()=>null);e.waitUntil(net);
 e.respondWith(caches.match(q,opt).then(h=>h||net).then(r=>r||new Response('آف لائن ہیں اور یہ صفحہ ابھی محفوظ نہیں ہوا۔',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})))});
