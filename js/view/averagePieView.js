/*global Backbone, jQuery, _ */
var app = app || {};

(function ($) {
	'use strict';

	app.AveragePieView = Backbone.View.extend({
		tag: 'div',
		events: {
		},
		initialize: function (data) {
			this.data = data;
			this.data.on('reset', this.render, this);
		},
		render: function () {
			this.$el.empty();
			var canvas = $('<canvas id="canvas-pie" width="300px" height="300px"></canvas>').appendTo(this.el);
			var myLine = new Chart(canvas.get(0).getContext("2d"), {tooltips: {
				fontSize: '75.4%'
			}}).Pie(this.convertData(this.data), {
				animationSteps: 30,
				animationEasing: 'easeOutBounce'
			});
			return this;
		},
		convertData: function(data) {
			var i,
				newData = {},
				convertedData = [
				{
					color : "#c9e26f",
					labelColor : '#444',
					labelFontSize : '1.4em',
					labelAlign: 'center'
				},
				{
					color : "#579f7a",
					labelColor : '#444',
					labelFontSize : '1.4em',
					labelAlign: 'center'
				},
				{
					color : "#696082",
					labelColor : '#444',
					labelFontSize : '1.4em',
					labelAlign: 'center'
				},
				{
					color : "#d46c53",
					labelColor : '#444',
					labelFontSize : '1.4em',
					labelAlign: 'center'
				},
				{
					color : "#d9f7b2",
					labelColor : '#444',
					labelFontSize : '1.4em',
					labelAlign: 'center'
				},
				{
					color : "#b3f8cc",
					labelColor : '#444',
					labelFontSize : '1.4em',
					labelAlign: 'center'
				},
				{
					color : "#a5c8c8",
					labelColor : '#444',
					labelFontSize : '1.4em',
					labelAlign: 'center'
				},
				{
					color : "#c799ae",
					labelColor : '#444',
					labelFontSize : '1.4em',
					labelAlign: 'center'
				}
			];
			data.each(function(model) {
				var d = model.toJSON();
				if (newData[d.code] == undefined) {
					newData[d.code] = {total: 0, count: 0};
				}
				newData[d.code].total += d.hours;
				newData[d.code].count += 1;
			});
			var i = 0;
			_.each(newData, function(d, key) {
				convertedData[i].value = d.total / d.count;
				convertedData[i++].label = key;
			});
			return convertedData;
		}
	});
})(jQuery);