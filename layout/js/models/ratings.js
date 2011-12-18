define([
    'backbone',
    'models/rating'
], function(Backbone, Rating) {
    var collection = Backbone.Collection.extend({
        url: 'api/v1/rating/',
        model: Rating,

        initialize: function() {
            console.info("Initialized ratings collection");
            console.info(this.models);
        },

        parse: function(response) {
            console.warn(response.objects);
            return response.objects;
        }
    });

    return collection;
});


