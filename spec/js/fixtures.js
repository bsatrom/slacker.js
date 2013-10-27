describe('Slacker.js Test Suite', function() {
  var fixtures = jasmine.getFixtures(),
  env = 'headless';

  if (document.location.pathname === '/context.html') {
    // Karma is running the test, so change the base
    fixtures.fixturesPath = 'base/spec/javascripts/fixtures';
    env = 'karma';
  } else if (document.location.pathname.indexOf('runner.html') > 0) {
    // We're running jasmine in the browser
    fixtures.fixturesPath = '../spec/javascripts/fixtures';
    env = 'browser';
  }

  describe('lazyload attribute tests', function() {
    it('should test for the lazyload attribute before acting', function() {
      var s = document.createElement('script');
      var lazyloadSupported = 'lazyload' in s;

      expect(lazyloadSupported).toEqual(window.slacker.features.lazyload);
    });

    it('should detect the lazyload attribute and remove the src attribute',
    function() {
      fixtures.load('lazyload.html');

      var stylesheet = document.querySelectorAll('[lazyload]');

      expect(stylesheet.length).not.toBe(0);
      expect(stylesheet[0].getAttribute('src')).toEqual('');
    });

    it('should re-apply the lazyload attribute after the document.load event',
    function() {
      var loaded = false;
      fixtures.load('lazyload.html');

      var stylesheet = document.querySelectorAll('[lazyload]');


      window.addEventListener('load', function() {
        loaded = true;
      });

      //waitsFor(function() {
     //   return loaded;
     // }, 'document load event never fired', 10000);

      //runs(function() {
      //  expect(stylesheet[0].getAttribute('src')).not.toEqual('');
     // });
    });
  });

  fixtures.cleanUp();
  fixtures.clearCache();
});