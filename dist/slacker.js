/*
 * slacker.js v0.1.0 (2013-10-26)
 * Copyright © 2013 Brandon Satrom
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

  var resourcePrioritiesFeatures = {
    lazyload: (function () {
      var s = document.createElement('script');
      return 'lazyload' in s;
    })()
  };
  
  window.slacker.features = resourcePrioritiesFeatures;
}());;(function() {
  window.slacker = window.slacker || {};

  var i, len,
    lazyLoaded = [],
    qs = document.querySelector;

  //Test for the presense of the lazyload attribute.
  //If it's not supported, let's get to work.
  if (!window.slacker.features.lazyload){
    var elements = document.querySelectorAll('[lazyload]');

    for (i = 0, len = elements.length; i < len; i++) {
      var el = elements[i];
      lazyLoaded.push(el.getAttribute('src'));
      el.setAttribute('src','');
    }
  }

}());