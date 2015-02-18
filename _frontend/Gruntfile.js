module.exports = function (grunt) {
	'use strict';

	var skeletonConfig = grunt.file.readJSON('skeleton-config.json');

	/**
	 * Load tasks starting with 'grunt-' from
	 * the tasks directory
	 *
	 */
	skeletonConfig.grunt.tasks.forEach(function (dep) {
		if (dep.substring(0, 6) === 'grunt-') {
			grunt.loadNpmTasks(dep);
		}
	});

	/**
	 * Load external tasks from the task directory
	 *
	 */
	grunt.loadTasks(skeletonConfig.directories.tasks);

	/**
	 * Register the default tasks
	 * The actual task can be set in the skeleton config
	 *
	 */
	grunt.registerTask('default', skeletonConfig.grunt.defaultTasks);

	/**
	 * Initialize temporary files
	 * Needed when developing in live
	 *
	 */
	grunt.registerTask('init-temp', skeletonConfig.grunt.initTempTasks);

	/**
	 * Register the build tasks
	 * The tasks in the build can be set & ordered
	 * in the skeleton config
	 *
	 */
	grunt.registerTask('build', skeletonConfig.grunt.buildTasks);


	/**
	 * Register the build tasks for GO.CD
	 * The tasks in the build can be set & ordered
	 * in the skeleton config
	 *
	 */
	grunt.registerTask('gocd-build', skeletonConfig.grunt.gocdTasks);

};