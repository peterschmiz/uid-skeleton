module.exports = function (grunt) {
	'use strict';

	var skeletonConfig = grunt.file.readJSON('skeleton-config.json'),
		build = skeletonConfig.directories.build,
		source = skeletonConfig.directories.source;

	/**
	 * Compile SVG task registration: 'compile-svg'
	 * Run it with any parameter (eg. 'compile-svg:prod') to
	 * run it in prod mode
	 *
	 */
	grunt.registerTask('compile-svg', 'Compile SVGs into one sprite', function () {
		grunt.task.run('clean-files:svg');
		grunt.task.run('svgmin');
		grunt.task.run('replace:svgFill');
		if (arguments.length === 0) {
			grunt.task.run('svg2png:dev');
			grunt.task.run('svgstore:dev');
		} else {
			grunt.task.run('svg2png:prod');
			grunt.task.run('svgstore:prod');
			grunt.task.run('copy:svgsprite');
		}
	});

	/**
	 * Extend the compile-svg task
	 * Concatenacet SVG files into a sprite sheet
	 *
	 */
	grunt.extendConfig({
		svgstore: {
			options: {
				prefix: '',
				formatting: true,
				cleanup: false,
				svg: {
					viewBox: '0 0 256 256',
					xmlns: 'http://www.w3.org/2000/svg',
					'xmlns:xlink': 'http://www.w3.org/1999/xlink'
				}
			},
			dev: {
				files: {
					'source/i/sprite/sprite-app.svg': source + 'i/sprite/source/svg/minified/**/*.svg',
					'source/temp/i/sprite/sprite-app.svg': source + 'i/sprite/source/svg/minified/**/*.svg'
				}
			},
			prod: {
				files: {
					'source/i/sprite/sprite-app.svg': source + 'i/sprite/source/svg/minified/**/*.svg'
				}
			}
		}
	});

	/**
	 * Extend the compile-svg task
	 * Convert SVG files to PNG files
	 *
	 */
	grunt.extendConfig({
		svg2png: {
			dev: {
				files: [
					{ cwd: source + 'i/sprite/source/svg/', src: ['*.svg'], dest: source + 'i/sprite/fallback/svg-png/' },
					{ cwd: source + 'i/sprite/source/svg/nofill/', src: ['*.svg'], dest: source + 'i/sprite/fallback/svg-png/' }
				]
			},
			prod: {
				files: [
					{ cwd: source + 'i/sprite/source/svg/', src: ['*.svg'], dest: build + 'i/sprite/fallback/svg-png/' },
					{ cwd: source + 'i/sprite/source/svg/nofill/', src: ['*.svg'], dest: build + 'i/sprite/fallback/svg-png/' }
				]
			}
		}
	});

	/**
	 * Extend the compile-svg task
	 * Minify SVG files (optimize, remove unnecesarry tags, groups
	 *
	 */
	grunt.extendConfig({
		svgmin: {
			options: {
				plugins: [
					{
						removeUselessStrokeAndFill: false
					},
					{
						convertPathData: {
							straightCurves: false
						}
					}
				]
			},
			min: {
				files: [
					{
						expand: true,
						cwd: source + 'i/sprite/source/svg/',
						src: ['*.svg', 'nofill/*.svg'],
						dest: source + 'i/sprite/source/svg/minified/'
					}
				]
			}
		}
	});

};