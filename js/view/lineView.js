/*global Backbone, jQuery, _ */
var app = app || {};

(function ($) {
	'use strict';

	app.LineView = Backbone.View.extend({
		tag: 'div',
		events: {
		},
		initialize: function (data, targetData) {
			this.data = data;
			this.targetData = targetData;
			this.data.on('reset', this.render, this);
			var that = this;
			$(window).resize(function(){
				that.render();
			});
		},
		render: function () {
			this.$el.empty();
			var canvas = $('<canvas id="canvas-line" width="' + $(window).width() + 'px" height="300px"></canvas>').appendTo(this.el);
			var myLine = new Chart(canvas.get(0).getContext("2d")).Line(
				this.convertData(this.data, this.targetData), 
				{
					pointDot: true,
					scaleShowLabels: true,
					scaleOverlay: true,
					scaleOverride: true,
					scaleSteps: 12,
					scaleStepWidth : 2,
					scaleStartValue : 0,
					animation: false
				}
			);
			return this;
		},
		convertData: function(data, targetData) {
				var i, n,
					previous = data.first().date, 
					accumulateHours = 0,
					cache = {},
					labels = [],
					convertedData = [
					{
						fillColor : "rgba(232,104,147,0.9)",
						strokeColor : "rgba(232,104,147,1)",
						pointColor : "rgba(232,104,147,1)",
						pointStrokeColor : "#fff",
						data : []
					},
					{
						fillColor : "rgba(151,187,205,0.8)",
						strokeColor : "rgba(151,187,205,1)",
						pointColor : "rgba(151,187,205,1)",
						pointStrokeColor : "#fff",
						data : []
					},
					{
						fillColor : "rgba(103,240,153,0.9)",
						strokeColor : "rgba(103,240,153,1)",
						pointColor : "rgba(103,240,153,1)",
						pointStrokeColor : "#fff",
						data : []
					},
					{
						fillColor : "rgba(255,247,153,0.9)",
						strokeColor : "rgba(255,247,153,1)",
						pointColor : "rgba(255,247,153,1)",
						pointStrokeColor : "#fff",
						data : []
					},
					{
						fillColor : "rgba(222,27,27,0.6)",
						strokeColor : "rgba(222,27,27,1)",
						pointColor : "rgba(222,27,27,1)", 
						pointStrokeColor : "#fff",
						data : []
					},
					{
						fillColor : "rgba(34,89,161,0.6)",
						strokeColor : "rgba(34,89,161,1)",
						pointColor : "rgba(34,89,161,1)", 
						pointStrokeColor : "#fff",
						data : []
					},
					{
						fillColor : "rgba(80,186,119,0.7)",
						strokeColor : "rgba(80,186,119,1)",
						pointColor : "rgba(80,186,119,1)", //50BA77
						pointStrokeColor : "#fff",
						data : []
					},
					{
						fillColor : "rgba(250,255,107,0.7)",
						strokeColor : "rgba(250,255,107,1)",
						pointColor : "rgba(250,255,107,1)", //FAFF66
						pointStrokeColor : "#fff",
						data : []
					}
				];
				data.each(function(model) {
					var data = model.toJSON();
					if (previous != data.date) {
						accumulateHours = 0;
					}
					app.c = targetData;
					accumulateHours += data.hours;
					targetData.each(function(model, n){
						var target = model.toJSON();
						if (target.code === data.code) {
							if (data.code === 'Others') {
								accumulateHours = 24;
							}
								convertedData[targetData.length - n - 1].data.push(accumulateHours);
						}
					});
					
					if (data.date in cache === false) {
						cache[data.date] = true;
						labels.push(data.date);
					}
					previous = data.date;
				})
				app.collection = data;
				return {
					labels: _.chain(data.pluck('date')).uniq().map(function(value, index) { return index % 7 === 0 ? value: ''}).value(),
					datasets: convertedData
				};
			}
	});
})(jQuery);