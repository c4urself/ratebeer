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
                        //
                    }
                
                });
            } else {
                this.ratingModel = new RatingModel({user_id: this.model.get("user"), beer: this.model.get("id")});
            }
            this.ratingModel.bind("change", this.reloadModel, this);
            this.model.bind("change:visible", this.toggle, this);
            this.model.bind("change", this.render, this);
            this.model.bind("change:number", this.updateNumber, this);
        },

        render: function() {
            $(this.el).html(M.to_html(beerTemplate, this.model.toJSON()));
            
            var ratingView = new RatingView({model: this.ratingModel});
            this.$('div.rating-container').html(ratingView.render().el);

            this.toggle();

            return this;
        },

        reloadModel: function() {
            var self = this;
            this.model.save({
                success: function() {
                    self.render();
                }
            });
        },

        events: {
            "mouseover   .image": "showDescription",
            "mouseleave  .image": "hideDescription",
            "click       .image": "createNew",
            "click       .submit": "submitForm"
        },

        createNew: function() {
            document.location.href = "/add/";
            var $image = this.$(".image");
            $image.html(M.to_html(formTemplate, this.model.toJSON()));
        },

        submitForm: function() {
            var form = this.$("form").serializeHash();
            
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

