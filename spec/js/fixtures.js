describe('Slacker.js Test Suite', function() {
  window.console.log(document.location.pathname);

  if (document.location.pathname === '/context.html') {
    // Karma is running the test, so change the base
    fixtures.path = 'base/spec/javascripts/fixtures/';
  } else {
    fixtures.path = 'javascripts/fixtures/';
  }
  fixtures.containerId = 'slackerFrame';
  var testDoc = fixtures.read('lazyload.html');

  function postLoadTest(callback) {
    var loadEvt = false;

    fixtures.set(testDoc);

    var slackerFrame = document.querySelector('iframe#slackerFrame');

    slackerFrame.contentWindow.addEventListener('load', function() {
      loadEvt = true;
    }, false);

    if (slackerFrame.contentWindow.slacker) {
      if (slackerFrame.contentWindow.slacker.lazyLoaded) {
        callback(slackerFrame);

        return;
      }
    }

    waitsFor(function() {
      return loadEvt;
    }, 'iframe load event never fired', 2000);

    runs(function() {
      callback(slackerFrame);
    });
  }

  describe('lazyload attribute tests', function() {
    afterEach(function() {
      fixtures.cleanUp();
    });

    it('should test for the lazyload attribute before acting', function() {
      var s = document.createElement('script');
      var lazyloadSupported = 'lazyload' in s;

      postLoadTest(function(frame) {
        expect(lazyloadSupported)
          .toEqual(frame.contentWindow.slacker.features.lazyload);
      });
    });

    it('should detect the lazyload attribute and remove data-href',
    function() {
      postLoadTest(function(frame) {
        var stylesheet =
          frame.contentDocument.querySelectorAll('link[lazyload]');

        expect(stylesheet.length).not.toBe(0);
        expect(stylesheet[0].getAttribute('data-href')).toEqual('');
      });
    });

    it('should hold the resource source in the lazyLoaded array',
    function() {
      postLoadTest(function(frame) {
        expect(frame.contentWindow.slacker.lazyLoaded.length)
          .not.toEqual(0);
      });
    });

    it('should support the script element', function() {
      postLoadTest(function(frame) {
        var script =
          frame.contentDocument.querySelectorAll('script[lazyload]');

        expect(script.length).not.toBe(0);
        expect(script[0].getAttribute('data-src')).toEqual('');
      });
    });

    it('should support the img element', function() {
      postLoadTest(function(frame) {
        var img =
          frame.contentDocument.querySelectorAll('img[lazyload]');

        expect(img.length).not.toBe(0);
        expect(img[0].getAttribute('data-src')).toEqual('');
      });
    });

    it('should support the object element', function() {
      postLoadTest(function(frame) {
        var obj =
          frame.contentDocument.querySelectorAll('object[lazyload]');

        expect(obj.length).not.toBe(0);
        expect(obj[0].getAttribute('data-data')).toEqual('');
      });
    });

    it('should support the embed element', function() {
      postLoadTest(function(frame) {
        var embed =
          frame.contentDocument.querySelectorAll('embed[lazyload]');

        expect(embed.length).not.toBe(0);
        expect(embed[0].getAttribute('data-src')).toEqual('');
      });
    });

    it('should support the iframe element', function() {
      postLoadTest(function(frame) {
        var iframe =
          frame.contentDocument.querySelectorAll('iframe[lazyload]');

        expect(iframe.length).not.toBe(0);
        expect(iframe[0].getAttribute('data-src')).toEqual('');
      });
    });

    it('should support the svg feImage element', function() {
      postLoadTest(function(frame) {
        var i, len,
          count = 0;
        var imgs = frame.contentDocument.getElementsByTagName('feImage');

        for (i=0, len=imgs.length; i < len; i++) {
          if(imgs[i].hasAttribute('lazyload')) {
            count++;
            expect(imgs[i].getAttribute('data-xlink:href')).toEqual('');
          }
        }

        expect(count).not.toBe(0);
      });
    });

    it('should support the svg use element', function() {
      postLoadTest(function(frame) {
        var i, len,
          count = 0;
        var imgs = frame.contentDocument.getElementsByTagName('use');

        for (i=0, len=imgs.length; i < len; i++) {
          if(imgs[i].hasAttribute('lazyload')) {
            count++;
            expect(imgs[i].getAttribute('data-xlink:href')).toEqual('');
          }
        }

        expect(count).not.toBe(0);
      });
    });

    it('should support the svg script element', function() {
      postLoadTest(function(frame) {
        var i, len,
          count = 0;
        var imgs = frame.contentDocument.getElementsByTagName('script');

        for (i=0, len=imgs.length; i < len; i++) {
          var img = imgs[i];

          if(img.parentElement.nodeName === 'svg' &&
            img.hasAttribute('lazyload')) {
            count++;
            expect(imgs[i].getAttribute('data-xlink:href')).toEqual('');
          }
        }

        expect(count).not.toBe(0);
      });
    });

    it('should support the svg tref element', function() {
      postLoadTest(function(frame) {
        var i, len,
          count = 0;
        var trefs = frame.contentDocument.getElementsByTagName('tref');

        for (i=0, len=trefs.length; i < len; i++) {
          if(trefs[i].hasAttribute('lazyload')) {
            count++;
            expect(trefs[i].getAttribute('data-xlink:href')).toEqual('');
          }
        }

        expect(count).not.toBe(0);
      });
    });

    it('should re-apply the lazyload attribute after the document.load event',
    function() {
      postLoadTest(function(frame) {
        var stylesheet =
          frame.contentDocument.querySelectorAll('link[lazyload]');

        expect(stylesheet[0].getAttribute('href')).not.toBe(null);
      });
    });

    it('should fire the lazyloaded event after src replacement is complete',
    function() {
      postLoadTest(function(frame) {
        var win = frame.contentWindow;
        if (win.lazyLoadFired) {
          expect(win.lazyLoadFired).toBe(true);
        } else {
          waitsFor(function() {
            return win.lazyLoadFired;
          }, 'lazyloaded iframe event never fired', 3000);

          runs(function() {
            expect(win.lazyLoadFired).toBe(true);
          });
        }
      });
    });
  });
});