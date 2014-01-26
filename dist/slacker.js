/*
 * slacker.js v0.1.0 (2014-01-26)
 * Copyright © 2014 Brandon Satrom
 *
 * Licensed under the MIT License (the "License")
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY , WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
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
}());;(function() {
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
    SCRIPT: 'src',
    OBJECT: 'data',
    EMBED: 'src',
    IFRAME: 'src',
    feImage: 'xlink:href'
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
      var evt = new CustomEvent('lazyloaded');
      window.dispatchEvent(evt);
    });
  }
}());