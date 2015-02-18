module.exports = function (grunt) {
	'use strict';

	var skeletonConfig = grunt.file.readJSON('skeleton-config.json'),
		build = skeletonConfig.directories.build,
		imagesDir = skeletonConfig.directories.buildImages,
		fontDir = skeletonConfig.directories.buildFont,
		jsDir = skeletonConfig.directories.buildJs,
		jsLibDir = skeletonConfig.directories.buildStandaloneJs,
		jsTemp = skeletonConfig.directories.jstemp,
		requireDir = skeletonConfig.directories.buildRequireModul,
		staticHtml = skeletonConfig.directories.staticHtml,
		source = skeletonConfig.directories.source,
		tests = skeletonConfig.directories.tests,
		temp = skeletonConfig.directories.temp,
		handlebars = skeletonConfig.directories.handlebars;

	/**
	 * Copy files task registration: 'copy-files'
	 *
	 */
	grunt.registerTask('copy-files', 'Copy assets, fonts, standalone files', function (mode) {
		if (arguments.length === 0) {
			grunt.task.run('copy:font');
			grunt.task.run('copy:json');
			grunt.task.run('copy:images');
		} else {
			if (mode === 'bower') {
				grunt.task.run('copy:bower');
			} else if (mode === 'assetversion-css') {
				grunt.task.run('copy:cssVersioning');
			} else if (mode === 'assetversion-css-prod') {
				grunt.task.run('copy:cssVersioningProd');
			} else if (mode === 'assetversion-js') {
				grunt.task.run('copy:jsVersioning');
			} else if (mode === 'assetversion-js-prod') {
				grunt.task.run('copy:jsVersioningProd');
			} else {
				grunt.task.run('copy:fontProd');
				grunt.task.run('copy:jsonProd');
				grunt.task.run('copy:imagesProd');
			}
		}
	});

	/**
	 * Extend the copy-files task
	 *
	 */
	grunt.extendConfig({
		copy: {
			// Bower related copies
			bower: {
				files: [
					{
						expand: true,
						flatten: false,
						cwd: skeletonConfig.bower.tempDir,
						src: ['**/*.js', '!**/modernizr/feature-detects/**', '!**/tests/**', '!**/test/**'],
						dest: source + 'js/',
						filter: 'isFile',
						rename: function (dest, src) {
							var path = src.split('/'),
								l = path.length,
								dir = path.slice(0, l - 2).join('/') + '/',
								fileName = path[l - 2];
							return dest + dir + fileName + '.js';
						}
					}
				]
			},

			// SVG sprite generation related copies
			svgsprite: {
				files: [
					{
						expand: true,
						flatten: true,
						cwd: source + 'i/sprite/',
						src: ['sprite-app.svg'],
						dest: build + imagesDir + 'sprite/',
						filter: 'isFile'
					}
				]
			},

			// Font related copies
			font: {
				files: [
					{
						expand: true,
						flatten: true,
						cwd: source + 'font/icon',
						src: ['*.eot', '*.svg', '*.svgz', '*.ttf', '*.woff'],
						dest: temp + fontDir + 'icon/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: true,
						cwd: source + 'font/typo',
						src: ['*.eot', '*.svg', '*.svgz', '*.ttf', '*.woff'],
						dest: temp + fontDir + 'typo/',
						filter: 'isFile'
					}
				]

			},
			fontProd: {
				files: [
					{
						expand: true,
						flatten: true,
						cwd: source + 'font/icon',
						src: ['*.eot', '*.svg', '*.svgz', '*.ttf', '*.woff', '*.woff2'],
						dest: build + fontDir + 'icon/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: true,
						cwd: source + 'font/typo',
						src: ['*.eot', '*.svg', '*.svgz', '*.ttf', '*.woff', '*.woff2'],
						dest: build + fontDir + 'typo/',
						filter: 'isFile'
					}
				]
			},

			// JS related copies
			js: {
				files: [
					{
						expand: true,
						flatten: true,
						cwd: source + 'js/',
						src: ['lib/standalone/*.js', 'plugin/standalone/*.js', 'util/standalone/*.js', 'module/standalone/*.js'],
						dest: temp + jsDir,
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: false,
						cwd: source + 'js/module/require-module/',
						src: ['**/*.js'],
						dest: temp + jsDir + requireDir,
						filter: 'isFile'
					}
				]
			},
			jsProd: {
				files: [
					{
						expand: true,
						flatten: true,
						cwd: source + 'js/',
						src: ['lib/standalone/*.js', 'plugin/standalone/*.js', 'util/standalone/*.js', 'module/standalone/*.js'],
						dest: build + jsDir + jsLibDir,
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: false,
						cwd: source + 'js/module/require-module/',
						src: ['**/*.js'],
						dest: build + jsDir + requireDir,
						filter: 'isFile'
					}
				]
			},

			// JSON related copies
			json: {
				files: [
					{
						expand: true,
						flatten: true,
						cwd: source + 'json/',
						src: ['**/*.json'],
						dest: temp + jsDir + 'json/',
						filter: 'isFile'
					}
				]
			},
			jsonProd: {
				files: [
					{
						expand: true,
						flatten: true,
						cwd: source + 'json/',
						src: ['**/*.json'],
						dest: build + jsDir + 'json/',
						filter: 'isFile'
					}
				]
			},

			// Image related copies
			images: {
				files: [
					{
						expand: true,
						flatten: false,
						cwd: source + 'i/',
						src: ['**/*.jpg', '**/*.ico', '**/*.png', '**/*.gif', '**/*.svg', '**/*.svgz', '!**/source/**'],
						dest: temp + imagesDir
					}
				]
			},
			imagesProd: {
				files: [
					{
						expand: true,
						flatten: false,
						cwd: source + 'i/',
						src: ['**/*.jpg', '**/*.ico', '**/*.png', '**/*.gif', '**/*.svg', '**/*.svgz', '!**/source/**'],
						dest: build + imagesDir
					}
				]
			},

			// Karma (unit-test) related copies
			karmaFixtures: {
				files: [
					{
						expand: true,
						flatten: false,
						cwd: staticHtml + 'fixtures/',
						src: ['*.html'],
						dest: tests + 'testfixtures/'
					}
				]
			},

			// Handlebar related copies
			handlebars: {
				files: [
					{
						expand: true,
						flatten: false,
						cwd: staticHtml + 'handlebars/',
						src: ['*.html'],
						dest: handlebars
					}
				]
			},

			// Delete .jstemp directory (needed for Google Closure compile)
			closureTemp: {
				files: [
					{
						expand: true,
						flatten: true,
						cwd: build + jsDir + jsLibDir,
						src: ['*.js'],
						dest: build + jsDir + jsLibDir + jsTemp,
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: true,
						cwd: build + jsDir,
						src: ['*.js'],
						dest: build + jsDir + jsTemp,
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: false,
						cwd: build + jsDir + requireDir,
						src: ['**/*.js'],
						dest: build + jsDir + 'module/' + jsTemp,
						filter: 'isFile'
					}
				]
			},

			// Version the main css file (with the date of today)
			cssVersioning: {
				src: temp + 'css/app.css',
				dest: temp + 'css/app.<%= grunt.template.today("yyyymmdd") %>.css'
			},
			cssVersioningProd: {
				src: build + 'css/app.css',
				dest: build + 'css/app.<%= grunt.template.today("yyyymmdd") %>.css'
			},

			// Version the main javascript file (with the date of today)
			jsVersioning: {
				src: temp + 'js/app.min.js',
				dest: temp + 'js/app.<%= grunt.template.today("yyyymmdd") %>.js'
			},
			jsVersioningProd: {
				src: build + 'js/app.min.js',
				dest: build + 'js/app.<%= grunt.template.today("yyyymmdd") %>.js'
			}
		}
	});

};