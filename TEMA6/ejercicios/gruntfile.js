module.exports = function(grunt) {
	require('jit-grunt')(grunt);

	grunt.initConfig({
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					"./public/stylesheets/style.css": "./less/style.less" // destination file and source file
				}
			}
		},
		coffee: {
			glob_to_multiple: {
				expand: true,
				// flatten: true,
				cwd: 'coffee',
				src: ['*.coffee'],
				dest: 'public/javascripts',
				ext: '.js'
			  }
		},
		jade: {
			glob_to_multiple: {
				expand: true,
				// flatten: true,
				cwd: 'views/html',
				src: ['*.jade'],
				dest: 'public/templates',
				ext: '.html'
			}  
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true
			},
			files: ['routes/*.js', 'app.js']
		},
		watch: {
			styles: {
				files: ['less/**/*.less'], // which files to watch
				tasks: ['less'],
				options: {
					nospawn: true
				}
			},
			scripts:{
				files: ['coffee/*.coffee'], // which files to watch
				tasks: ['coffee']                
			},
			templates:{
				files: ['views/**/*.jade'], // which files to watch
				tasks: ['jade']                
			},
			check:{
				files: ['routes/*.js', 'app.js'],
				tasks: ['jshint']
			}
		}
	});

	grunt.registerTask('default', ['jshint', 'less', 'coffee', 'jade', 'watch']);
};