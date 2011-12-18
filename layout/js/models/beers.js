define([
    'backbone',
    'models/beer'
], function(Backbone, Beer) {
    var collection = Backbone.Collection.extend({
        url: 'api/v1/beer/',
        model: Beer,
        
        comparator: function(beer) {
            return beer.get("id");
        },

        initialize: function() {
            console.info("Initialized beers collection");
            console.info(this.models);
        },

        parse: function(response) {
            console.warn(response.objects);
            return response.objects;
        }
    });

    return collection;
});

