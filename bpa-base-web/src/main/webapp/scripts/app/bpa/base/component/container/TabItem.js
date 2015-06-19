/**
 * Created by Yusuf on 5/9/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "bpa/base/component/Component"], function (require, exports, $, Component) {
    var TabItem = (function (_super) {
        __extends(TabItem, _super);
        function TabItem(theOptions) {
            _super.call(this, theOptions);
            this.tabKey = theOptions.tabKey;
            this._caption = theOptions.caption;
            this._content = theOptions.content;
        }
        TabItem.prototype.renderTo = function (theContainer) {
            this.element = $("<div id=\"" + this.id + "\"><\/div>");
            this.element.appendTo(theContainer);
            if (this.content != undefined && this.content != null) {
                this.content.renderTo(this.element);
            }
        };
        Object.defineProperty(TabItem.prototype, "caption", {
            get: function () {
                //console.log("get caption");
                return this._caption;
            },
            set: function (theCaption) {
                //console.log("set caption");
                this._caption = theCaption;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabItem.prototype, "content", {
            get: function () {
                //console.log("get content");
                return this._content;
            },
            set: function (theContent) {
                //console.log("set content");
                this._content = theContent;
            },
            enumerable: true,
            configurable: true
        });
        return TabItem;
    })(Component);
    return TabItem;
});
