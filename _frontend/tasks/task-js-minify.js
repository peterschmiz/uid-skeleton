module.exports = function (grunt) {
	'use strict';

	var skeletonConfig = grunt.file.readJSON('skeleton-config.json'),
		build = skeletonConfig.directories.build,
		isOSx = /^darwin/.test(process.platform),
		jsDir = skeletonConfig.directories.buildJs,
		jsLibDir = skeletonConfig.directories.buildStandaloneJs,
		jsTemp = skeletonConfig.directories.jstemp,
		scriptNaming = skeletonConfig.scripts.naming,
		sh,
		tools = skeletonConfig.directories.tools;

	if (isOSx) {
		sh = require('execSync');
	}

	/**
	 * Run OSx file ending bug fix
	 *
	 */
	function correctIosBug() {
		var src = [build + jsDir + '**/*.js'];

		grunt.file.expand({filter: 'isFile'}, src).forEach(function (src) {
			removeOsxFileEndings(src);
		});
	}

	/**
	 * Remove strange file ending magic character
	 * Cause not known...
	 *
	 */
	function removeOsxFileEndings(file) {
		sh.run('cat ' + file + ' | tr -d "\\000\"  > ' + file + '.valid');
		sh.run('mv ' + file + '.valid ' + file);
	}

	/**
	 * Run pre tasks for minify
	 */
	grunt.registerTask('pre-js-minify', 'Minify (w Google Closure) javascript files', function () {
		var done = this.async();
		grunt.task.run('copy:closureTemp');
		done();
	});

	/**
	 * Run post tasks for minify
	 */
	grunt.registerTask('post-js-minify', 'Minify (w Google Closure) javascript files', function () {
		var done = this.async();
		grunt.task.run('clean-files:jstemp');
		done();
	});

	/**
	 * Run JS minify with Google Closure
	 * NOTE: minify only applies to the build files!
	 *
	 */
	grunt.registerTask('js-minify', 'Minify (w Google Closure) javascript files', function () {

		if (grunt.file.exists(build + jsDir + jsTemp + scriptNaming.head)) {
			grunt.task.run('closureCompiler:head');
		}
		if (grunt.file.exists(build + jsDir + jsTemp + scriptNaming.app)) {
			grunt.task.run('closureCompiler:app');
		}
		if (grunt.file.exists(build + jsDir + jsTemp + scriptNaming.plugin)) {
			grunt.task.run('closureCompiler:plugin');
		}
		if (grunt.file.expand({filter: 'isFile'}, [build + jsDir + 'module/**/*.js']).length) {
			grunt.task.run('closureCompiler:require');
		}

		if (grunt.file.expand({filter: 'isFile'}, [build + jsDir + jsLibDir + jsTemp + '**/*.js']).length) {
			grunt.task.run('closureCompiler:standalone');
		}

		if (isOSx) {
			correctIosBug();
		}

	});

	/**
	 * Extend the main task
	 *
	 */
	grunt.extendConfig({
		closureCompiler: {
			options: {
				compilerFile: tools + 'compiler.jar',
				checkModified: false,
				compilerOpts: {
					'compilation_level': 'SIMPLE_OPTIMIZATIONS',
					'warning_level': 'quiet',
					'jscomp_off': ['checkTypes', 'fileoverviewTags'],
					'language_in': 'ECMASCRIPT5'
				}
			},
			head: {
				src: build + jsDir + jsTemp + scriptNaming.head,
				dest: build + jsDir + scriptNaming.head
			},
			app: {
				src: build + jsDir + jsTemp + scriptNaming.app,
				dest: build + jsDir + scriptNaming.app
			},
			require: {
				files: [
					{
						expand: true,
						flatten: false,
						cwd: build + jsDir + 'module/' + jsTemp,
						src: ['**/*.js'],
						dest: build + jsDir + 'module/',
						ext: '.js',
						filter: 'isFile'
					}
				]
			},
			standalone: {
				files: [
					{
						expand: true,
						flatten: false,
						cwd: build + jsDir + jsLibDir + jsTemp,
						src: ['*.js'],
						dest: build + jsDir + jsLibDir,
						filter: function (src) {
							var regExp1,
								regExp2,
								regExp3,
								regExp1Val = null,
								regExp2Val = null,
								regExp3Val = null,
								retVal = false;

							if (scriptNaming.head !== undefined) {
								regExp1 = new RegExp(scriptNaming.head, 'g');
								regExp1Val = src.match(regExp1);
							}
							if (scriptNaming.app !== undefined) {
								regExp2 = new RegExp(scriptNaming.app, 'g');
								regExp2Val = src.match(regExp2);
							}
							if (scriptNaming.plugin !== undefined) {
								regExp3 = new RegExp(scriptNaming.plugin, 'g');
								regExp3Val = src.match(regExp3);
							}

							if (regExp1Val === null &&
								regExp2Val === null &&
								regExp3Val === null) {
								retVal = true;
							}

							return retVal;
						}
					}
				]
			},
			plugin: {
				src: build + jsDir + jsTemp + scriptNaming.plugin,
				dest: build + jsDir + scriptNaming.plugin
			}
		}
	});

};