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
    VIDEO: 'src',
    AUDIO: 'src',
    SOURCE: 'src',
    SCRIPT: 'src',
    OBJECT: 'data',
    EMBED: 'src',
    IFRAME: 'src',
    // SVG Elements
    feImage: 'xlink:href',
    use: 'xlink:href',
    svgScript: 'xlink:href',
    tref: 'xlink:href'
  };

  //Test for the presence of the lazyload attribute.
  //If it's not supported, let's get to work.
  if (!window.slacker.features.lazyload){
    var elements = document.querySelectorAll('[lazyload]');

    for (i = 0, len = elements.length; i < len; i++) {
      var el = elements[i];

      var name = getAdjustedNodeName(el.nodeName);
      if (name in elementSource) {
        clearSourceAttribute(el, elementSource[name]);
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

        var name = getAdjustedNodeName(element.el.nodeName);
        element.el.setAttribute(elementSource[name],
          element.source);
      }

      //Processing done, now fire the lazyloaded event
      var evt = new CustomEvent('lazyloaded');
      window.dispatchEvent(evt);
    });
  }

  function getAdjustedNodeName(node) {
    //Deal with the fact that a script element can occur in
    //svg elements with a different source attribute
    var name = node;
    if (name === 'script') {
      name = 'svgScript';
    }

    return name;
  }
}());