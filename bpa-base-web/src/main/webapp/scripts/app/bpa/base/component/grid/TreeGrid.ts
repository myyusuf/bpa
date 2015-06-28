/**
 * Created by Yusuf on 5/5/2015.
 */

/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxtreegrid = require("jqxtreegrid");
import jqxmenu = require("jqxmenu");
import Component = require("bpa/base/component/Component");
import TreeGridOptions = require("bpa/base/component/grid/TreeGridOptions");
import GridColumn = require("bpa/base/component/grid/GridColumn");
import DataAdapter = require("bpa/base/data/DataAdapter");

import Menu = require("bpa/base/component/Menu");
import MenuOptions = require("bpa/base/component/MenuOptions");
import GridContextMenuItem = require("bpa/base/component/grid/GridContextMenuItem");

class TreeGrid extends Component{

    dataAdapter: DataAdapter;
    source: any;
    columns: Array<GridColumn>;

    showBorder: boolean;

    contextMenuItems: Array<GridContextMenuItem>;

    toolbar: Component;

    constructor(theOptions: TreeGridOptions) {
        super(theOptions);
        this.dataAdapter = theOptions.dataAdapter;
        this.source = this.dataAdapter.get();
		this.columns = theOptions.columns;
        this.contextMenuItems = theOptions.contextMenuItems;

        if(theOptions.showBorder != undefined){
            this.showBorder = theOptions.showBorder;
        }else{
            this.showBorder = false;
        }

        this.toolbar = theOptions.toolbar;

        jqxmenu;
        jqxtreegrid;
    }

    refreshGrid(): void {
        this.element.jqxTreeGrid('updateBoundData');
    }

    renderTo(theContainer: any){

        var _this = this;

        //this.element = $("<div id=\"" + this.id + "\" style='height: 100%;'><\/div>");
        //this.element.appendTo(theContainer);

        this.element = theContainer;

        if(!this.showBorder){
            this.element.css("border-top", "0");
            this.element.css("border-bottom", "0");
            this.element.css("border-left", "0");
            this.element.css("border-right", "0");
        }

        var _width: any = '100%';
        if(this.widthInPercentage != undefined){
            _width = this.widthInPercentage + '%';
            //_width = "calc(" + this.widthInPercentage + "% - 1px)";
        }
        if(this.width != undefined){
            _width = this.width;
        }

        var _height: any = '100%';
        if(this.heightInPercentage != undefined){
            _height = this.heightInPercentage + '%';
            //_height = "calc(" + this.heightInPercentage + "% - 1px)" ;
        }
        if(this.height != undefined){
            _height = this.height;
        }

        var _jqxTreeGridOptions = {
            width: _width,
            height: _height,
            source: this.dataAdapter.get(),
            pageable: true,
            //autoheight: false,
            //sortable: true,
            //altrows: true,
            //enabletooltips: true,
            //editable: false,
            //selectionmode: 'singlerow',


            pagerMode: 'advanced',
            showToolbar: false,
            sortable: true,
            filterable: true,
            columns: this.columns,
            theme: this.theme
        }

        this.element = this.element.jqxTreeGrid(_jqxTreeGridOptions);

        if(this.toolbar != undefined){
            _jqxTreeGridOptions["showToolbar"] = true;
            _jqxTreeGridOptions["toolbarHeight"] = 40;
            _jqxTreeGridOptions["renderToolbar"] = function(toolbar) {
                toolbar.empty();

                var _toolbarContainer = $("<div style='float: left; margin: 5px; text-align: right;'></div>");
                toolbar.append(_toolbarContainer);

                _this.toolbar.renderTo(_toolbarContainer);
            }

        }

        if(this.contextMenuItems != undefined){

            var _menuItems = [];
            var _contextMenuItemMap = {};

            for(var _i=0; _i<this.contextMenuItems.length; _i++){
                var _contextMenuItem = this.contextMenuItems[_i];
                _contextMenuItemMap[_contextMenuItem.id] = _contextMenuItem.onClick;

                var _menuItem = {
                    "id": _contextMenuItem.id,
                    "text": _contextMenuItem.text,
                    "parentid": _contextMenuItem.parentid,
                    "subMenuWidth": _contextMenuItem.subMenuWidth,
                    "onClick" : function(){

                        //var _rowIndex = _this.element.jqxTreeGrid('getSelectedRowIndex');
                        //var _rowData = _this.element.jqxTreeGrid('getRowData', _rowIndex);

                        var _rowData = null;

                        var _selection = _this.element.jqxTreeGrid('getSelection');
                        if(_selection){
                            for (var i = 0; i < _selection.length; i++) {
                                _rowData = _selection[i];
                            }
                        }

                        _contextMenuItemMap[this.id](_rowData);

                    }
                }

                _menuItems.push(_menuItem);

            }


            var _menuOptions: MenuOptions = {
                mode: "popup",
                items: _menuItems,
                width: 100
            };

            var _menu = new Menu(_menuOptions);

            var _menuContainer = $("<div id=\"" + this.id + "\" style='height: 100%;'><\/div>");
            _menuContainer.appendTo(this.element);

            _menu.renderTo(_menuContainer);

            var _isRightClick = function(event: any) {
                var _rightclick;
                if (!event) var event = window.event;
                if (event.which) _rightclick = (event.which == 3);
                else if (event.button) _rightclick = (event.button == 2);
                return _rightclick;
            }

            this.element.on('contextmenu', function (e) {
                return false;
            });

            this.element.on('rowClick', function (event) {

                var _args = event.args, _clickEvent = _args.originalEvent, _rowIndex = _args.rowindex;

                var _rightClick = _isRightClick(_clickEvent);
                if (_rightClick) {
                    //if(_this.element.jqxTreeGrid('getSelectedRowIndex') === -1){
                    //    _this.element.jqxTreeGrid('selectRow', _rowIndex);
                    //}

                    var _scrollTop = $(window).scrollTop();
                    var _scrollLeft = $(window).scrollLeft();
                    _menu.openPopup(parseInt(_clickEvent.clientX) + 5 + _scrollLeft, parseInt(_clickEvent.clientY) + 5 + _scrollTop);
                    return false;
                }else{
                    _menu.closePopup();
                }
            });
        }

        //var _this = this;
        //
        //$(theContainer).parent().resize(function(){
        //    var _containerHeight = $(theContainer).parent().height();
        //    console.log("theContainer height : " + _containerHeight);
        //    _this.element.jqxGrid({height: _containerHeight-10});
        //});
    }

    getSelectedData = function(){
        var _rowData = null;

        var _selection = this.element.jqxTreeGrid('getSelection');
        if(_selection){
            for (var i = 0; i < _selection.length; i++) {
                _rowData = _selection[i];
            }
        }
        return _rowData;
    }
}

export = TreeGrid;
