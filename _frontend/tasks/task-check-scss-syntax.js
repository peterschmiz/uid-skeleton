module.exports = function (grunt) {
	'use strict';

	var skeletonConfig = grunt.file.readJSON('skeleton-config.json'),
		configs = skeletonConfig.directories.configs,
		source = skeletonConfig.directories.source;

	/**
	 * SCSS Lint task registration: 'check-scss-syntax'
	 *
	 */
	grunt.registerTask('check-scss-syntax', 'Running SCSS Lint on SCSS files', function () {
		if (arguments.length === 0) {
			grunt.task.run('scsslint:dev');
		} else {
			grunt.task.run('scsslint:prod');
		}
	});

	/**
	 * Extend the main task
	 * Important! If running in DEV mode not all
	 * the directories (files) will be checked!
	 *
	 */
	grunt.extendConfig({
		scsslint: {
			options: {
				bundleExec: true,
				config: configs + '.scss-lint.yml',
				reporterOutput: 'scss-lint-report.xml',
				colorizeOutput: true
			},
			allFiles: [
				'test/fixtures/*.scss'
			],
			dev: {
				options: {},
				src: [source + 'scss/layout/**/*.scss', source + 'scss/module/**/*.scss']
			},
			prod: {
				options: {},
				src: [source + 'scss/base/**/*.scss', source + 'scss/layout/**/*.scss', source + 'scss/module/**/*.scss', source + 'scss/partial/**/*.scss']
			}
		}
	});

};