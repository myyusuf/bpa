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

class TreeGrid extends Component{

    dataAdapter: DataAdapter;
    source: any;
    columns: Array<GridColumn>;

    constructor(theOptions: TreeGridOptions) {
        super(theOptions);
        this.dataAdapter = theOptions.dataAdapter;
        this.source = this.dataAdapter.get();
		this.columns = theOptions.columns;

        jqxmenu;
        jqxtreegrid;
    }

    renderTo(theContainer: any){

        var _this = this;

        //this.element = $("<div id=\"" + this.id + "\" style='height: 100%;'><\/div>");
        //this.element.appendTo(theContainer);

        this.element = theContainer;
        this.element.css("border-top", "0");
        this.element.css("border-bottom", "0");
        this.element.css("border-left", "0");
        this.element.css("border-right", "0");

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

        this.element = this.element.jqxTreeGrid(
            {
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
            });

        //var _this = this;
        //
        //$(theContainer).parent().resize(function(){
        //    var _containerHeight = $(theContainer).parent().height();
        //    console.log("theContainer height : " + _containerHeight);
        //    _this.element.jqxGrid({height: _containerHeight-10});
        //});
    }
}

export = TreeGrid;
