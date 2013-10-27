(function() {
  window.slacker = window.slacker || {};

  var resourcePrioritiesFeatures = {
    lazyload: (function () {
      var s = document.createElement('script');
      return 'lazyload' in s;
    })()
  };
  
  window.slacker.features = resourcePrioritiesFeatures;
}());