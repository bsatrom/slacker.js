(function() {
  window.slacker = window.slacker || {};

  var i, len,
    lazyLoaded = [];

  //Test for the presence of the lazyload attribute.
  //If it's not supported, let's get to work.
  if (!window.slacker.features.lazyload){
    var elements = document.querySelectorAll('[lazyload]');

    for (i = 0, len = elements.length; i < len; i++) {
      var el = elements[i];
      if (el.nodeName === 'LINK') {
        lazyLoaded.push(el.getAttribute('data-href'));
        el.setAttribute('data-href','');
      } else if (el.nodeName === 'IMG') {
        lazyLoaded.push(el.getAttribute('data-src'));
        el.setAttribute('data-src','');
      }
    }
    //Make the array of lazyLoaded elements publicly available
    //for debugging.
    window.slacker.lazyLoaded = lazyLoaded;

    window.addEventListener('load', function() {
      window.console.log('foo');
    });
  }

}());