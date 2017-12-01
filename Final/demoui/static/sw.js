importScripts('workbox-sw.prod.v1.3.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/_nuxt/app.3af019d44ad19b240db8.js",
    "revision": "ee774bb394ca88e4b4811e6e0bb50aac"
  },
  {
    "url": "/_nuxt/common.3ffa949d962c14491261.js",
    "revision": "c22ceb26fd0f4cb44843fb1d47a4f0ad"
  },
  {
    "url": "/_nuxt/layouts/default.3a57f9bfb60fb8a80217.js",
    "revision": "3ce40d1e0dbc1d8e1b4e3e8517195ff8"
  },
  {
    "url": "/_nuxt/manifest.d13ca1e18b5448df8d93.js",
    "revision": "0c47defbd6d74d33a94d39fe47b26a3b"
  },
  {
    "url": "/_nuxt/pages/index.6285ded068cdd3f02423.js",
    "revision": "8497e2609aa4021f4b9ae242ef7c83bc"
  },
  {
    "url": "/_nuxt/pages/payment/index.824b6f81a8ad8f5689f7.js",
    "revision": "1b27546baa95aa9ec05472df6ef08889"
  },
  {
    "url": "/_nuxt/pages/payment/paypal.08421643554ef7c430bd.js",
    "revision": "e78578eaac597dd67c42aad09fc73a74"
  },
  {
    "url": "/_nuxt/pages/payment/success.acd975180456ad21975d.js",
    "revision": "929010480d506f009dd7dfceffd484f7"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "demoui_1.0.0",
  "clientsClaim": true,
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('/**', workboxSW.strategies.networkFirst({}), 'GET');
workboxSW.router.registerRoute('/_nuxt/**', workboxSW.strategies.cacheFirst({}), 'GET');
