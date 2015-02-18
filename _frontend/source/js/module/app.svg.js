/**
 * SVG handling class
 *
 * @namespace APP
 * @name APP.Svg
 */
APP.Svg = (/** @lends APP.Svg */function () {
	var exports,
		$body,
		settings = {
			svgUrl: '{{ASSET_PREFIX}}i/sprite/sprite-app.svg'
		};

	/**
	 * Initialize SVG handling
	 */
	function init() {
		initDOMElements();
		loadSvg();
	}

	/**
	 * Init DOM elements
	 */
	function initDOMElements() {
		$body = APP.Performance.getCachedDOM().$body;
	}

	/**
	 * Loads SVG sprite via ajax
	 * @returns {Object} jQuery promise
	 */
	function loadSvg() {
		var $promise = $.ajax({
			type: 'GET',
			url: settings.svgUrl,
			dataType: 'html',
			contentType: 'application/json; charset=utf-8'
		});

		$.when($promise).then(function (result) {
			addSpriteToDOM(result);
		});

	}

	/**
	 * Add SVG sprite to DOM
	 *
	 * @param sprite
	 */
	function addSpriteToDOM(sprite) {
		$body.find('[data-svgsprite]').remove();
		$body.append('<div class="block--display-none" data-svgsprite>' + sprite + '</div>');
	}

	exports = {
		init: init
	};

	/* test-code */
	exports.__testonly__ = {};
	/* end-test-code */

	return exports;

})();

