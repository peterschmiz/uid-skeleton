module.exports = function (grunt) {
	'use strict';

	var path = require('path'),
		dateformat = 'YYYY-MM-DD HH:mm:ss',
		skeletonConfig = grunt.file.readJSON('skeleton-config.json'),
		dependencies = skeletonConfig.scripts.dependencies,
		moment = require('moment'),
		mapping = skeletonConfig.scripts.mapping;

	/**
	 * Checks if string matching the given expression
	 *
	 * @param string
	 * @param expressions
	 * @returns {boolean}
	 */
	function matchInArray(string, expressions) {
		var len = expressions.length,
			i = 0,
			retVal = false;

		for (i; i < len; i++) {
			if (string.match(expressions[i])) {
				retVal = true;
			}
		}

		return retVal;

	}

	/**
	 * Read bower script-directory mapping
	 *
	 * @param obj
	 * @param component
	 * @returns {*}
	 */
	function readMap(obj, component) {
		var val = obj.dest,
			dep = obj.dependencies,
			name,
			result,
			returnVal;

		if (val !== undefined) {
			returnVal = {dest: val, dep: dep};
		}

		if (returnVal === undefined) {
			for (name in obj) {
				if (obj.hasOwnProperty(name)) {
					result = readMap(obj[name], component);
					if (result !== undefined && matchInArray(component, result.dep)) {
						returnVal = {dest: result.dest, dep: result.dep};
					}
				}
			}
		}

		return returnVal;
	}

	/**
	 * Check the name of the bower config & generate
	 * it from the skeleton config
	 *
	 */
	function checkBowerJSON() {
		var outputFilename = skeletonConfig.configs.bower,
			data = {
				name: 'Generated Bower config - ' + moment.utc().zone('+0200').format(dateformat),
				dependencies: dependencies,
				ignore: [
					'source',
					'spec',
					'test',
					'tests',
					'.bowerrc',
					'.gitignore',
					'.jshintignore',
					'.jshintrc',
					'bower.json',
					'gruntfile.js',
					'package.json',
					'README.md'
				]
			};
		grunt.file.write(outputFilename, JSON.stringify(data, null, 4));
	}

	/**
	 * Bower task registration: 'bower-install'
	 * Run it with any parameter (eg. 'bower-install:gocd') to
	 * run it in test mode (no actual copy will happen)
	 *
	 */
	grunt.registerTask('bower-install', 'Installs bower packages', function (mode) {
		if (mode === 'generate') {
			checkBowerJSON();
		} else {
			checkBowerJSON();
			grunt.task.run('bower:clean');
			grunt.task.run('clean-files:jslib');
			grunt.task.run('bower:install');
			if (arguments.length === 0) {
				grunt.task.run('copy-files:bower');
			}
			grunt.task.run('bower:clean');
		}
	});

	/**
	 * Extend the main task
	 * Possible sub-tasks:
	 * - bower:install
	 * - bower:clean
	 *
	 */
	grunt.extendConfig({

		bower: {

			install: {
				options: {
					targetDir: './' + skeletonConfig.bower.tempDir,
					install: true,
					verbose: false,
					cleanTargetDir: true,
					cleanBowerDir: true,
					bowerOptions: {
						forceLatest: true,
						production: true
					},
					layout: function (type, component) {
						var target = readMap(mapping, component);
						return path.join(target.dest, component);
					}
				}
			},

			clean: {
				options: {
					targetDir: './' + skeletonConfig.bower.tempDir,
					install: false,
					verbose: false,
					cleanTargetDir: true,
					cleanBowerDir: true
				}
			}

		}

	});

};