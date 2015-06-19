/**
 * Created by Yusuf on 5/5/2015.
 */

/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxgrid = require("jqxgrid");
import jqxmenu = require("jqxmenu");
import Component = require("bpa/base/component/Component");
import DataGridOptions = require("bpa/base/component/grid/DataGridOptions");
import GridColumn = require("bpa/base/component/grid/GridColumn");
import DataAdapter = require("bpa/base/data/DataAdapter");

import Menu = require("bpa/base/component/Menu");
import MenuOptions = require("bpa/base/component/MenuOptions");
import GridContextMenuItem = require("bpa/base/component/grid/GridContextMenuItem");

class DataGrid extends Component{

    dataAdapter: DataAdapter;
    source: any;
    columns: Array<GridColumn>;
    contextMenuItems: Array<GridContextMenuItem>;

    pagable: boolean;
    virtualMode: boolean;
    showBorder: boolean;

    toolbar: Component;

    constructor(theOptions: DataGridOptions) {
        super(theOptions);
        this.dataAdapter = theOptions.dataAdapter;
        this.source = this.dataAdapter.get();
		this.columns = theOptions.columns;
        this.contextMenuItems = theOptions.contextMenuItems;

        if(theOptions.pagable != undefined){
            this.pagable = theOptions.pagable;
        }else{
            this.pagable = true;
        }

        if(theOptions.virtualMode != undefined){
            this.virtualMode = theOptions.virtualMode;
        }else{
            this.virtualMode = true;
        }

        if(theOptions.showBorder != undefined){
            this.showBorder = theOptions.showBorder;
        }else{
            this.showBorder = false;
        }

        this.toolbar = theOptions.toolbar;

        jqxmenu;
        jqxgrid;
    }

    refreshGrid(): void {
        this.element.jqxGrid('updatebounddata');
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
        }

        if(this.virtualMode){
            _jqxGridOptions["virtualmode"] = true;
            _jqxGridOptions["rendergridrows"] = function () {
                return _this.source.records;
            };
        }

        if(this.toolbar != undefined){
            _jqxGridOptions["showtoolbar"] = true;
            _jqxGridOptions["toolbarheight"] = 40;
            _jqxGridOptions["rendertoolbar"] = function(toolbar) {
                toolbar.empty();

                var _toolbarContainer = $("<div style='float: left; margin: 5px; text-align: right;'></div>");
                toolbar.append(_toolbarContainer);

                _this.toolbar.renderTo(_toolbarContainer);
            }

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

                                var _rowIndex = _this.element.jqxGrid('getselectedrowindex');
                                var _rowData = _this.element.jqxGrid('getrowdata', _rowIndex);

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

            var _isRightClick = function(event) {
                var _rightclick;
                if (!event) var event = window.event;
                if (event.which) _rightclick = (event.which == 3);
                else if (event.button) _rightclick = (event.button == 2);
                return _rightclick;
            }

            this.element.on('contextmenu', function (e) {
                return false;
            });

            this.element.on('rowclick', function (event) {

                var _args = event.args, _clickEvent = _args.originalEvent, _rowIndex = _args.rowindex;

                var _rightClick = _isRightClick(_clickEvent);
                if (_rightClick) {
                    if(_this.element.jqxGrid('getselectedrowindex') === -1){
                        _this.element.jqxGrid('selectrow', _rowIndex);
                    }

                    var _scrollTop = $(window).scrollTop();
                    var _scrollLeft = $(window).scrollLeft();
                    _menu.openPopup(parseInt(_clickEvent.clientX) + 5 + _scrollLeft, parseInt(_clickEvent.clientY) + 5 + _scrollTop);
                    return false;
                }else{
                    _menu.closePopup();
                }
            });
        }


        //---------------------------
    }

    getSelectedData = function(){
        var _rowIndex = this.element.jqxGrid('getselectedrowindex');
        var _rowData = this.element.jqxGrid('getrowdata', _rowIndex);
        return _rowData;
    }

}

export = DataGrid;
