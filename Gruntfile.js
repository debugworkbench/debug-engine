var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'jshint': {
      files: ['Gruntfile.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    'mochaTest': {
      test: {
        options: {
          reporter: 'spec',
          quiet: false,
          clearRequireCache: true
        },
        src: ['test/**/*.js']
      }
    },
    'tsd': {
      lib: {
        options: {
          command: 'reinstall',
          latest: true,
          config: 'conf/tsd-lib.json',
          opts: {
            // props from tsd.Options
          }
        }
      },
      test: {
        options: {
          command: 'reinstall',
          latest: true,
          config: 'conf/tsd-test.json',
          opts: {
            // props from tsd.Options
          }
        }
      }
    },
    'tslint': {
      errors: {
        options: {
          configuration: grunt.file.readJSON('conf/tslint.json')
        },
        files: {
          src: [
            'src/**/*.ts',
            'test/**/*.ts'
          ]
        }
      }
    },
    'typedoc': {
        build: {
            options: {
                module: 'commonjs',
                target: 'es5',
                out: 'docs/',
                name: '<%= pkg.name %>'
            },
            src: 'src/**/*.ts'
        }
    },
    'ibsforts': {
      lib: {
        options: {
          projectConfigPath: './src/tsconfig.json',
          plugins: [{
            module: 'ibsforts-plugin-babel',
            transform: 'babelTransform',
            options: {
              enableNodeModuleResolution: true,
              plugins: [
                'transform-strict-mode',
                'transform-es2015-parameters',
                'transform-es2015-destructuring',
                'transform-es2015-spread'
              ]
            }
          }]
        }
      },
      test: {
        options: {
          projectConfigPath: './test/tsconfig.json'
        }
      }
    },
    'watch': {
      lib: {
        files: 'src/**/*.ts',
        tasks: ['tslint', 'tsc:lib']
      },
      test: {
        files: 'test/**/*.ts',
        tasks: ['tsc:test', 'test']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ibsforts');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-tsd');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-typedoc');

  grunt.registerTask('copy-dts', 'Copy declarations to ./lib', function () {
    grunt.file.copy('./src/errors.d.ts', './lib/errors.d.ts');
  });

  grunt.registerTask('docs', ['typedoc']);

  grunt.registerTask('lint', ['jshint', 'tslint']);

  grunt.registerTask('build', ['tslint', 'ibsforts:lib', 'copy-dts']);

  grunt.registerTask('run-tests', ['mochaTest']);

  grunt.registerTask('test', ['tslint', 'ibsforts:test', 'run-tests']);

  grunt.registerTask('default', ['lint', 'build', 'run-tests']);
};
