/*global Backbone, jQuery, _ */
var app = app || {};

(function ($) {
	'use strict';

	app.AppView = Backbone.View.extend({
		el: '#main',
		events: {
			'generate-data': 'generateData',
			'click #menu': 'toggleMenu'	
		},
		initialize: function () {
			var type = [{code: 'Working', hours: 8, range_start: 6, range_end: 8},
						{code: 'Sleep', hours: 8, range_start: 6, range_end: 8},
						{code: 'Exercise', hours: 3, range_start: 0, range_end: 2},
						{code: 'Games', hours: 3, range_start: 1, range_end: 4},
						{code: 'Reading', hours: 1, range_start: 0, range_end: 1},
						{code: 'Movies', hours: 2, range_start: 1, range_end: 3},
						{code: 'Socialise', hours: 3, range_start: 1, range_end: 3},
						{code: 'Others', hours: 2, range_start: 1, range_end: 3}],
				collection = new app.DailyTaskCollection(type);
			
			this.dataCollection = new app.DailyTaskCollection([]);
			this.dataTypeCollection = new app.DailyTaskCollection(type);
			this.generateData();
		},
		render: function () {
			var inputView = new app.InputView({collection: this.dataTypeCollection});
			$('#input-container').prepend(inputView.render().$el);
			var lineView = new app.LineView(this.dataCollection, this.dataTypeCollection);
			$('#box1 .box-wrapper').append(lineView.render().$el);
			var averagePieView = new app.AveragePieView(this.dataCollection);
			$('#box2 .box-wrapper').append(averagePieView.render().$el);
			var targetRadarView = new app.TargetRadarView(this.dataCollection, this.dataTypeCollection);
			$('#box3 .box-wrapper').append(targetRadarView.render().$el);
			return this;
		},
		toggleMenu: function() {
			var popup = $('#box0'),
				menu = $('#menu');
			if (menu.text() === 'Generate me!') {
				popup.fadeIn(500);
				menu.text('X');
			} else {
				popup.fadeOut(500);
				menu.text('Generate me!');
			}
		},
		generateData: function() {
			function dateToYMD(date) {
			    var d = date.getDate();
			    var m = date.getMonth() + 1;
			    var y = date.getFullYear();
			    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
			}
			var i, 
				data = [],
				date = new Date();
			for(i = 0; i < 30; i++) {
				date.setTime(date.getTime() + 24*60*60*1000);
				this.dataTypeCollection.each(function(model) {
					data.push( $.extend( {}, model.toJSON(), {date: dateToYMD(date), hours: Math.random() * (model.get('range_end') - model.get('range_start')) + model.get('range_start')}) );
				});
			}
			this.dataCollection.reset(data);
		}
	});
})(jQuery);