/**
 * Created by Yusuf on 5/9/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "jqxtree", "bpa/base/component/Component"], function (require, exports, $, jqxtree, Component) {
    var Tree = (function (_super) {
        __extends(Tree, _super);
        function Tree(theOptions) {
            _super.call(this, theOptions);
            this.items = theOptions.items;
            this.onSelectItem = theOptions.onSelectItem;
            this.showBorder = theOptions.showBorder;
            jqxtree;
        }
        Tree.prototype.setOnSelectItem = function (anOnSelectItem) {
            this.onSelectItem = anOnSelectItem;
        };
        Tree.prototype.renderTo = function (theContainer) {
            var _this = this;
            this.element = $("<div id=\"" + this.id + "\"><\/div>");
            if (this.showBorder != undefined && this.showBorder != null) {
                if (!this.showBorder) {
                    this.element.css("border", "0");
                }
            }
            this.element.appendTo(theContainer);
            var _width = 'auto';
            if (this.widthInPercentage != undefined) {
                _width = this.widthInPercentage + '%';
            }
            if (this.width != undefined) {
                _width = this.width;
            }
            var _height = 'auto';
            if (this.heightInPercentage != undefined) {
                _height = this.heightInPercentage + '%';
            }
            if (this.height != undefined) {
                _height = this.height;
            }
            this.element.jqxTree({ source: this.items, width: _width, height: _height, theme: this.theme });
            var _select = function (event) {
                var _args = event.args;
                var _item = _this.element.jqxTree('getItem', _args.element);
                var _label = _item.label;
                var _value = _item.value;
                _this.onSelectItem(_item, _label, _value);
            };
            this.element.on('select', _select);
        };
        return Tree;
    })(Component);
    return Tree;
});
