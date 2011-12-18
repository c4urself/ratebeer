//Filename: router.js
define([
    'backbone',
    'views/home'
], function(Backbone, MainView){
    var $ = require('jquery'),
        _ = require('underscore');

    var AppRouter = Backbone.Router.extend({
        navigationView: null,

        routes: {
            '': 'home'
        },

        home: function(actions){
            new MainView();
        }
    });

    var initialize = function() {
        var app_router = new AppRouter();
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});

