module.exports = function (grunt) {
	'use strict';

	var skeletonConfig = grunt.file.readJSON('skeleton-config.json');

	/**
	 * Project info task registration
	 *
	 */
	grunt.registerTask('project-info', 'Project settings, informations', function () {

		grunt.log.subhead('Project: ' + skeletonConfig.projectInfos.name.green);
		grunt.log.writeln('Version: ' + skeletonConfig.version);
		grunt.log.writeln('URL: ' + skeletonConfig.projectInfos.url.green);
		grunt.log.writeln('Last modified: ' + skeletonConfig.lastmodified);

		grunt.log.subhead('Version control URL: ' + skeletonConfig.projectInfos.repository.url.green);
		grunt.log.writeln('Version control type: ' + skeletonConfig.projectInfos.repository.type);
		grunt.log.writeln('CDCS name: ' + skeletonConfig.projectInfos.dev.cdcs.green);
		grunt.log.writeln('DEV type: ' + skeletonConfig.projectInfos.dev.type.green);

	});

};