module.exports = function (grunt) {
	'use strict';

	/**
	 * Run JS compile (concat, copy & minify)
	 * NOTE: minify only applies to the build files!
	 *
	 */
	grunt.registerTask('js-compile', 'Compile (concat, copy, minify) javascript files', function (mode) {
		if (arguments.length === 0) {
			grunt.task.run('check-js-syntax:1');
			grunt.task.run('js-concat');
			grunt.task.run('copy:js');
			grunt.task.run('copy:json');
			grunt.task.run('replace-vars');
		} else {
			grunt.task.run('check-js-syntax');
			if (mode === 'build') {
				grunt.task.run('copy:jsProd');
				grunt.task.run('js-concat:prod');
				grunt.task.run('replace-vars:prod');
				grunt.task.run('pre-js-minify');
				grunt.task.run('js-minify');
				grunt.task.run('post-js-minify');
				grunt.task.run('clean:doc');
				grunt.task.run('jsdoc');
			} else {
				grunt.task.run('copy:jsProd');
				grunt.task.run('js-concat:prod');
				grunt.task.run('replace-vars:prod');
				grunt.task.run('pre-js-minify');
				grunt.task.run('js-minify');
				grunt.task.run('post-js-minify');
			}
		}
	});

};
