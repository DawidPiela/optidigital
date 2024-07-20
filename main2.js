// CMP Logic
document.getElementById('cmp-accept').addEventListener('click', function() {
  setConsent(true);
});
document.getElementById('cmp-decline').addEventListener('click', function() {
  setConsent(false);
});

function setConsent(consent) {
  localStorage.setItem('userConsent', consent);
  document.getElementById('cmp-banner').style.display = 'none';
  if (consent) {
      initAds();
  }
}

function checkConsent() {
  const userConsent = localStorage.getItem('userConsent');
  if (userConsent === null) {
      document.getElementById('cmp-banner').style.display = 'block';
  } else if (userConsent === 'true') {
      initAds();
  }
}

// Function to initialize ads
function initAds() {
  var adUnits = [{
      code: 'ad-slot-1',
      mediaTypes: {
          banner: {
              sizes: [[300, 250]]
          }
      },
      bids: [
          {
              bidder: 'appnexus',
              params: {
                  placementId: '10433394'
              }
          }
      ]
  }];

  // Initialize Prebid.js
  var pbjs = pbjs || {};
  pbjs.que = pbjs.que || [];
  pbjs.que.push(function() {
      pbjs.addAdUnits(adUnits);
      pbjs.requestBids({
          bidsBackHandler: function() {
              pbjs.setTargetingForGPTAsync();
              googletag.pubads().refresh();
          }
      });
  });

  // Initialize GPT
  var googletag = googletag || {};
  googletag.cmd = googletag.cmd || [];
  googletag.cmd.push(function() {
      googletag.defineSlot('/1234567/ad-slot-1', [300, 250], 'ad-slot-1').addService(googletag.pubads());
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
  });

  // Initialize Amazon TAM
  apstag.init({
      pubID: 'YOUR_AMAZON_PUB_ID', // Replace with your actual Publisher ID
      adServer: 'googletag'
  });

  // Request bids from Amazon TAM
  apstag.fetchBids({
      slots: [{
          slotID: 'ad-slot-1',
          sizes: [[300, 250]]
      }],
      timeout: 2000
  }, function(bids) {
      pbjs.que.push(function() {
          pbjs.setTargetingForGPTAsync();
          googletag.pubads().refresh();
      });
  });
}

// Check consent status on page load
checkConsent();
