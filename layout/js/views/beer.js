define([
    'jquery',
    'underscore',
    'mustache',
    'backbone',
    
    'views/rating',
    'models/rating',

    'text!templates/beer.html',
    'text!templates/description.html'
], function($, _, M, Backbone, RatingView, RatingModel, beerTemplate, descriptionTemplate) {

    var view = Backbone.View.extend({
        tagName: 'li',
        
        defaults: {
            visible: false
        },

        initialize: function() {
            if (this.model.get("current_rating")) {
                this.ratingModel = new RatingModel({id: this.model.get("current_rating")});
                this.ratingModel.fetch({
                    success: function(model, res){
                        // Fetched existing rating for logged in user successfully
                    }
                
                });
            } else {
                // Initializing new rating for logged in user and beer
                this.ratingModel = new RatingModel({user_id: this.model.get("user"), beer: this.model.get("id")});
            }
            
            this.ratingModel.bind("reload", this.reloadModel, this);
            this.model.bind("change:visible", this.toggle, this);
        },

        render: function() {
            // Base html for beer (image/description)
            $(this.el).html(M.to_html(beerTemplate, this.model.toJSON()));
            
            // Initialize and render corresponding rating view
            var ratingView = new RatingView({model: this.ratingModel});
            this.$('div.rating-container').html(ratingView.render().el);
            
            // Toggle the visibility
            this.toggle();

            return this;
        },

        reloadModel: function() {
            console.info("Reloading beer model: rating changed");
            var self = this;
            this.model.save(null, {
                success: function() {
                    console.debug("Reloading beer model: rating changed (rendering)");
                    self.render();
                },
                error: function() {
                    console.warn("Something went wrong during reloading of beer model!");
                }
            });
        },
        
        events: {
            "mouseover   .image": "showDescription",
            "mouseleave  .image": "hideDescription",
            "click       .image": "createNew"
        },

        createNew: function() {
            document.location.href = "/add/";
            //TODO: Make the form client side
        },

        showDescription: function() {
            var $image = this.$(".image");
            $image.html(M.to_html(descriptionTemplate, this.model.toJSON()));
            $image.css("background-position", "-1000px -1000px");
            $image.css("cursor", "pointer");
        },

        hideDescription: function() {
            var $image = this.$(".image");
            $image.children().fadeOut(100, function() {
                $(this).remove();
                $image.css("background-position", "50% 50%");
            });
            
        },
        

        toggle: function() {
            if (this.model.get("visible") === true) {
                $(this.el).show();
                this.$("div.image").slideDown("slow");
            } else {
                this.$("div.image").hide();
                $(this.el).hide();

            }
        }
    });

    return view;
});

