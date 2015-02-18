var APP = APP || function () {};

APP.TestExample = (function () {

	var exports;

	function addNumbers(numberOne, numberTwo) {
		return numberOne + numberTwo;
	}

	function addClass($elem) {
		$elem.addClass('test-class');
	}

	exports = {};

	/* test-code */
	exports.__testonly__ = {
		addNumbers: addNumbers,
		addClass: addClass
	};
	/* end-test-code */

	return exports;

}());