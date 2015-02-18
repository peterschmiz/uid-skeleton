// custom logger
(function () {
	window.log = function (message) {
		var msgLength = message.length + 2,
			decorator = '=',
			msgWidth = 40,
			composedMsg = '',
			isInserted = false,
			i = 0;

		for (i; i < msgWidth; i++) {
			if (i < parseInt(msgWidth - msgLength, 10) / 2 || i > parseInt((msgWidth - msgLength) / 2, 10) + msgLength) {
				composedMsg += decorator;
			} else {
				if (!isInserted) {
					composedMsg += ' ' + message + ' ';
					isInserted = true;
				}
			}
		}

		if (composedMsg.length < msgWidth) {
			composedMsg += decorator;
		}

		try {
			console.log(composedMsg);
		} catch (e) {
			console.warn(e);
		}

	};
}());

// console.time implementation for IE
(function () {
	if (window.console && window.console.time === undefined) {
		console.time = function (name, reset) {
			var time, key;
			if (!name) {
				return;
			}
			time = new Date().getTime();
			if (!console.timeCounters) {
				console.timeCounters = {};
			}
			key = 'KEY' + name.toString();
			if (!reset && console.timeCounters[key]) {
				return;
			}
			console.timeCounters[key] = time;
		};

		console.timeEnd = function (name) {
			var time = new Date().getTime(),
				key = 'KEY' + name.toString(),
				timeCounter = console.timeCounters[key],
				diff = false,
				label;

			if (!console.timeCounters) {
				return diff;
			}

			if (timeCounter) {
				diff = time - timeCounter;
				label = name + ': ' + diff + 'ms';
				console.info(label);
				delete console.timeCounters[key];
			}
			return diff;
		};
	}
}());

// get viewport helper
(function () {
	if (window.getViewport === undefined) {
		window.getViewport = function () {
			var e = window,
				a = 'inner';

			if (window.innerWidth === undefined) {
				a = 'client';
				e = document.documentElement || document.body;
			}

			return {
				width: e[ a + 'Width' ],
				height: e[ a + 'Height' ]
			};
		};
	}
}());

