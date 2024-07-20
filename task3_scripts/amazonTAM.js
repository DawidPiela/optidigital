export function initAmazonTAM() {
  if (typeof apstag === 'undefined') {
      console.error('Amazon TAM not loaded');
      return;
  }

  apstag.init({
      pubID: 'YOUR_AMAZON_PUB_ID', // Replace with your actual Publisher ID
      adServer: 'googletag'
  });

  apstag.fetchBids({
      slots: [{
          slotID: 'ad-slot-1',
          sizes: [[300, 250]]
      }],
      timeout: 2000
  }, function(bids) {
      if (typeof pbjs !== 'undefined') {
          pbjs.que.push(function() {
              pbjs.setTargetingForGPTAsync();
              googletag.pubads().refresh();
          });
      }
  });
}
