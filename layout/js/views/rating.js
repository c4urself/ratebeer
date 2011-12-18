define([
    'jquery',
    'underscore',
    'mustache',
    'backbone',
    'models/rating',
    'text!templates/rating.html'
], function($, _, M, Backbone, RatingModel, ratingTemplate) {

    var view = Backbone.View.extend({
        tagName: 'div',
        className: 'vote',
        
        render: function() {
            $(this.el).append(M.to_html(ratingTemplate, this.model.toJSON()));
            if (this.model.get("id")) {
                this.changeClass("upvote");
            }
            return this;
        },
        
        events: {
            "click a.up": "doUpvote"
        },

        changeClass: function(name) {
            if (name === 'upvote') {
                this.$(".up").removeClass("upvote").addClass("upvoted");
            } else {
                this.$(".up").removeClass("upvoted").addClass("upvote");
            }
        },

        doUpvote: function() {
            var self = this;
            if (!this.model.id) {
                this.model.save(null, {
                    success: function() {
                        self.changeClass("upvote");
                        self.model.trigger("reload");
                    },
                    error: function() {
                        console.error("Error upvoting!");
                    }
                });

            } else {
                this.model.destroy({
                    success: function() {
                        self.model.unset("id"); // Get rid of the ID, so next click is http POST
                        self.changeClass("");   // Style normally
                        self.model.trigger("reload");
                    },
                    error: function() {
                        console.error("Erro upvoting!");
                    }
                });
            }
        }
    });

    return view;
});


