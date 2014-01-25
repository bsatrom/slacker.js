describe('Slacker.js Test Suite', function() {
  if (document.location.pathname === '/context.html') {
    // Karma is running the test, so change the base
    fixtures.path = 'base/spec/javascripts/fixtures/';
  } else if (document.location.pathname.indexOf('runner.html') > 0) {
    // We're running jasmine in the browser
    fixtures.path = 'javascripts/fixtures/';
  }
  fixtures.containerId = 'slackerFrame';

  describe('lazyload attribute tests', function() {
    afterEach(function() {
      fixtures.clearCache();
      fixtures.cleanUp();
    });

    it('should test for the lazyload attribute before acting', function() {
      var s = document.createElement('script');
      var lazyloadSupported = 'lazyload' in s;

      fixtures.load('lazyload.html', function() {
        var slackerFrame = document.querySelector('iframe#slackerFrame');
        expect(lazyloadSupported)
          .toEqual(slackerFrame.contentWindow.slacker.features.lazyload);
      });
    });

    it('should detect the lazyload attribute and remove data-href',
    function() {
      fixtures.load('lazyload.html', function() {
        var slackerFrame = document.querySelector('iframe#slackerFrame');
        var stylesheet =
          slackerFrame.contentDocument.querySelectorAll('link[lazyload]');

        expect(stylesheet.length).not.toBe(0);
        expect(stylesheet[0].getAttribute('data-href')).toEqual('');
      });
    });

    it('should hold the resource source in the lazyLoaded array',
    function() {
      fixtures.load('lazyload.html', function() {
        var slackerFrame = document.querySelector('iframe#slackerFrame');
        expect(slackerFrame.contentWindow.slacker.lazyLoaded.length)
          .not.toEqual(0);
      });
    });

    it('should support the script element', function() {
      fixtures.load('lazyload.html', function() {
        var slackerFrame = document.querySelector('iframe#slackerFrame');
        var stylesheet =
          slackerFrame.contentDocument.querySelectorAll('script[lazyload]');

        expect(stylesheet.length).not.toBe(0);
        expect(stylesheet[0].getAttribute('data-src')).toEqual('');
      });
    });

    it('should re-apply the lazyload attribute after the document.load event',
    function() {
      fixtures.load('lazyload.html', function() {
        var slackerFrame = document.querySelector('iframe#slackerFrame');
        var stylesheet =
          slackerFrame.contentDocument.querySelectorAll('link[lazyload]');

        expect(stylesheet[0].getAttribute('href')).not.toBe(null);
      });
    });

    it('should fire the lazyloaded event after src replacement is complete',
    function() {
      fixtures.load('lazyload.html', function() {
        var lazyLoadedEvt = false;
        var frame = document.querySelector('iframe#slackerFrame');

        frame.contentWindow.addEventListener('lazyloaded', function() {
          lazyLoadedEvt = true;
        }, false);

        //Re-load the frame to make sure the event fires
        fixtures.cleanUp();
        fixtures.load('lazyload.html', function() {
          waitsFor(function() {
            return lazyLoadedEvt;
          }, 'lazyloaded iframe event never fired', 2000);

          runs(function() {
            expect(lazyLoadedEvt).toBe(true);
          });
        });
      });
    });
  });
});