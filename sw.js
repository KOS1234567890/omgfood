const staticCacheName = "version-1"
const urlsToCache = [
    '/',
    "/omgfood/index.html",
    '/omgfood/static/js/bundle.js',
    '/omgfood/manifest.json'
]

const dynamicCache = "dynamicCache";

console.log(`dynamicCache`);

const limitCacheSize = (name, size)=>{
    caches.open(name).then(cache=>{
        cache.keys().then(keys=>{
            if(keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name,size))
            }
        })
    })
}

this.addEventListener('install', (event)=>{

    console.log(`install`);
    //기다리는 메소드 이벤트가 처리되는동안 다른것들이 처리 할수 없지만 ...
    event.waitUntil(
        caches.open(staticCacheName).then((cache)=>{
            console.log('Opend Cache')
            return cache.addAll(urlsToCache);
        })
    )
})

this.addEventListener('fetch', event => {
    console.log(`fetch`);
    event.respondWith(
        caches.match(event.request).then(cacheRes=>{
            return cacheRes || fetch(event.request).then(fetchRes=>{
                return caches.open(dynamicCache).then(cache => {
                    cache.put(event.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCache,200);
                    return fetchRes;
                })
            })
        }).catch(()=>{
            if(event.request.url.indexOf('.html') > -1){
                return caches.match('/fallback.html')    
            }            
        })
    )
})

this.addEventListener('activate', event=>{
    console.log('activate');
    //
    event.waitUntil(                                        
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key=> key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})