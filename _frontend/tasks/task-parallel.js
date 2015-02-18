module.exports = function (grunt) {
	'use strict';

	/**
	 * Concurrent task registration: 'parallel'
	 *
	 */
	grunt.registerTask('parallel', 'Start watchers parallel', function () {
		if (arguments.length === 0) {
			grunt.task.run('concurrent:dev');
		} else {
			grunt.task.run('concurrent:prod');
		}

	});

	/**
	 * Extend concurrent task
	 *
	 */
	grunt.extendConfig({
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			prod: {
				tasks: [
					'watch:scssProd',
					'watch:jsProd',
					'watch:assetProd'
				]
			},
			dev: {
				tasks: [
					'watch:scss',
					'watch:js',
					'watch:asset',
					'middleman:server'
				]
			}
		}
	});

};
