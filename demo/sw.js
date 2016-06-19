importScripts('/dist/progressive-ui-kitt-sw-helper.js');

self.addEventListener('install', function(event) {
  // ProgressiveKITT.addMessage('Caching complete! Future visits will work offline.', {hideAfter: 2000});
  ProgressiveKITT.addAlert('Caching complete! Future visits will work offline.');
  // ProgressiveKITT.addConfirm('Ready?', 'Yes', undefined, 'No',  undefined);
});
