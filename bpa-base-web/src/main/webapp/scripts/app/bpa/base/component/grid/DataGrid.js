/**
 * Created by Yusuf on 5/5/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "jqxgrid", "jqxmenu", "bpa/base/component/Component", "bpa/base/component/Menu"], function (require, exports, $, jqxgrid, jqxmenu, Component, Menu) {
    var DataGrid = (function (_super) {
        __extends(DataGrid, _super);
        function DataGrid(theOptions) {
            _super.call(this, theOptions);
            this.getSelectedData = function () {
                var _rowIndex = this.element.jqxGrid('getselectedrowindex');
                var _rowData = this.element.jqxGrid('getrowdata', _rowIndex);
                return _rowData;
            };
            this.dataAdapter = theOptions.dataAdapter;
            this.source = this.dataAdapter.get();
            this.columns = theOptions.columns;
            this.contextMenuItems = theOptions.contextMenuItems;
            if (theOptions.pagable != undefined) {
                this.pagable = theOptions.pagable;
            }
            else {
                this.pagable = true;
            }
            if (theOptions.virtualMode != undefined) {
                this.virtualMode = theOptions.virtualMode;
            }
            else {
                this.virtualMode = true;
            }
            if (theOptions.showBorder != undefined) {
                this.showBorder = theOptions.showBorder;
            }
            else {
                this.showBorder = false;
            }
            this.toolbar = theOptions.toolbar;
            jqxmenu;
            jqxgrid;
        }
        DataGrid.prototype.refreshGrid = function () {
            this.element.jqxGrid('updatebounddata');
        };
        DataGrid.prototype.renderTo = function (theContainer) {
            var _this = this;
            //this.element = $("<div id=\"" + this.id + "\" style='height: 100%;'><\/div>");
            //this.element.appendTo(theContainer);
            this.element = theContainer;
            if (!this.showBorder) {
                this.element.css("border-top", "0");
                this.element.css("border-bottom", "0");
                this.element.css("border-left", "0");
                this.element.css("border-right", "0");
            }
            var _width = '100%';
            if (this.widthInPercentage != undefined) {
                _width = this.widthInPercentage + '%';
            }
            if (this.width != undefined) {
                _width = this.width;
            }
            var _height = '100%';
            if (this.heightInPercentage != undefined) {
                _height = this.heightInPercentage + '%';
            }
            if (this.height != undefined) {
                _height = this.height;
            }
            var _jqxGridOptions = {
                width: _width,
                height: _height,
                source: this.dataAdapter.get(),
                pageable: this.pagable,
                autoheight: false,
                sortable: true,
                altrows: true,
                enabletooltips: true,
                editable: false,
                selectionmode: 'singlerow',
                /*columns: [
                 { text: 'Code', datafield: 'code', width: '50%' },
                 { text: 'Name', datafield: 'name', width: '50%' }
                 ],*/
                columns: this.columns,
                pagesizeoptions: ['5', '10', '20', '100'],
                theme: this.theme
            };
            if (this.virtualMode) {
                _jqxGridOptions["virtualmode"] = true;
                _jqxGridOptions["rendergridrows"] = function () {
                    return _this.source.records;
                };
            }
            if (this.toolbar != undefined) {
                _jqxGridOptions["showtoolbar"] = true;
                _jqxGridOptions["toolbarheight"] = 40;
                _jqxGridOptions["rendertoolbar"] = function (toolbar) {
                    toolbar.empty();
                    var _toolbarContainer = $("<div style='float: left; margin: 5px; text-align: right;'></div>");
                    toolbar.append(_toolbarContainer);
                    _this.toolbar.renderTo(_toolbarContainer);
                };
            }
            this.element = this.element.jqxGrid(_jqxGridOptions);
            //var _this = this;
            //
            //$(theContainer).parent().resize(function(){
            //    var _containerHeight = $(theContainer).parent().height();
            //    console.log("theContainer height : " + _containerHeight);
            //    _this.element.jqxGrid({height: _containerHeight-10});
            //});
            //---------------------------
            if (this.contextMenuItems != undefined) {
                var _menuItems = [];
                var _contextMenuItemMap = {};
                for (var _i = 0; _i < this.contextMenuItems.length; _i++) {
                    var _contextMenuItem = this.contextMenuItems[_i];
                    _contextMenuItemMap[_contextMenuItem.id] = _contextMenuItem.onClick;
                    var _menuItem = {
                        "id": _contextMenuItem.id,
                        "text": _contextMenuItem.text,
                        "parentid": _contextMenuItem.parentid,
                        "subMenuWidth": _contextMenuItem.subMenuWidth,
                        "onClick": function () {
                            var _rowIndex = _this.element.jqxGrid('getselectedrowindex');
                            var _rowData = _this.element.jqxGrid('getrowdata', _rowIndex);
                            _contextMenuItemMap[this.id](_rowData);
                        }
                    };
                    _menuItems.push(_menuItem);
                }
                var _menuOptions = {
                    mode: "popup",
                    items: _menuItems,
                    width: 100
                };
                var _menu = new Menu(_menuOptions);
                var _menuContainer = $("<div id=\"" + this.id + "\" style='height: 100%;'><\/div>");
                _menuContainer.appendTo(this.element);
                _menu.renderTo(_menuContainer);
                var _isRightClick = function (event) {
                    var _rightclick;
                    if (!event)
                        var event = window.event;
                    if (event.which)
                        _rightclick = (event.which == 3);
                    else if (event.button)
                        _rightclick = (event.button == 2);
                    return _rightclick;
                };
                this.element.on('contextmenu', function (e) {
                    return false;
                });
                this.element.on('rowclick', function (event) {
                    var _args = event.args, _clickEvent = _args.originalEvent, _rowIndex = _args.rowindex;
                    var _rightClick = _isRightClick(_clickEvent);
                    if (_rightClick) {
                        if (_this.element.jqxGrid('getselectedrowindex') === -1) {
                            _this.element.jqxGrid('selectrow', _rowIndex);
                        }
                        var _scrollTop = $(window).scrollTop();
                        var _scrollLeft = $(window).scrollLeft();
                        _menu.openPopup(parseInt(_clickEvent.clientX) + 5 + _scrollLeft, parseInt(_clickEvent.clientY) + 5 + _scrollTop);
                        return false;
                    }
                    else {
                        _menu.closePopup();
                    }
                });
            }
            //---------------------------
        };
        return DataGrid;
    })(Component);
    return DataGrid;
});
