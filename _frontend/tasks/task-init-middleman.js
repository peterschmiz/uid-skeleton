module.exports = function (grunt) {
	'use strict';

	var moment = require('moment'),
		dateformat = 'YYYY-MM-DD HH:mm:ss',
		skeletonConfig = grunt.file.readJSON('skeleton-config.json'),
		middleman = skeletonConfig.middleman;

	grunt.createConfigInfo = function () {
		var content = createGroupTitle('Auto-generated Middleman configuration file', false, true);
		content += createGroupTitle('Generated: ' + moment.utc().zone('+0200').format(dateformat), false, true);
		return content;
	};

	grunt.createTemplateSettings = function () {
		var content = createGroupTitle('Template settings', false, true);
		content += setRubyVariable('template_engine', middleman.templateMode.engine, 0, 1);

		if (middleman.templateMode.engine === 'erb') {
			content += createGroupTitle('Set ERB trim mode', true);
			content += setRubyVariable('erb', '::trim => \'' + middleman.templateMode.erbSettings.trimMode + '\'', 0, 1);
		} else if (middleman.templateMode.engine === 'haml') {
			content += createGroupTitle('Set HAML config', true);
			content += 'set :haml, { :ugly => false, :attr_wrapper => \'"\', :format => :html5 }\n\n';
		}

		content += createGroupTitle('Source directory', true);
		content += 'if development?\n';
		content += setRubyVariable('source', skeletonConfig.directories.source.replace('/', ''), 1);
		content += setRubyVariable('partials_dir', ':template_engine', 1);
		content += 'else\n';
		content += setRubyVariable('source', [skeletonConfig.directories.source, ':template_engine'], 1);
		content += 'end\n\n';

		content += createGroupTitle('Layout directory', true);
		content += 'if development?\n';
		content += setRubyVariable('layouts_dir', [':template_engine', '/layouts'], 1);
		content += 'end\n\n';

		content += createGroupTitle('Build directory', true);
		content += setRubyVariable('build_dir', skeletonConfig.directories.staticHtml.replace('/', ''), 0);

		return content;
	};

	grunt.createIgnore = function () {
		var content = createGroupTitle('Ignore directories', true);
		Object.keys(middleman.ignore).forEach(function (key) {
			content += 'ignore \'' + middleman.ignore[key] + '\'\n';
		});

		content += '\n';
		content += 'if !development?\n';
		content += '\tignore \'erb/*\'\n';
		content += '\tignore \'haml/*\'\n';
		content += '\tignore \'temp/*\'\n';
		content += 'end\n';

		return content;
	};

	grunt.createAssetPrefixes = function () {
		var content = createGroupTitle('Asset prefixes', true);
		content += 'if development?\n';
		content += '\tasset_prefix = \'/temp/\'\n';
		content += '\tlink_prefix = \'\'\n';
		content += 'else\n';
		content += '\tasset_prefix = \'\'\n';
		content += '\tlink_prefix = \'/_frontend/' + skeletonConfig.directories.staticHtml + '\'\n';
		content += 'end\n\n';
		content += createGroupTitle('Asset directories', true);

		Object.keys(middleman.assetDirectories).forEach(function (key) {
			content += setRubyVariable(key, [':asset_prefix', middleman.assetDirectories[key]]);
		});

		content += setRubyVariable('url_prefix', ['', ':asset_prefix']);
		content += setRubyVariable('link_prefix', ['/', ':link_prefix']);
		content += '\n';

		content += 'if !development?\n';
		content += setRubyVariable('url_prefix', '/', 1);
		content += 'end\n\n';

		content += createGroupTitle('Template directory', true);
		content += 'template_directory = template_engine\n';

		return content;
	};

	grunt.createRackSettings = function () {
		var content = createGroupTitle('Rack settings', false);

		content += createGroupTitle('Include rewrite module', true);
		content += 'require \'rack/rewrite\'\n\n';

		content += createGroupTitle('Rewrite rules', true);
		content += 'if development?\n';
		content += grunt.file.read('ruby/modules/skeleton-rewrite.rb', 'r') + '\n';
		content += 'end\n\n';

		content += createGroupTitle('Rewrite content types based on file extensions', true);
		content += grunt.file.read('ruby/modules//skeleton-rewrite-content-type.rb', 'r') + '\n\n';

		content += createGroupTitle('Rewrite content-encoding types based on file extensions', true);
		content += grunt.file.read('ruby/modules//skeleton-rewrite-encoding.rb', 'r') + '\n\n';

		Object.keys(middleman.rewrite).forEach(function (key) {
			content += 'use RewriteEncoding, {"' + key + '" => "' + middleman.rewrite[key] + '"}\n';
		});

		content += '\n';
		content += grunt.file.read('ruby/modules//skeleton-embed-svg.rb', 'r') + '\n\n';

		return content;
	};

	grunt.createLayoutSettings = function () {
		var content = createGroupTitle('Layout settings');

		content += createGroupTitle('Set <html> attributes', true);
		Object.keys(middleman.layoutSettings).forEach(function (key) {
			content += setRubyVariable(key, middleman.layoutSettings[key]);
		});
		content += '\n';
		content += '\n';

		content += createGroupTitle('IE related settings');

		content += createGroupTitle('Is old (< IE 10) supported', true);
		content += setRubyVariable('old_ie_support', middleman.ieSettings.oldIeSupport);
		content += '\n';

		content += createGroupTitle('Old IE support classes', true);
		content += setRubyVariable('ie_support_classes', middleman.ieSettings.supportClasses, 0, 0, true);
		content += '\n';

		return content;
	};

	grunt.createBasicPageSettings = function () {
		var content = createGroupTitle('Basic page settings');
		Object.keys(middleman.pageSettings).forEach(function (key) {
			content += setRubyVariable(key, middleman.pageSettings[key]);
		});
		return content;
	};

	grunt.createAppleSettings = function () {
		var content = createGroupTitle('Apple related settings');
		content += createGroupTitle('Apple extensions', true);
		content += setRubyVariable('enable_apple_extensions', middleman.appleExtensions.enabled);
		content += createGroupTitle('Touch icon sizes', true);
		content += setRubyVariable('touch_icons', middleman.appleExtensions.touchIcons, 0, 0, true);
		content += '\n';

		return content;
	};

	grunt.createMSSettings = function () {
		var content = createGroupTitle('MS related settings');
		content += createGroupTitle('MS extensions', true);
		content += setRubyVariable('enable_ms_extensions', middleman.msExtensions.enabled);
		return content;
	};

	grunt.createFBSettings = function () {
		var content = createGroupTitle('Facebook related settings');
		content += createGroupTitle('FB extensions', true);
		content += setRubyVariable('enable_fb_extensions', middleman.fbExtensions.enabled);
		content += createGroupTitle('Open Graph meta tags', true);
		content += setRubyVariable('og_tags', middleman.fbExtensions.ogTags, 0, 0, true);
		content += '\n';
		return content;
	};

	grunt.createTwitterSettings = function () {
		var content = createGroupTitle('Twitter related settings');
		content += createGroupTitle('Twitter extensions', true);
		content += setRubyVariable('enable_twitter_extensions', middleman.twitterExtensions.enabled);
		content += createGroupTitle('Twitter card tags', true);
		content += setRubyVariable('twitter_tags', middleman.twitterExtensions.twitterTags, 0, 0, true);
		content += '\n';
		return content;
	};

	grunt.createStyleSheetSettings = function () {
		var content = createGroupTitle('Stylesheet settings');
		content += createGroupTitle('Style settings', true);
		content += setRubyVariable('ie_style_enabled', middleman.styleSettings.ieStyleEnabled);
		content += setRubyVariable('additional_styles_enabled', middleman.styleSettings.additionalStylesEnabled);
		content += setRubyVariable('additional_styles', middleman.styleSettings.additionalStyles, 0, 0, true);
		content += setRubyVariable('app_style', middleman.styleSettings.appStyle);
		content += setRubyVariable('app_ie_style', middleman.styleSettings.appIeStyle);
		content += setRubyVariable('font_style', middleman.styleSettings.fontStyle);
		content += '\n';
		return content;
	};

	grunt.createJavascriptSettings = function () {
		var content = createGroupTitle('Javascript settings');
		content += createGroupTitle('Javascript enabled', true);
		content += setRubyVariable('enable_scripts', middleman.javascriptSettings.enabled);
		content += '\n';

		content += createGroupTitle('Single library URLs', true);
		Object.keys(middleman.javascriptSettings.singleLibraries).forEach(function (key) {
			content += setRubyVariable(key, middleman.javascriptSettings.singleLibraries[key]);
		});
		content += '\n';

		content += createGroupTitle('Library URLs', true);
		Object.keys(middleman.javascriptSettings.libraryUrls).forEach(function (key) {
			content += setRubyVariable(key, middleman.javascriptSettings.libraryUrls[key]);
		});
		content += '\n';

		content += createGroupTitle('Page script names', true);
		Object.keys(middleman.javascriptSettings.pageScriptNames).forEach(function (key) {
			content += setRubyVariable(key, middleman.javascriptSettings.pageScriptNames[key]);
		});
		content += '\n';

		content += setRubyVariable('script_url', ':js_dir', 0, 1);
		content += 'if !development?\n';
		content += setRubyVariable('script_url', ['/', ':js_dir'], 1);
		content += 'end\n\n';

		content += setRubyVariable('head_scripts', middleman.javascriptSettings.headScripts, 0, 0, true, true);
		content += setRubyVariable('page_scripts', middleman.javascriptSettings.pageScripts, 0, 0, true, false);
		content += '\n';

		content += createGroupTitle('Require JS settings', true);
		Object.keys(middleman.javascriptSettings.requireJsSettings).forEach(function (key) {
			content += setRubyVariable(key, middleman.javascriptSettings.requireJsSettings[key]);
		});
		content += '\n';

		content += setRubyVariable('require_config_paths', middleman.javascriptSettings.requireConfig, 0, 0, true);
		content += '\n';

		return content;
	};

	grunt.createMiddlemanDevelopmentSettings = function () {
		var content = createGroupTitle('Page configurations'),
			minifyActive,
			liveReloadActive;

		content += 'page template_engine + \'/handlebars.html\', :layout => false\n';
		content += 'page \'handlebars.html\', :layout => false\n';
		content += '\n';

		content += createGroupTitle('Build configurations');

		content += createGroupTitle('Build configurations', true);
		content += 'configure :build do\n';

		Object.keys(middleman.developmentSettings.build.activate).forEach(function (key) {
			if (parseInt(middleman.developmentSettings.build.activate[key], 10) === 1) {
				minifyActive = key === 'minify_html';

				if (minifyActive === true) {
					Object.keys(middleman.developmentSettings.build.minifyHtmlConfig).forEach(function (vkey) {
						content += ', ' + middleman.developmentSettings.build.minifyHtmlConfig[vkey];
					});
				}

				content += '\tactivate :' + key + '\n';
			}
		});

		content += 'end\n';
		content += '\n';

		content += createGroupTitle('Server configurations', true);
		content += 'configure :development do\n';

		Object.keys(middleman.developmentSettings.development.activate).forEach(function (key) {
			if (parseInt(middleman.developmentSettings.development.activate[key], 10) === 1) {
				liveReloadActive = false;
				minifyActive = false;

				if (key === 'livereload') {
					liveReloadActive = true;
				}
				if (key === 'minify_html') {
					minifyActive = true;
				}

				content += '\tactivate :' + key;

				if (liveReloadActive === true) {
					Object.keys(middleman.developmentSettings.development.liveReloadConfig).forEach(function (vkey) {
						content += ', ' + middleman.developmentSettings.development.liveReloadConfig[vkey];
					});
				}

				if (minifyActive === true) {
					Object.keys(middleman.developmentSettings.development.minifyHtmlConfig).forEach(function (vkey) {
						content += ', ' + middleman.developmentSettings.development.minifyHtmlConfig[vkey];
					});
				}

				content += '\n';

			}
		});

		content += 'end\n';
		content += '\n';

		return content;
	};

	function setRubyVariable(name, value, tabs, newlines, asObject, asArray) {
		var variable = '', i = 0, separator, prefix;
		if (typeof value === 'object' && !Array.isArray(value)) {
			variable = 'set :' + name + ', ';
			Object.keys(value).forEach(function (key) {
				variable += ':' + key + ' => ' + value[key] + ', ';
			});
			variable = variable.substring(0, variable.length - 2) + '\n';
		} else {
			if (Array.isArray(value)) {
				variable = 'set :' + name + ', ';
				separator = ' + ';
				prefix = '';
				if (asObject === true) {
					variable += asArray ? '[\n' : '{\n';
					separator = ',\n';
					prefix = '\t';
				}
				for (i = 0; i < value.length; i++) {
					if (value[i][0] === ':') {
						variable += prefix + value[i].substring(1);
					} else {
						variable += prefix + '\'' + value[i] + '\'';
					}
					if (i < value.length - 1) {
						variable += separator;
					} else {
						variable += '\n';
					}
				}
				if (asObject === true) {
					variable += asArray ? ']\n' : '}\n';
				}
			} else {
				if (value[0] === ':') {
					variable = 'set :' + name + ', ' + value.substring(1) + '\n';
				} else {
					if (isNaN(value)) {
						variable = 'set :' + name + ', \'' + value + '\'\n';
					} else {
						variable = 'set :' + name + ', ' + parseInt(value, 10) + '\n';
					}
				}
			}
		}

		for (i = 0; i < tabs; i++) {
			variable = '\t' + variable;
		}

		for (i = 0; i < newlines; i++) {
			variable += '\n';
		}

		return variable;
	}

	function createGroupTitle(title, isSub, noExtraBreak) {
		var content = '';

		if (isSub === true) {
			content = '# ' + title + '\n';
		} else {
			content = '### ' + title + ' ###\n' + (noExtraBreak === true ? '' : '\n');
		}

		return content;
	}

	function createConfigFile(filename) {
		var fs = require('fs'), file,
			content = '',
			generators = [
				'createConfigInfo',
				'createTemplateSettings',
				'createIgnore',
				'createAssetPrefixes',
				'createRackSettings',
				'createLayoutSettings',
				'createBasicPageSettings',
				'createAppleSettings',
				'createMSSettings',
				'createFBSettings',
				'createTwitterSettings',
				'createStyleSheetSettings',
				'createJavascriptSettings',
				'createMiddlemanDevelopmentSettings'
			];

		file = fs.openSync(filename, 'w');

		generators.forEach(function (obj) {
			if (typeof grunt[obj] === 'function') {
				content += grunt[obj].call(this) + '\n';
			}
		});

		fs.writeSync(file, content, 0);
		fs.closeSync(file);
	}

	grunt.registerTask('init-middleman', 'Create Middleman config file (config.rb)', function () {
		createConfigFile('config.rb');
	});

};