export function initAdDisplay() {
  var googletag = googletag || {};
  googletag.cmd = googletag.cmd || [];
  googletag.cmd.push(function() {
      googletag.defineSlot('/1234567/ad-slot-1', [300, 250], 'ad-slot-1').addService(googletag.pubads());
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
  });
}
