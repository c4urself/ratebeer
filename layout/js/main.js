require.config({
	paths: {
		jquery: 'libs/jquery',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		mustache: 'libs/mustache',
		handlebars: 'libs/handlebars',
		templates: 'templates',
	}
});

require([
	// Load our app module and pass it to our definition function
	'app',
], function(App){
	// The "app" dependency is passed in as "App"
	// Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
	App.initialize();
});
