require([
	"underscore",
	"jquery",
	"list/view/LeafView",
	"list/view/CompositeView",
	"list/model/List",
	"list/model/Leaf"
], function (_, $, LeafView, CompositeView, List, Leaf) {
	describe("list/view/LeafView", function () {

		it("instantiates with a model", function () {
            var model = new Leaf();

			chai.assert.isDefined(new LeafView({ model: model }));
		});

		it("hides title and shows editable form field when editing a post", function () {
			var model = new Leaf(),
				view = new LeafView({ model: model });

			view.render().edit($.Event());

			chai.assert.isTrue(view.$el.find(".title").is(":hidden"));
			chai.assert.notEqual("none", view.$el.find(".title-edit").css("display"));
		});

		it("hides editable form field and shows title when cancelling an edit", function () {
			var model = new Leaf(),
				view = new LeafView({ model: model });

			view.render().edit($.Event());
			view.cancelEdit($.Event());

			chai.assert.isTrue(view.$el.find(".title-edit").is(":hidden"));
			chai.assert.notEqual("none", view.$el.find(".title").css("display"));
		});

		it("highlights the title from the supplied range", function () {
			var model = new Leaf({ title: "test-text" }),
				view = new LeafView({ model: model });

			view.render().highlightTitle(5, 8);

			chai.assert.equal("tex", view.$el.find(".highlight").text());
		});

		it("can clear highlighted text", function () {
			var model = new Leaf({ title: "test-text" }),
				view = new LeafView({ model: model });

			view.render().highlightTitle(5, 8);
			view.clearTitleHighlights();

			chai.assert.lengthOf(view.$el.find(".highlight"), 0);
			chai.assert.equal("test-text", view.$el.find(".title").text());
		});
	});
});