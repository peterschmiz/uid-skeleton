/**
 * Performance increase module (cache, device optimizations)
 *
 * @namespace APP
 * @name APP.Performance
 */
APP.Performance = (/** @lends APP.Performance */function () {

	var exports,
		$cachedDOM,
		windowResize,
		deviceProperties;

	/**
	 * Init performance helpers
	 *
	 */
	function init() {
		try {
			initCacheDOM();
			initBindings();
			saveDeviceProperties();
		} catch (e) {
			throw new ReferenceError('APP.Performance cannot be initialized!');
		}
	}

	/**
	 * Cache DOM elements
	 */
	function initCacheDOM() {

		$cachedDOM = {
			window: window,
			$window: $(window),
			$body: $(document.body),
			$html: $('html'),
			$head: $('head')
		};

	}

	function initBindings() {
		$cachedDOM.$window.on('resize', resizeWindow);
	}

	/**
	 * Window resize hook, calls scale carousel method
	 */
	function resizeWindow() {
		clearTimeout(windowResize);

		windowResize = setTimeout(function () {
			saveDeviceProperties();
		}, 200);

	}

	/**
	 * Save device properties to an object
	 */
	function saveDeviceProperties() {
		var w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			W = w.innerWidth || e.clientWidth || g.clientWidth,
			H = w.innerHeight || e.clientHeight || g.clientHeight;

		deviceProperties = {
			connection: navigator.connection ? navigator.connection : 'unknown',
			pixelRatio: window.devicePixelRatio,
			window: {
				width: W,
				height: H
			}
		};

	}

	/**
	 * Return cached DOM elements
	 *
	 * @returns {*}
	 */
	function getCachedDOM() {
		return $cachedDOM;
	}

	/**
	 * Return saved device properties
	 *
	 * @returns {*}
	 */
	function getDeviceProperties() {
		return deviceProperties;
	}

	exports = {
		init: init,
		initCacheDOM: initCacheDOM,
		getCachedDOM: getCachedDOM,
		getDeviceProperties: getDeviceProperties
	};

	/* test-code */
	exports.__testonly__ = {
		init: init,
		initCacheDOM: initCacheDOM,
		saveDeviceProperties: saveDeviceProperties,
		getCachedDOM: getCachedDOM,
		getDeviceProperties: getDeviceProperties
	};

	/* end-test-code */

	return exports;

}());
