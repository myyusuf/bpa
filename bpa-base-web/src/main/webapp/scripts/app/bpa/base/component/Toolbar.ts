/**
 * Created by Yusuf on 6/14/2015.
 */

/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import ToolbarOptions = require("bpa/base/component/ToolbarOptions");
import TableLayout = require("bpa/base/component/layout/TableLayout");
import TableColumn = require("bpa/base/component/layout/TableColumn");

class Toolbar extends Component{

    items: Array<Component>;
    _columns: Array<TableColumn> = [];

    constructor(theOptions: ToolbarOptions){
        super(theOptions);

        this.items = theOptions.items;
    }

    renderTo(theContainer: any){

        var _this = this;

        this.element = $("<div id=\"" + this.id + "\" style=\"height: 100%;\"><\/div>");
        this.element.appendTo(theContainer);

        this.items.forEach(item=>{
            _this._columns.push({
                content: item
            });
        });

        var _tableLayout: TableLayout = new TableLayout({
            rows: [{
                columns: _this._columns
            }],
        });

        _tableLayout.renderTo(this.element);
    }

}

export = Toolbar;
