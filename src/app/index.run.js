(function() {
	'use strict';

	angular
	.module('asylumjourneyFrontend')
	.run(runBlock);

	/** @ngInject */
	function runBlock(ngDialog, $rootScope, $location, AuthService) {

		var deregistrationCallback = $rootScope.$on('$routeChangeStart', function(event, next, current) {
			if (next !== current) {
				ngDialog.closeAll();
				$rootScope.dialogOpen = false;
			}
			AuthService.checkAuthentication().then(function (){
				if (next && next.authenticate && !AuthService.isAuthenticated) {
					$location.path('/');
					event.preventDefault();
					return;
				}
			});
		});

		if (typeof ga === 'undefined') {
			return;
		}

		if ($location.host() !== 'localhost' && $location.host() !== 'aj-staging.firebaseapp.com') {
			ga('create', 'UA-80488368-1', 'auto');

			deregistrationCallback = $rootScope.$on('$routeChangeSuccess', function() {
				ga('send', 'pageview', $location.path());
			});
		}

		$rootScope.$on('$destroy', deregistrationCallback);
	}

})();
