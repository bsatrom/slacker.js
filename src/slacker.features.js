(function() {
  window.slacker = window.slacker || {};

  function featureTest(feature) {
    var s = document.createElement('script');
    return feature in s;
  }

  var resourcePrioritiesFeatures = {
    lazyload: (function () {
      featureTest('lazyload');
    })(),
    postpone: (function () {
      featureTest('postpone');
    })()
  };
  
  window.slacker.features = resourcePrioritiesFeatures;
}());