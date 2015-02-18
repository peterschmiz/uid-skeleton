module.exports = function (grunt) {
	'use strict';

	var dateformat = 'YYYY-MM-DD HH:mm:ss',
		moment = require('moment');

	/**
	 * Register task 'bumpup-files'
	 *
	 */
	grunt.registerTask('bumpup-files', 'Version files', function (mode) {

		if (mode === 'patch') {
			grunt.task.run('bumpup:patch');
		} else if (mode === 'major') {
			grunt.task.run('bumpup:major');
		} else {
			grunt.task.run('bumpup:prerelease');
		}

	});

	/**
	 * Extend bumpup task
	 *
	 */
	grunt.extendConfig({

		bumpup: {
			options: {
				normalize: false
			},
			setters: {
				lastmodified: function () {
					return moment.utc().zone('+0200').format(dateformat);
				}
			},
			file: 'skeleton-config.json'
		}

	});

};