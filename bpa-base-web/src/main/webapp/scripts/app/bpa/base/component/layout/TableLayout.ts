/**
 * Created by Yusuf on 5/5/2015.
 */

/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import TableLayoutOptions = require("bpa/base/component/layout/TableLayoutOptions");
import TableRow = require("bpa/base/component/layout/TableRow");
import Layout = require("bpa/base/component/layout/Layout");

class TableLayout extends Layout{

    classStyling: string;
    rows: Array<TableRow>;

    constructor(theOptions: TableLayoutOptions) {
        super(theOptions);

        this.rows = theOptions.rows;
        this.classStyling = theOptions.classStyling;

    }

    renderTo(theContainer: any){

        var _table = $("<table><\/table>");
        this.element = _table;
        this.element.appendTo(theContainer);

        var _width: any = '100%';
        if(this.widthInPercentage != undefined){
            _width = this.widthInPercentage + '%';
        }
        if(this.width != undefined){
            _width = this.width;
        }

        var _height: any = '100%';
        if(this.heightInPercentage != undefined){
            _height = this.heightInPercentage + '%';
        }
        if(this.height != undefined){
            _height = this.height;
        }

        _table.css("width", _width);
        _table.css("height", _height);

        if(this.classStyling != undefined && this.classStyling != null){
            _table.addClass(this.classStyling);
        }

        this.rows.forEach(row=>{
            var _tableRow = $("<tr><\/tr>");
            _tableRow.appendTo(_table);

            row.columns.forEach(column=>{

                var _rowColumn = $("<td><\/td>");
                _rowColumn.appendTo(_tableRow);

                var _columnWidth:string = "";
                if(column.widthInPercentage != undefined){
                    _columnWidth = column.widthInPercentage + '%';
                }
                if(column.width != undefined){
                    _columnWidth = column.width + 'px';
                }

                var _columnHeight:string = "";
                if(column.heightInPercentage != undefined){
                    _columnHeight = column.heightInPercentage + '%';
                }
                if(column.height != undefined){
                    _columnHeight = column.height  + 'px';
                }

                if(_columnWidth != ""){
                    _rowColumn.css("width", _columnWidth);
                }
                if(_columnHeight != ""){
                    _rowColumn.css("height", _columnHeight);
                }

                if(column.colspan != undefined && column.colspan != null){
                    _rowColumn.attr('colspan', column.colspan);
                }

                if(column.content != undefined && column.content != null){
                    column.content.renderTo(_rowColumn);
                }
            });
        });

    }

}

export = TableLayout;