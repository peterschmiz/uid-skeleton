module.exports = function (config) {
	'use strict';

	var fs = require('fs'),
		file,
		skeletonConfig,
		source,
		tests, configUrlTest;

	configUrlTest = fs.existsSync('../skeleton-config.json');

	file = fs.readFileSync(configUrlTest ? '../skeleton-config.json' : 'skeleton-config.json').toString();

	skeletonConfig = JSON.parse(file);
	source = skeletonConfig.directories.source;
	tests = skeletonConfig.directories.tests;

	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '../',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: [ tests + 'testlibs/jquery.js',
				tests + 'testlibs/modernizr.js',
				tests + 'testlibs/handlebars.js',
				tests + 'testlibs/jasmine-jquery.js',
				tests + 'testlibs/mock-ajax.js',
				source + 'js/module/app.js',
				source + 'js/module/app.*.js',
				tests + 'testcases/**/*.js',
				tests + 'testfixtures/**/*.html'
		],

		// list of files to exclude
		exclude: [],

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'coverage'],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'**/js/module/*.js': ['coverage']
		},

		// set the coverage directory
		coverageReporter: {
			type: 'html',
			dir: 'coverage',
			subdir: '.'
		},

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS'],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false

	});

};
