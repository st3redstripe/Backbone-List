Backbone-Tree
====================

A lightweight tree component for Backbone.js apps.

* Easily extendable
* Modular (require.js)
* Namespaced CSS (less)
* Unit tested

<img src="https://raw.github.com/st3redstripe/Backbone-Tree/master/src/tree.png"/>

## Usage

Create a new `Tree` model and a `TreeView` view. 

When instantiating the view, pass the model as a parameter to bind it to the view. You can then begin adding nodes to the tree.

```js
var model = new Tree();
var view = new TreeView({ model: model });
```

### Adding nodes

You can add `Folder` models or `File` models to your main model. If you add a `Folder` model, you can add files and folders to it - creating a composite hierachy.

```js
var folder = new Folder({ title: "Pictures" });
folder.add(new File({ title: "Safari.jpg" }));
folder.add(new Folder({ title: Holiday Album }));

model.add(folder);
```

### Rendering
You will only need to render the `TreeView` instance once. This will generate the views `el` so that you can insert it into the DOM.

```js
$("#tree-container").html(view.render().el);
```

## API

The following attributes can be `set` on folder and file models. 

* `title`: File or folder name.
* `onClick`: A function to be executed when an item is clicked. Passed the model of the clicked item as a paramter. 
* `visible`: A boolean denoting whether to collapse or show the node. Only applicable to folders. Default is `true`.
* `editable`: A boolean denoting whether the item can be edited. Default is `false`. 

## Events

All events are propogated up to the master `Tree` model. You can bind to events as you would with any Backbone event.
Note that the event callback is passed the relevent model.

* `edited`: Denotes that a folder or file name has been changed.
* `visiblity`: Denotes that a folder has been collapsed or expanded.
* `clicked`: Denotes that a folder or file has been clicked.

```js
treeModel.on("visiblity", function (model) {
  console.log("A folder has been " + (model.get("visibile") ? "expanded" : "closed"));
});
```