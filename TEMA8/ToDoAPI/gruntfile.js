module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'publicjavascripts/*.js']
        },
        jade: {
            options: {
                pretty: true
            },
            glob_to_multiple: {
                expand: true,
                // flatten: true,
                cwd: 'views/',
                src: ['*.jade'],
                dest: 'public/templates',
                ext: '.html'
            }  
        },
        watch: {
            templates:{
                files: ['views/**/*.jade'], // which files to watch
                tasks: ['jshint', 'jade']                
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'jade', 'watch']);
};