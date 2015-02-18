define('module/sample', function () {

	return function Sample() {

		function init() {
			console.log('Sample init');
		}

		return {
			init: init
		};

	};

});