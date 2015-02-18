module.exports = function (grunt) {
	var skeletonConfig = grunt.file.readJSON('skeleton-config.json'),
		source = skeletonConfig.directories.source;

	/**
	 * Watch files task registration: 'watch-files'
	 *
	 */
	grunt.registerTask('watch-files', 'Watch different file types and run proper tasks if changed', function () {
		if (arguments.length === 0) {
			grunt.task.run('watch:scss');
			grunt.task.run('watch:js');
			grunt.task.run('watch:asset');
		} else {
			grunt.task.run('watch:scssProd');
			grunt.task.run('watch:jsProd');
			grunt.task.run('watch:assetProd');
		}
	});

	/**
	 * Extend watch files task
	 */
	grunt.extendConfig({
		watch: {
			scss: {
				files: source + 'scss/**/*.scss',
				tasks: ['check-scss-syntax', 'scss-compile']
			},
			scssProd: {
				files: source + 'scss/**/*.scss',
				tasks: ['check-scss-syntax:prd', 'scss-compile:prod']
			},
			js: {
				files: source + 'js/**/*.js',
				tasks: ['js-compile']
			},
			jsProd: {
				files: source + 'js/**/*.js',
				tasks: ['js-compile:prod']
			},
			asset: {
				files: [source + 'media/**/*', source + 'font/**/*', source + 'i/**/*', source + 'json/**/*'],
				tasks: ['copy-files', 'replace-vars']
			},
			assetProd: {
				files: [source + 'media/**/*', source + 'font/**/*', source + 'i/**/*', source + 'json/**/*'],
				tasks: ['copy-files:prod', 'replace-vars:prod']
			}
		}
	});

};
