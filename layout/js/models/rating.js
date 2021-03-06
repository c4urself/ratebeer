define([
    'backbone',
    'underscore'
], function(Backbone, _) {

    var model = Backbone.Model.extend({
        urlRoot: 'api/v1/rating/',

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






