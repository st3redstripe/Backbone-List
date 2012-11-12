define([
	"backbone",
	"underscore",
	"jquery",
	"handlebars",
	"list/view/NodeView",
	"list/model/Leaf",
	"list/model/Composite",
	"list/view/LeafView",
	"text!list/templates/CompositeView.html"
], function (Backbone, _, $, Handlebars, NodeView, Leaf, Composite, LeafView, template) {
	var CompositeView = NodeView.extend({
		className: "node composite",

		tagName: "li",

		template: Handlebars.compile(template),

		childViews: null,

		_$header: null,

		_$children: null,

		events: {
			"click .arrow"      : "showHideChildren",
			"dblclick .icon"    : "showHideChildren"
		},

		initialize: function () {
			this.events = _.extend({}, NodeView.prototype.events, this.events);
			NodeView.prototype.initialize.call(this);

			this.childViews = {};

			this.model.get("children").on("add", this.addChildViewForModel, this);
			this.model.get("children").on("remove", this.removeChildViewForModel, this);
			this.model.on("change:visible", this.onVisibilityChange, this);

			this._$header = $(this.make("div")).appendTo(this.el);
			this._$children = $(this.make("div")).appendTo(this.el);
		},

		render: function () {
			this._renderHeader();
			this._renderChildren();

			return this;
		},

		addChildViewForModel: function (model) {
			this._createChildView(model);

			if (model instanceof Composite) {
				// Manually trigger the 'add' event for any child models
				model.get("children").each(function (child) {
					model.get("children").trigger("add", child);
				});
			}
		},

		removeChildViewForModel: function (model) {
			this._deleteChildView(model);
		},

		onVisibilityChange: function () {
			this.$el
				.find("span.arrow-icon:first, span.icon:first")
				.toggleClass("open", this.model.get("visible"));

			this.$el.find("ul:first").toggleClass("hidden");
		},

		showHideChildren: function (e) {
			e.stopImmediatePropagation();

			var visible = this.model.get("visible");
			this.model.set("visible", visible ? false : true);
		},

		_createChildView: function (model) {
			var view;

			if (model instanceof Leaf) {
				view = new LeafView({ model: model });
			} else if (model instanceof Composite) {
				view = new CompositeView({ model: model });
			}
			this.childViews[model.cid] = view;

			return view;
		},

		_deleteChildView: function (model) {
			this.childViews[model.cid].remove();
			delete this.childViews[model.cid];
		},

		_renderHeader: function () {
			var result = this.template(this.model.attributes);
			this._$header.html(result);
		},

		_renderChildren: function () {
			var ul = $(this.make("ul")).toggleClass("hidden", !this.model.get("visible"));

			_.each(this.childViews, function (child) {
				ul.append(child.render().el);
			}, this);

			this._$children.html(ul);
		}
	});

	return CompositeView;
});