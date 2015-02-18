/**
 * Global main namespace for the application
 *
 * Entry point of the application
 * @namespace APP
 */

var APP = APP || function () {};

/**
 * Main application class
 *
 * @namespace APP
 * @name APP.Main
 */
APP.Main = (/** @lends APP.Main */function () {

	var exports,
		instance;

	/**
	 * Initialize application and needed subclasses
	 * @public
	 */
	function init() {
		APP.Performance.init();
		APP.Svg.init();
	}

	exports = {
		/**
		 * Get singleton APP.Main instance
		 *
		 * @public
		 * @memberof APP.Main
		 * @returns {APP.Main}
		 */
		getInstance: function () {

			if (!instance) {
				instance = init();
			}

			return instance;
		}
	};

	/* test-code */
	exports.__testonly__ = {};
	/* end-test-code */

	return exports;

}());