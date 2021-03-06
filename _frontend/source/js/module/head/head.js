/**
 * Global main namespace for the application
 *
 * Entry point of the application
 * @namespace APP
 */

var APP = APP || function() {};


/**
 * Main application class
 *
 * @namespace APP
 * @name APP.Head
 */
APP.Head = (/** @lends APP.Head */function () {

	var instance,
		fontConfig = {
			custom: {
				families: ['helvetica-neue-regular', 'helvetica-neue-bold', 'helvetica-neue-light', 'helvetica-neue-medium'],
				urls: ['{{ASSET_PREFIX}}css/font.css']
			}
		};

	/**
	 * Initialize application and needed subclasses
	 * @public
	 */
	function init() {
		loadWebFonts();
	}

	/**
	 * Initialize Google Webfont loader
	 * @private
	 */
	function loadWebFonts() {
		WebFont.load(fontConfig);
	}

	return {

		/**
		 * Get singleton APP.Head instance
		 *
		 * @public
		 * @memberof APP.Head
		 * @returns {APP.Head}
		 */
		getInstance: function () {

			if (!instance) {
				instance = init();
			}

			return instance;
		}

	};

}());