module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: ['dist/']
        },

        concat: {
            options: {
                separator: ';',
                banner: '/*\n' + grunt.file.read('LICENSE') + '*/\n'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/angular-http-mock.js'
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            srcFiles: {
                src: ['src/**/*.js']
            }
        },

        uglify: {
            options: {
                mangle: false,
                banner: '/*\n' + grunt.file.read('LICENSE') + '*/\n',
                compress: {
                    drop_console: true
                }
            },
            all: {
                files: {
                    'dist/angular-http-mock.min.js': ['dist/angular-http-mock.js']
                }
            }
        },

        watch: {
            js: {
                files: ['<%= jshint.srcFiles.src %>'],
                tasks: ['jshint'],
                options: {
                    debounceDelay: 250
                }
            }
        }

    });



    grunt.registerTask('default', ['jshint', 'watch']);

    grunt.registerTask('build', [
        'jshint',
        'clean',
        'concat',
        'uglify'
    ]);
};
