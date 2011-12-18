define([
    'backbone',
    'underscore'
], function(Backbone, _) {

    var model = Backbone.Model.extend({
        idAttribute: 'resource_uri',

        url: function() {
            return this.id;
        },

        defaults: function() {
            return {
                rated:  false//,
                //order: Todos.nextOrder()
            };
        }

    });

    return model;
});





