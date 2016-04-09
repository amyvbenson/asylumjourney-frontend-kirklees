(function () {
	'use strict';

	angular
		.module('asylumjourneyFrontend')
		.service('data', data);

	function data($resource) {

		var url = 'http://private-7172d-asylumjourney.apiary-mock.com/';

		this.services = services;
		this.providers = providers;
		this.stages = stages;
		this.categories = categories;

		///////////

		function services() {
			return $resource(url + 'services');
		}

		function providers() {
			return $resource(url + 'providers');
		}

		function stages() {
			return $resource(url + 'stages');
		}

		function categories() {
			return $resource(url + 'categories');
		}
	}
})();
