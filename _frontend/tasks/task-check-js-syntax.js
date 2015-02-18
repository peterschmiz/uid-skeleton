module.exports = function (grunt) {
	'use strict';

	var skeletonConfig = grunt.file.readJSON('skeleton-config.json'),
		source = skeletonConfig.directories.source;


	/**
	 * Check JS syntax with JSHint, task registration: 'check-js-syntax'
	 * Run without any parameters to run the production test!
	 *
	 */
	grunt.registerTask('check-js-syntax', 'Running JSHint on javascripts, json files', function (mode) {
		grunt.task.run('jshint:json');
		if (arguments.length === 0) {
			grunt.task.run('jshint:modulesProd');
			grunt.task.run('jshint:pluginsProd');
			grunt.task.run('jshint:utilsProd');
		} else {
			if (mode === 'skeleton') {
				grunt.task.run('jshint:grunt');
			} else {
				grunt.task.run('jshint:modules');
				grunt.task.run('jshint:plugins');
				grunt.task.run('jshint:utils');
			}
		}
	});

	/**
	 * Extend the main task
	 *
	 */
	grunt.extendConfig({
		jshint: {
			options: {
				jshintrc: true
			},
			grunt: {
				files: [
					{
						expand: true,
						flatten: false,
						cwd: '.',
						src: ['package.json', 'Gruntfile.js', 'tasks/**/*.js'],
						filter: 'isFile'
					}
				]
			},
			json: {
				files: [
					{
						expand: true,
						flatten: false,
						cwd: source + '/json/',
						src: ['**/*.json'],
						filter: 'isFile'
					}
				]
			},
			modules: {
				options: {
					noempty: false,
					unused: false
				},
				files: [
					{
						expand: true,
						flatten: false,
						cwd: source + '/js/module/',
						src: ['**/*.js'],
						filter: 'isFile'
					}
				]
			},
			modulesProd: {
				files: [
					{
						expand: true,
						flatten: false,
						cwd: source + '/js/module/',
						src: ['**/*.js'],
						filter: 'isFile'
					}
				]
			},
			plugins: {
				options: {
					noempty: false,
					unused: false
				},
				files: [
					{
						expand: true,
						flatten: false,
						cwd: source + '/js/plugin/crngp/',
						src: ['*.js'],
						filter: 'isFile'
					}
				]
			},
			pluginsProd: {
				files: [
					{
						expand: true,
						flatten: false,
						cwd: source + '/js/plugin/crngp/',
						src: ['*.js'],
						filter: 'isFile'
					}
				]
			},
			utils: {
				options: {
					noempty: false,
					unused: false
				},
				files: [
					{
						expand: true,
						flatten: false,
						cwd: source + '/js/util/',
						src: ['utility.js'],
						filter: 'isFile'
					}
				]
			},
			utilsProd: {
				files: [
					{
						expand: true,
						flatten: false,
						cwd: source + '/js/util/',
						src: ['utility.js'],
						filter: 'isFile'
					}
				]
			}
		}
	});

};