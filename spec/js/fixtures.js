describe('Slacker.js Test Suite', function() {
  var path = '/';

  if (document.location.pathname === '/context.html') {
    // Karma is running the test, so change the base
    path = 'base/spec/javascripts/fixtures/';
  } else if (document.location.pathname.indexOf('runner.html') > 0) {
    // We're running jasmine in the browser
    path = 'javascripts/fixtures/';
  }

  function loadFrame(test) {
    var slackerFrame = document.querySelector('iframe#slackerFrame'),
      loaded = false;
    slackerFrame.src = path + 'lazyload.html?var=?' + Date.now();

    slackerFrame.addEventListener('load', function() {
      loaded = true;
    });

    waitsFor(function() {
      return loaded;
    }, 'iframe load event never fired', 2000);

    runs(function() {
      if (test && typeof test === 'function') {
        test(slackerFrame);
      }

      slackerFrame.src = '';
    });
  }

  describe('lazyload attribute tests', function() {
    it('should test for the lazyload attribute before acting', function() {
      var s = document.createElement('script');
      var lazyloadSupported = 'lazyload' in s;

      loadFrame(function(frame) {
        expect(lazyloadSupported)
          .toEqual(frame.contentWindow.slacker.features.lazyload);
      });
    });

    it('should detect the lazyload attribute and remove data-href',
    function() {
      loadFrame(function(frame) {
        var stylesheet =
          frame.contentDocument.querySelectorAll('link[lazyload]');

        expect(stylesheet.length).not.toBe(0);
        expect(stylesheet[0].getAttribute('data-href')).toEqual('');
      });
    });

    it('should hold the resource source in the lazyLoaded array',
      function() {
        loadFrame(function(frame) {
          expect(frame.contentWindow.slacker.lazyLoaded.length)
            .not.toEqual(0);
        });
    });

    it('should support the script element', function() {
      loadFrame(function(frame) {
        var stylesheet =
          frame.contentDocument.querySelectorAll('script[lazyload]');

        expect(stylesheet.length).not.toBe(0);
        expect(stylesheet[0].getAttribute('data-src')).toEqual('');
      });
    });

    it('should re-apply the lazyload attribute after the document.load event',
    function() {
      loadFrame(function(frame) {
        var stylesheet =
          frame.contentDocument.querySelectorAll('link[lazyload]');

        expect(stylesheet[0].getAttribute('href')).not.toBe(null);
      });
    });

    it('should fire the lazyloaded event after src replacement is complete',
    function() {
      loadFrame(function(frame) {
        var lazyloaded = false;

        frame.addEventListener('lazyloaded', function() {
          lazyloaded = true;
        }, false);

        waitsFor(function() {
          return lazyloaded;
        }, 'iframe lazyloaded event never fired', 2000);

        runs(function() {
          expect(lazyloaded).toBe(true);
        });
      });
    });
  });
});