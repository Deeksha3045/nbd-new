/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, indent:2, node:true, jquery:true */

module.exports = function (grunt) {
  'use strict'
  require('jit-grunt')(grunt)

  grunt.initConfig({
    jshint: {
      all: ['src/js/*.js'],
      options: {
        jshintrc: '.jshintrc',
      },
    },
    uglify: {
      options: {
        beautify: true,
        compress: false,
        mangle: false,
      },
      my_target: {
        files: {
          'export/js/bottom.min.js': [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/popper.js/dist/umd/popper.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
            'node_modules/bootstrap-select/dist/js/bootstrap-select.js',
            'node_modules/owl.carousel/dist/owl.carousel.js',
            'node_modules/aos/dist/aos.js',
            'src/js/jquery.csInit.js',
            'src/js/csMain.js',
            'src/js/csInit.js',
          ],
        },
      },
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            src: [
              'src/fonts/*',
            ],
            dest: 'export/fonts',
            filter: 'isFile',
            flatten: true,
          },
          {
            expand: true,
            src: ['src/js/*'],
            dest: 'export/js',
            filter: 'isFile',
            flatten: true,
          },
          {
            expand: true,
            src: ['src/jsx/*'],
            dest: 'export/js',
            filter: 'isFile',
            flatten: true,
          },
          {
            expand: true,
            src: ['src/js/lib/*'],
            dest: 'export/js/lib',
            filter: 'isFile',
            flatten: true,
          },
          {
            expand: true,
            src: ['src/img/*'],
            dest: 'export/img',
            filter: 'isFile',
            flatten: true,
          },
          {
            expand: true,
            src: ['src/.htaccess'],
            dest: 'export/',
            filter: 'isFile',
            flatten: true,
          },
        ],
      },
      cleanexport: {
        files: [
          {
            expand: true,
            src: ['export/*'],
            dest: 'export',
            filter: 'isFile',
            flatten: true,
          },
        ],
      },
    },
    sass: {
      options: {
        implementation: require('sass'),
        sourceMap: true,
        outputStyle: 'expanded'
      },
      dist: {
        files: {
          'export/css/condensed.css': 'src/sass/main.scss'
        }
      }
    },

    watch: {
      templates: {
        files: ['src/*.html', 'src/components/*.html', 'src/atoms/*.html', 'src/components/*.html'],
        tasks: ['includes', 'copy:cleanexport', 'regex-replace'],
        options: {
          nospawn: true,
        },
      },
      styles: {
        files: ['src/sass/**/*.scss'], // Changed to watch .scss files
        tasks: ['sass'],
        options: {
          nospawn: true,
        },
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['jshint'],
        options: {
          nospawn: true,
        },
      },
      bsFiles: {
        files: [
          'export/css/*.css',
          'export/js/*.js',
          'export/*.html'
        ],
        tasks: [],
        options: {
          livereload: true
        }
      }
    },

    // Node unit tests
    nodeunit: {
      tests: [],
    },

    includes: {
      options: {
        debug: true, // generates html include comments, if true.
      },

      files: {
        src: ['src/*.html'], // Source files
        dest: 'export', // Destination directory
        flatten: true,
        cwd: '.',
        options: {
          silent: true,
        },
      },
    },

    'regex-replace': {
      removecs: {
        src: 'exportclean/*',
        actions: [
          {
            search: '</?cs-[a-zA-Z]+[^>]*>',
            replace: '',
            flags: 'g',
          },
          {
            search: ' cs-[-a-z_A-Z]+ *= *"[^"]*"',
            replace: '',
            flags: 'g',
          },
          {
            search: ' cs-[-a-z_A-Z]+',
            replace: '',
            flags: 'g',
          },
        ],
      },
    },

    // Remove export staging directory
    clean: {
      main: {
        src: ['export', 'exportclean'],
      },
      components: {
        src: ['src/components'],
      },
    },
    open: {
      file: {
        path: 'export/index.html'
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'export/css/*.css',
            'export/js/*.js',
            'export/*.html'
          ]
        },
        options: {
          watchTask: true, // This ensures that Grunt keeps watching even after BrowserSync has started
          server: {
            baseDir: "./export/"
          }
        }
      }
    },
  })

  grunt.registerTask('statusMsg', 'Log some stuff.', function () {
    grunt.log.write('export Demo... see export folder...').ok()
  })

  // Load plugins used by this task gruntfile
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-regex-replace')
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-sass');
  // Load task plugings
  grunt.loadTasks('tasks')

  grunt.registerTask('default', [
    'clean:main',
    'includes',
    'jshint',
    'uglify',
    'sass',
    'copy',
    'regex-replace',
    'statusMsg',
    'open',
    'browserSync:dev', // Add browserSync task here
    'watch'
  ]);
}
