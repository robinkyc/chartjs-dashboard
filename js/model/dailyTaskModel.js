/*global Backbone, jQuery, _ */
var app = app || {};

(function ($) {
	'use strict';

	app.DailyTaskModel = Backbone.Model.extend({
		code: null, 
		hours: 0, 
		range_start: 0, 
		range_end: 0
	});
})(jQuery);