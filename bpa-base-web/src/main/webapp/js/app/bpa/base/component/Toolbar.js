/**
 * Created by Yusuf on 6/14/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "bpa/base/component/Component", "bpa/base/component/layout/TableLayout"], function (require, exports, $, Component, TableLayout) {
    var Toolbar = (function (_super) {
        __extends(Toolbar, _super);
        function Toolbar(theOptions) {
            _super.call(this, theOptions);
            this._columns = [];
            this.items = theOptions.items;
        }
        Toolbar.prototype.renderTo = function (theContainer) {
            var _this = this;
            this.element = $("<div id=\"" + this.id + "\" style=\"height: 100%;\"><\/div>");
            this.element.appendTo(theContainer);
            this.items.forEach(function (item) {
                _this._columns.push({
                    content: item
                });
            });
            var _tableLayout = new TableLayout({
                rows: [{
                    columns: _this._columns
                }],
            });
            _tableLayout.renderTo(this.element);
        };
        return Toolbar;
    })(Component);
    return Toolbar;
});
