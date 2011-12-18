define([
    'backbone',
    'underscore'
], function(Backbone, _) {

    var model = Backbone.Model.extend({
        idAttribute: 'resource_uri',

        url: function() {
            return this.id;
        }

    });

    return model;
});





