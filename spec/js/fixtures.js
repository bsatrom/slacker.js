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
    it('should be true', function() {
      expect(true).toBe(true);
    });
  });

  fixtures.cleanUp();
  fixtures.clearCache();
});