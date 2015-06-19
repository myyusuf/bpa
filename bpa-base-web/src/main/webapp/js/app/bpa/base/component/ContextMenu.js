/**
 * Created by Yusuf on 5/13/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "jqxmenu", "bpa/base/component/Component", "bpa/base/data/DataSource", "bpa/base/data/DataAdapter"], function (require, exports, $, jqxmenu, Component, DataSource, DataAdapter) {
    var ContextMenu = (function (_super) {
        __extends(ContextMenu, _super);
        function ContextMenu(theOptions) {
            _super.call(this, theOptions);
            this._itemsMap = {};
            this.items = theOptions.items;
            jqxmenu;
        }
        ContextMenu.prototype.renderTo = function (theContainer) {
            var _this = this;
            this.element = $("<div id=\"" + this.id + "\"><\/div>");
            this.element.appendTo(theContainer);
            var _dataSourceOptions = {
                dataType: "json",
                dataFields: [
                    { name: 'id' },
                    { name: 'parentid' },
                    { name: 'text' },
                    { name: 'subMenuWidth' }
                ],
                id: 'id',
                localData: this.items
            };
            var _dataSource = new DataSource(_dataSourceOptions);
            var _dataAdapter = new DataAdapter(_dataSource);
            _dataAdapter.get().dataBind();
            var _records = _dataAdapter.get().getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);
            this.element = this.element.jqxMenu({ source: _records, width: this.width, height: this.height, theme: this.theme });
            for (var _i = 0; _i < this.items.length; _i++) {
                this._itemsMap[this.items[_i].id] = this.items[_i];
            }
            this.element.on('itemclick', function (event) {
                // get the clicked LI element.
                var _childId = event.args.id;
                console.log(_childId);
                _this._itemsMap[_childId].onClick(event);
            });
        };
        return ContextMenu;
    })(Component);
    return ContextMenu;
});
