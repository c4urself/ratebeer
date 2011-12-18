define([
    'backbone',
    'underscore'
], function(Backbone, _) {

    var model = Backbone.Model.extend({
        urlRoot: 'api/v1/rating/',

        initialize: function() {
            console.warn("Initialized rating model");
        },

        url: function() {
            if (this.id) {
                return this.urlRoot + this.id + '/';
            } else {
                return this.urlRoot;
            }
        }

    });

    return model;
});






