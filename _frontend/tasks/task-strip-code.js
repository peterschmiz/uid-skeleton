module.exports = function (grunt) {
	'use strict';

	var skeletonConfig = grunt.file.readJSON('skeleton-config.json'),
		build = skeletonConfig.directories.build,
		jsDir = skeletonConfig.directories.buildJs,
		scriptNaming = skeletonConfig.scripts.naming;

	/**
	 * Strip code task registration: 'strip-code'
	 * It will strip out the testing part from the code
	 * (put between 'test-code' and 'end-test-code'
	 * Only from the production code!
	 *
	 */
	grunt.registerTask('strip-code', 'Stip dev / unit test parts of the code', function () {
		grunt.task.run('strip_code');
	});

	/**
	 * Extend strip code task
	 */
	/* jshint camelcase: false */
	grunt.extendConfig({
		strip_code: {
			options: {
				start_comment: 'test-code',
				end_comment: 'end-test-code'
			},
			stripProd: {
				src: build + jsDir + scriptNaming.app
			}
		}
	});

};
