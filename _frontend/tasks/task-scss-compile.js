module.exports = function (grunt) {
	'use strict';

	var skeletonConfig = grunt.file.readJSON('skeleton-config.json'),
		build = skeletonConfig.directories.build,
		temp = skeletonConfig.directories.temp,
		source = skeletonConfig.directories.source;

	/**
	 * SCSS compile task registration: 'scss-compile'
	 *
	 */
	grunt.registerTask('scss-compile', 'Compile SASS sources into CSS', function () {
		if (arguments.length === 0) {
			grunt.task.run('sass:dev');
		} else {
			grunt.task.run('sass:prod');
		}
	});

	/**
	 * Extend the main task
	 *
	 */
	grunt.extendConfig({
		skeletonConfig: skeletonConfig,
		sass: {
			options: {
				banner: '/*! <%= skeletonConfig.projectInfos.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dev: {
				options: {
					sourcemap: 'auto',
					trace: false,
					style: 'expanded',
					precision: 3,
					quiet: true,
					debugInfo: true,
					lineNumbers: true,
					noCache: false,
					cacheLocation: temp + '.sass-cache',
					bundleExec: true,
					update: true
				},
				files: [
					{
						expand: true,
						cwd: source + 'scss/',
						src: ['*.scss'],
						dest: temp + 'css/',
						ext: '.css'
					}
				]
			},
			prod: {
				options: {
					sourcemap: 'auto',
					style: 'compressed',
					quiet: true,
					debugInfo: false,
					lineNumbers: false,
					noCache: true,
					bundleExec: true,
					update: false
				},
				files: [
					{
						expand: true,
						cwd: source + 'scss/',
						src: ['*.scss'],
						dest: build + 'css/',
						ext: '.css'
					}
				]
			}
		}
	});

};