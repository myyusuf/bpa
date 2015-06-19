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
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu(theOptions) {
            _super.call(this, theOptions);
            this._itemsMap = {};
            this.items = theOptions.items;
            if (theOptions.mode != undefined && theOptions.mode != null) {
                this.mode = theOptions.mode;
            }
            else {
                this.mode = "horizontal";
            }
            jqxmenu;
        }
        Menu.prototype.renderTo = function (theContainer) {
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
            this.element = this.element.jqxMenu({ source: _records, width: _width, height: _height, autoOpenPopup: false, mode: this.mode, theme: this.theme });
            for (var _i = 0; _i < this.items.length; _i++) {
                this._itemsMap[this.items[_i].id] = this.items[_i];
            }
            this.element.on('itemclick', function (event) {
                // get the clicked LI element.
                var _childId = event.args.id;
                _this._itemsMap[_childId].onClick(event);
            });
        };
        Menu.prototype.openPopup = function (xLocation, yLocation) {
            this.element.jqxMenu('open', xLocation, yLocation);
        };
        Menu.prototype.closePopup = function () {
            this.element.jqxMenu('close');
        };
        return Menu;
    })(Component);
    return Menu;
});
