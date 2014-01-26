(function() {
  window.slacker = window.slacker || {};

  function featureTest(feature) {
    var s = document.createElement('script');
    return feature in s;
  }

  var resourcePrioritiesFeatures = {
    lazyload: (function () {
      return featureTest('lazyload');
    })(),
    postpone: (function () {
      return featureTest('postpone');
    })()
  };
  
  window.slacker.features = resourcePrioritiesFeatures;
}());