'use strict';

jasmine.getFixtures().fixturesPath = '/base/source/tests/testfixtures/';

describe('Karma example test', function () {
	var app = APP.TestExample.__testonly__,
		$testFixture = null;

	beforeEach(function () {
		loadFixtures('test.html');
		$testFixture = $('#test-element');
	});

	it('Test fixture is in the DOM', function () {
		expect($testFixture).toBeInDOM();
	});

	it('\'addClass()\' method adds the proper class', function () {
		app.addClass($testFixture);
		expect($testFixture).toHaveClass('test-class');
	});

	it('\'addNumbers()\' gives the correct result', function () {
		var numberOne = 1,
			numberTwo = 3,
			expected = 4,
			result;

		result = app.addNumbers(numberOne, numberTwo);
		expect(result).toBe(expected);
	});

});

describe('Karma example AJAX test', function () {

	beforeEach(function () {
		jasmine.Ajax.install();
	});

	afterEach(function () {
		jasmine.Ajax.uninstall();
	});

	it('AJAX call gives the correct response (\'Valid response\')', function () {
		var doneFn = jasmine.createSpy('success'),
			xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function () {
			if (this.readyState === this.DONE) {
				doneFn(this.responseText);
			}
		};

		xhr.open('GET', '/some/cool/url');
		xhr.send();

		expect(jasmine.Ajax.requests.mostRecent().url).toBe('/some/cool/url');
		expect(doneFn).not.toHaveBeenCalled();

		jasmine.Ajax.requests.mostRecent().response({
			'status': 200,
			'contentType': 'text/plain',
			'responseText': 'Valid response'
		});

		expect(doneFn).toHaveBeenCalledWith('Valid response');
	});

});