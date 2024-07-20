export function configurePrebid(adUnits) {
  var pbjs = pbjs || {};
  pbjs.que = pbjs.que || [];
  pbjs.que.push(function() {
      pbjs.setConfig({
          consentManagement: {
              gdpr: {
                  cmpApi: 'iab',
                  timeout: 8000,
                  defaultGdprScope: true,
                  allowAuctionWithoutConsent: false
              }
          }
      });
      pbjs.addAdUnits(adUnits);
      pbjs.requestBids({
          bidsBackHandler: function() {
              pbjs.setTargetingForGPTAsync();
              googletag.pubads().refresh();
          }
      });
  });
}
