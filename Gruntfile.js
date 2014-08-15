module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            srcFiles: {
                src: ['src/**/*.js']
            }

        }

    });



    grunt.registerTask('default', ['jshint']);
};
