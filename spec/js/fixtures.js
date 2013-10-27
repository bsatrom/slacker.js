describe('Slacker.js Test Suite', function() {
  var path = '/';

  if (document.location.pathname === '/context.html') {
    // Karma is running the test, so change the base
    path = 'base/spec/javascripts/fixtures/';
  } else if (document.location.pathname.indexOf('runner.html') > 0) {
    // We're running jasmine in the browser
    path = 'javascripts/fixtures/';
  }

  describe('lazyload attribute tests', function() {
    it('should test for the lazyload attribute before acting', function() {
      var s = document.createElement('script');
      var lazyloadSupported = 'lazyload' in s;
      var slackerFrame = document.querySelector('iframe#slackerFrame'),
        loaded = false;
      slackerFrame.src = path + 'lazyload.html';

      slackerFrame.addEventListener('load', function() {
        loaded = true;
      });

      waitsFor(function() {
        return loaded;
      }, 'iframe load event never fired', 2000);

      runs(function() {
        expect(lazyloadSupported)
          .toEqual(slackerFrame.contentWindow.slacker.features.lazyload);

        slackerFrame.src = '';
      });
    });

    it('should detect the lazyload attribute and remove data-href',
    function() {
      var slackerFrame = document.querySelector('iframe#slackerFrame'),
        loaded = false;
      slackerFrame.src = path + '/lazyload.html';

      slackerFrame.addEventListener('load', function() {
        loaded = true;
      });

      waitsFor(function() {
        return loaded;
      }, 'iframe load event never fired', 2000);

      runs(function() {
        var stylesheet =
          slackerFrame.contentDocument.querySelectorAll('link[lazyload]');

        expect(stylesheet.length).not.toBe(0);
        expect(stylesheet[0].getAttribute('data-href')).toEqual('');

        slackerFrame.src = '';
      });
    });

    it('should hold the resource source in the lazyLoaded array',
    function() {
      var slackerFrame = document.querySelector('iframe#slackerFrame'),
        loaded = false;
      slackerFrame.src = path + '/lazyload.html';

      slackerFrame.addEventListener('load', function() {
        loaded = true;
      });

      waitsFor(function() {
        return loaded;
      }, 'iframe load event never fired', 2000);

      runs(function() {
        expect(slackerFrame.contentWindow.slacker.lazyLoaded.length)
          .toEqual(2);
        //var stylesheet =
        //  slackerFrame.contentDocument.querySelectorAll('link[lazyload]');

        //expect(stylesheet.length).not.toBe(0);
        //expect(stylesheet[0].getAttribute('data-href')).toBe(null);

        slackerFrame.src = '';
      });
    });

    it('should re-apply the lazyload attribute after the document.load event',
    function() {

    });
  });
});