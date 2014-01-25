module.exports = function(grunt) {

  // karma setup
  var browsers;
  (function() {
    var os = require('os');
    browsers = ['Chrome', 'Firefox'];
    if (os.type() === 'Darwin') {
      browsers.push('ChromeCanary');
      browsers.push('Safari');
    }
    if (os.type() === 'Windows_NT') {
      browsers.push('IE');
    }
  })();

  var banner = '/*\n * slacker.js v<%= pkg.version %>' +
    ' (<%= grunt.template.today("yyyy-mm-dd") %>)' +
    '\n * Copyright © 2013 Brandon Satrom\n *\n * Licensed under the' +
    ' MIT License (the "License")\n * Permission is hereby granted,' +
    ' free of charge, to any person obtaining a copy\n * of this' +
    ' software and associated documentation files (the "Software"), to deal\n' +
    ' * in the Software without restriction, including without limitation' +
    ' the rights\n * to use, copy, modify, merge, publish, distribute,' +
    ' sublicense, and/or sell\n * copies of the Software, and to permit' +
    ' persons to whom the Software is\n * furnished to do so, subject' +
    ' to the following conditions:\n *\n * The above copyright notice' +
    ' and this permission notice shall be included in\n * all copies' +
    ' or substantial portions of the Software.\n *\n * THE SOFTWARE IS' +
    ' PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n *' +
    ' IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF' +
    ' MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND' +
    ' NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT' +
    ' HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY' +
    ' , WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,' +
    ' ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE' +
    ' OR THE USE OR OTHER DEALINGS IN\n * THE SOFTWARE.\n */\n';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
        banner: banner
      },
      dist: {
        src: [
          'src/slacker.features.js',
          'src/slacker.js'
        ],
        dest: 'dist/slacker.js'
      }
    },
    uglify: {
      options: {
        banner: banner
      },
      dist: {
        files: {
          'dist/slacker.min.js': '<%= concat.dist.dest %>'
        }
      }
    },
    karma: {
      options: {
        configFile: 'conf/karma.conf.js',
        keepalive: true
      },
      browserstack: {
        browsers: ['BrowserStack:IE:Win']
      },
      forms: {
        browsers: browsers
      }
    },
    jshint: {
      files: ['gruntfile.js', 'src/**/*.js', 'spec/js/*.js'],
      options: {
        jshintrc: '.jshintrc',
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    kendo_lint: {
      files: ['src/**/*.js']
    },
    watch: {
      scripts: {
        files: ['<%= jshint.files %>'],
        tasks: ['minify', 'test', 'notify:watch'],
        options: {
          nospawn: true
        }
      }
    },
    jasmine: {
      src: ['lib/**/*.js', 'dist/slacker.min.js'],
      options: {
        specs: 'spec/js/fixtures.js',
        vendor: [
          'node_modules/js-fixtures/fixtures.js'
        ]
      }
    },
    changelog: {
      options: {
        dest: 'CHANGELOG.md',
        github: 'kendo-labs/kendo-ui-forms',
        version: grunt.file.readJSON('package.json').version
      }
    },
    notify: {
      watch: {
        options: {
          title: 'Watch complete',  // optional
          message: 'Minfication and tests have finished running'//required
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-notify');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('minify', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('test', ['minify', 'karma:forms']);
  grunt.registerTask('release', ['x-test', 'changelog']);
};