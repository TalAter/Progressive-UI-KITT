importScripts('/dist/progressive-ui-kitt-sw-helper.js');

self.addEventListener('install', function(event) {
  ProgressiveKITT.addMessage('Caching complete! Future visits will work offline.');
});
