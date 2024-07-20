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

// Configure Amazon TAM
!function(a9,a,p,s,t,A,m){
  if(a[a9])return;
  function q(c,r){a[a9]._Q.push([c,r])}
  a[a9]={init:function(){q("i",arguments)},fetchBids:function(){q("f",arguments)},_Q:[]};
  A=p.createElement(s);A.async=!0;A.src=t;
  m=p.getElementsByTagName(s)[0];m.parentNode.insertBefore(A,m);
}("apstag",window,document,"script","//c.amazon-adsystem.com/aax2/apstag.js");

// Initialize Amazon TAM
apstag.init({
  pubID: 'YOUR_AMAZON_PUB_ID',
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
