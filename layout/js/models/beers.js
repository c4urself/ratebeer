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

        parse: function(response) {
            return response.objects;
        }
    });

    return collection;
});

