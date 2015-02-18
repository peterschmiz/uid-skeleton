module.exports = function (grunt) {
	'use strict';

	var skeletonConfig = grunt.file.readJSON('skeleton-config.json'),
		configs = skeletonConfig.directories.configs;

	/**
	 * Karma (unit-test) task registration: 'unit-test'
	 * Run without any parameters to run only the unit-test,
	 * but no fixture generation
	 *
	 */
	grunt.registerTask('unit-test', 'Unit testing the JS files', function () {
		if (arguments.length === 0) {
			grunt.task.run('karma');
		} else {
			grunt.task.run('clean-files:karma-fixtures');
			grunt.task.run('middleman');
			grunt.task.run('copy:karmaFixtures');
			grunt.task.run('clean-files:fixtures');
			grunt.task.run('clean-files:handlebarsStatic');
			grunt.task.run('karma');
		}

	});

	/**
	 * Extend the main task
	 *
	 */
	grunt.extendConfig({
		karma: {
			unit: {
				configFile: configs + 'karma.conf.js',
				reportSlowerThan: 3000,
				singleRun: true
			}
		}
	});

};
