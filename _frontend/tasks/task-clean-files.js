module.exports = function (grunt) {
	'use strict';

	var skeletonConfig = grunt.file.readJSON('skeleton-config.json'),
		bowerConfig,
		build = skeletonConfig.directories.build,
		source = skeletonConfig.directories.source,
		jsTemp = skeletonConfig.directories.jstemp,
		doc = skeletonConfig.directories.doc,
		staticHtml = skeletonConfig.directories.staticHtml,
		temp = skeletonConfig.directories.temp;

	function readBowerConfig() {
		if (grunt.file.exists('bower.json')) {
			bowerConfig = grunt.file.readJSON('bower.json');
			return true;
		}
		return false;
	}

	function isBowerJS(filepath) {
		var splitted = filepath.split('\\'),
			l = splitted.length,
			fileWithExt = splitted[l - 1],
			file = fileWithExt.split('.')[0],
			isBower = false;

		if (bowerConfig !== undefined) {
			for (var lib in bowerConfig.dependencies) {
				if (bowerConfig.dependencies.hasOwnProperty(lib)) {
					if (lib === file) {
						isBower = true;
						return isBower;
					}
				}
			}
		}

		return isBower;
	}

	/**
	 * Register task 'clean-files'
	 *
	 */
	grunt.registerTask('clean-files', 'Clean selected, temporary files', function (mode) {
		switch (mode) {
			// Clean temporary directory from the 'source' directory
		case 'temp':
			grunt.task.run('clean:temp');
			break;
			// Clean the JS libraries (used with Bower install)
		case 'jslib':
			if (readBowerConfig()) {
				grunt.task.run('clean:jslib');
			}
			break;
			// Clean Karma fixtures (used with unit testing) from the test directory
		case 'karma-fixtures':
			grunt.task.run('clean:karmaFixtures');
			break;
			// Clean Karma fixtures from the static directory
		case 'fixtures':
			grunt.task.run('clean:fixtures');
			break;
			// Clear the temporary JS directory (used with the Closure)
		case 'jstemp':
			grunt.task.run('clean:jstemp');
			break;
			// Clear node_modules & .bundle directory (usually before re-init)
		case 'skeleton':
			grunt.task.run('clean:skeleton');
			break;
			// Clean the minified SVGs and compiled SVG fallback PNGs
		case 'svg':
			grunt.task.run('clean:svg');
			break;
		}
	});

	/**
	 * Extend 'clean-files' task
	 *
	 */
	grunt.extendConfig({

		clean: {
			options: {
				force: true
			},
			doc: {
				src: [doc + '*', doc]
			},
			jslib: {
				src: [source + 'js/lib/**/*.js', source + 'js/plugin/*.js', source + 'js/plugin/standalone/*.js', source + 'js/plugin/iife/*.js'],
				filter: function (filepath) {
					return isBowerJS(filepath);
				}
			},
			jstemp: {
				src: [build + 'js/*.temp', build + 'js/**/' + jsTemp]
			},
			karmaFixtures: {
				src: [source + 'tests/testfixtures/*.html', '!' + source + 'tests/testfixtures/test.html']
			},
			fixtures: {
				src: [staticHtml + 'fixtures/*.html', staticHtml + 'fixtures']
			},
			skeleton: {
				src: ['node_modules' + '*', 'node_modules', '.bundle' + '*', '.bundle']
			},
			svg: {
				src: [source + 'i/sprite/source/svg/minified**/*.svg', source + 'i/sprite/fallback/svg-png/**/*.png']
			},
			temp: {
				src: [temp + '**/*', temp]
			}
		}

	});

};
