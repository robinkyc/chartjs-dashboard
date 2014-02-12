/*global Backbone, jQuery, _ */
var app = app || {};

(function ($) {
	'use strict';

	app.TargetRadarView = Backbone.View.extend({
		tag: 'div',
		events: {
		},
		initialize: function (data, targetData) {
			this.data = data;
			this.targetData = targetData;
			this.data.on('reset', this.render, this);
		},
		render: function () {
			this.$el.empty();
			var canvas = $('<canvas id="canvas-radar" width="300px" height="300px"></canvas>').appendTo(this.el);
			var myLine = new Chart(canvas.get(0).getContext("2d")).Radar(
				this.convertData(this.data, this.targetData), 
				{scaleShowLabels : false, pointLabelFontSize : 10}
			);
			return this;
		},
		convertData: function(data, targetData) {
			var i,
				labels = [],
				newData = {},
				convertedData = [
				
				{
					fillColor : "rgba(255,0,0,0.5)",
					strokeColor : "rgba(255,0,0,1)",
					pointColor : "rgba(255,0,0,1)",
					pointStrokeColor : "#fff",
					data : []
				},
				{
					fillColor : "rgba(98,118,245,0.4)",
					strokeColor : "rgba(98,118,245,1)",
					pointColor : "rgba(98,118,245,1)",
					pointStrokeColor : "#fff",
					data : []
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
			targetData.each(function(model) {
				var d = model.toJSON();
				labels.push(d.code);
				convertedData[0].data.push(d.hours);
			});
			_.each(newData, function(d) {
				convertedData[1].data.push(d.total / d.count);
			});
			return {
				labels: labels, 
				datasets: convertedData
			};
		}
	});
})(jQuery);