(function() {
  window.slacker = window.slacker || {};

  var i, len,
    lazyLoaded = [],
    qsa = document.querySelectorAll;

  //Test for the presence of the lazyload attribute.
  //If it's not supported, let's get to work.
  if (!window.slacker.features.lazyload){
    var elements = qsa('[lazyload]');

    for (i = 0, len = elements.length; i < len; i++) {
      var el = elements[i];
      lazyLoaded.push(el.getAttribute('src'));
      el.setAttribute('src','');
    }

    window.addEventListener('load', function() {
      console.log('foo');
    });
  }

}());