module.exports = function (grunt) {
	'use strict';

	var terminal = require('child_process').exec,
		done;

	/**
	 * Register the global middleman task
	 * Run it with any parameter to start the Middleman
	 * in server mode
	 *
	 */
	grunt.registerTask('middleman', 'Middleman build or server', function () {
		if (arguments.length === 0) {
			grunt.task.run('middleman-build');
		} else {
			grunt.task.run('middleman-server');
		}
	});

	grunt.registerTask('middleman-build', 'Middleman build', function () {
		grunt.task.run('bumpup:patch');
		done  = this.async();
		terminal('bundle exec middleman build', function (error) {
			if (error) {
				grunt.log.error(error);
			}
			done();
		});
	});

	grunt.registerTask('middleman-server', 'Middleman server', function () {
		done  = this.async();
		terminal('bundle exec middleman server', function (error) {
			if (error) {
				grunt.log.error(error);
			}
			done();
		});
	});

};