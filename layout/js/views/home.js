define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',

  'models/beers',
  'views/beer',
  'text!templates/home.html'
], function($, _, Backbone, M,
            BeerCollection, BeerView, homeTemplate){

    var MainView = Backbone.View.extend({
        el: $('#container'),
        current: -1,

        buttons: $('ul.navigation', this.el),
        collection: new BeerCollection(),

        initialize: function() {
            _.bindAll(this);
            this.collection.bind("add", this.addBeer, this);
            this.collection.bind("reset", this.addAll, this);
            this.collection.bind("all", this.render, this);
            this.collection.fetch({success: this.getNext});
            
        },
        
        addBeer: function(beer) {
            var beerView = new BeerView({model: beer});
            this.$("#beers").append(beerView.render().el);
        },

        addAll: function() {
            this.collection.each(this.addBeer);
        },

        render: function() {
            var data = {
                total: this.collection.length
            };
            var compiledTemplate = M.to_html(homeTemplate, data);
            this.$("#number").html(compiledTemplate);
        },

        events: {
            'click button.next': 'getNext',
            'click button.prev': 'getPrev'
        },

        getNext: function() {
            var next = this.current + 1;
            var currentBeer = this.collection.length == next ? this.collection.at(0) : this.collection.at(next);
            this.current = this.collection.indexOf(currentBeer);
            this.collection.each(function(model) {
                model.set({visible: false});
            });
            currentBeer.set({visible: true});
        },
        
        getPrev: function() {
            var prev = this.current - 1;
            var currentBeer = prev < 0 ? this.collection.at(this.collection.length - 1) : this.collection.at(prev);
            this.current = this.collection.indexOf(currentBeer);
            this.collection.each(function(model) {
                model.set({visible: false});
            });
            currentBeer.set({visible: true});
        }
    });

    return MainView;
});

