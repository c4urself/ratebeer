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
        
        initialize: function() {
            //this.model.bind("change", this.render, this);
        },

        render: function() {
            $(this.el).append(M.to_html(ratingTemplate, this.model.toJSON()));
            if (this.model.get("id")) {
                this.changeClass("upvote");
            }
            return this;
        },
        
        events: {
            "click span.up": "doUpvote",
            "click span.downvote": "doDownvote"
        },

        changeClass: function(name) {
            if (name === 'upvote') {
                this.$(".up").removeClass("upvote").addClass("upvoted");
            } else {
                this.$(".up").removeClass("upvoted").addClass("upvote");
            }
        },

        doUpvote: function() {
            if (!this.model.id) {
                this.model.save({
                    success: function() {
                        this.changeClass("upvote");
                    }
                });

            } else {
                var self = this;
                this.model.destroy({
                    success: function() {
                        self.model.unset("id"); // Get rid of the ID, so next click is http POST
                        self.changeClass("");   // Style normally
                    }
                });
            }
        },
        doDownvote: function() {
            
        }
    });

    return view;
});


