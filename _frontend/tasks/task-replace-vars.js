module.exports = function (grunt) {
	'use strict';

	var skeletonConfig = grunt.file.readJSON('skeleton-config.json'),
		build = skeletonConfig.directories.build,
		temp = skeletonConfig.directories.temp,
		source = skeletonConfig.directories.source,
		staticHtml = skeletonConfig.directories.staticHtml,
		webroot = skeletonConfig.directories.webroot;


	/**
	 * Replace variables task registration: 'replace-vars'
	 * Use '{{ASSET_PREFIX}} for replacement if you need the
	 * asset directory to be set
	 *
	 */
	grunt.registerTask('replace-vars', 'Replace asset prefixes, variables in javascript, json files', function (mode) {
		if (arguments.length === 0) {
			grunt.task.run('replace:assetPrefix');
			grunt.task.run('replace:mediaPrefix');
		} else {
			if (mode === 'asset') {
				grunt.task.run('replace:assetVersioning');
			} else {
				grunt.task.run('replace:assetPrefixProd');
				grunt.task.run('replace:mediaPrefixProd');
				grunt.task.run('replace:handlebars');
			}
		}
	});

	/**
	 * Extend the main task
	 *
	 */
	grunt.extendConfig({
		replace: {
			options: {
				processTemplates: true
			},

			// Asset prefix replacements
			assetPrefix: {
				src: [temp + 'js/**/*.js', temp + 'js/json/*.json'],
				overwrite: true,
				replacements: [
					{
						from: /\{\{ASSET_PREFIX\}\}/g,
						to: '/temp/'
					}
				]
			},
			assetPrefixProd: {
				src: [build + 'js/**/*.js', build + 'js/**/*.js', build + 'js/json/*.json'],
				overwrite: true,
				replacements: [
					{
						from: /\{\{ASSET_PREFIX\}\}/g,
						to: webroot
					}
				]
			},

			// Asset versioning in templates
			assetVersioning: {
				src: [build + '*.aspx', build + '*.tpl'],
				overwrite: true,
				replacements: [
					{
						from: /\{\{ASSET_VERSION\}\}/g,
						to: grunt.template.today('yyyymmdd')
					}
				]
			},

			// Media prefix replacements (this means JSON!!!)
			mediaPrefix: {
				src: [temp + 'js/**/*.js', temp + 'js/json/*.json'],
				overwrite: true,
				replacements: [
					{
						from: /\{\{MEDIA_PREFIX\}\}/g,
						to: '/temp/'
					}
				]
			},
			mediaPrefixProd: {
				src: [build + 'js/**/*.js', build + 'js/**/*.js', build + 'js/json/*.json'],
				overwrite: true,
				replacements: [
					{
						from: /\{\{MEDIA_PREFIX\}\}/g,
						to: webroot
					}
				]
			},

			// SVG related replacements
			svgFill: {
				src: [source + 'i/sprite/source/svg/minified/nofill/**/*.svg'],
				overwrite: true,
				replacements: [
					{
						from: /(fill)="[^"]+"/ig,
						to: ''
					}
				]
			},

			// Handlebar replacement
			handlebars: {
				src: staticHtml + '*.html',
				overwrite: true,
				options: {
					processTemplates: false
				},
				replacements: [
					{
						from: /\{\{HANDLEBAR_TEMPLATES\}\}/g,
						to: function () {
							grunt.file.defaultEncoding = 'utf8';
							return grunt.file.read(staticHtml + 'handlebars.html');
						}
					}
				]
			}
		}
	});

};
