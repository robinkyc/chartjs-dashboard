/*global Backbone, jQuery, _ */
var app = app || {};

(function ($) {
	'use strict';

	var template = [
            '<div class="input-title"><%= task.code %></div>',
            '<div class="input-button">',
            '<input class="hours-target" value="<%= task.hours %>" />',
            '<input class="range-start" value="<%= task.range_start %>" />',
            '<input class="range-end" value="<%= task.range_end %>" />',
            '</div>'].join('');

	app.InputItemView = Backbone.View.extend({
		tag: 'div',
		className: 'input-item',
		events: {
			'change input': 'updateModel'
		},
		initialize: function () {
		},
		render: function () {
			this.$el.append(_.template(template, {task: this.model.toJSON() } ));		
			return this;
		},
		updateModel: function(ev) {
			var current = $(ev.currentTarget),
				value = parseInt(current.val(), 10);
			switch(current.attr('class')) {
				case 'hours-target': 
					this.model.set('hours', value);
					break;
				case 'range-start': 
					this.model.set('range_start', value);
					break;
				case 'range-end': 
					this.model.set('range_end', value);
					break;
			}
		}
	});
	app.InputView = Backbone.View.extend({
		tag: 'div',
		className: 'input-task', 
		events: {
			'click .btn-go': 'generateData'
		},
		initialize: function () {
		},
		render: function () {
			this.$el.append('<div class="input-item-container"></div><div class="btn btn-go">Go</div>');
			var container = this.$el.find('.input-item-container');
			this.collection.each(function(model){
				container.append(new app.InputItemView({model: model}).render().el);
			});	
			return this;
		},
		generateData: function() {
			this.$el.trigger('generate-data');
		}
	});
})(jQuery);