export function checkConsent(callback) {
  window.__tcfapi('addEventListener', 2, function(tcData, success) {
      if (success && (tcData.eventStatus === 'tcloaded' || tcData.eventStatus === 'useractioncomplete')) {
          callback(tcData);
      } else {
          console.log('User consent not obtained or CMP not loaded');
      }
  });
}

export function waitForCmp(callback) {
  var interval = setInterval(function() {
      if (typeof window.__tcfapi === 'function') {
          clearInterval(interval);
          callback();
      }
  }, 100);
}
