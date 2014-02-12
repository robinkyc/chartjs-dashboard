/*global Backbone, jQuery, _ */
var app = app || {};

(function ($) {
	'use strict';

	app.DailyTaskCollection = Backbone.Collection.extend({
		model: app.DailyTaskModel
	});
})(jQuery);