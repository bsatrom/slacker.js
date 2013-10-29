(function() {
  window.slacker = window.slacker || {};

  var i, len,
    lazyLoaded = [];

  function clearSourceAttribute(el, attr) {
    lazyLoaded.push({
      el: el,
      source: el.getAttribute('data-' + attr)
    });
    el.setAttribute('data-' + attr,'');
  }

  var elementSource = {
    LINK: 'href',
    IMG: 'src',
    SCRIPT: 'src'
  };

  //Test for the presence of the lazyload attribute.
  //If it's not supported, let's get to work.
  if (!window.slacker.features.lazyload){
    var elements = document.querySelectorAll('[lazyload]');

    for (i = 0, len = elements.length; i < len; i++) {
      var el = elements[i];

      if (el.nodeName in elementSource) {
        clearSourceAttribute(el, elementSource[el.nodeName]);
      }
    }
    //Make the array of lazyLoaded elements publicly available
    //for debugging.
    window.slacker.lazyLoaded = lazyLoaded;

    //When the page has finished loading, loop through
    //the collection of lazyloaded elements and set their
    //attributes accordingly.
    window.addEventListener('load', function() {
      for (i = 0, len = lazyLoaded.length; i < len; i++) {
        var element = lazyLoaded[i];

        element.el.setAttribute(elementSource[element.el.nodeName],
          element.source);
      }

      //Processing done, now fire the +lazyloaded+ event
      window.dispatchEvent(new Event('lazyloaded'));
    });
  }
}());