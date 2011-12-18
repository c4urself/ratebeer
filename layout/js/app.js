// Filename: app.js

define([
	'router',
	'jquery'
], function(Router, $){
	var initialize = function() {
		Router.initialize();
	};

	return {
		initialize: initialize
	};
});
