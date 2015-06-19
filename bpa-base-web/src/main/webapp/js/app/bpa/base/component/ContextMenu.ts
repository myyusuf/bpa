/**
 * Created by Yusuf on 5/13/2015.
 */

/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxmenu = require("jqxmenu");
import Component = require("bpa/base/component/Component");
import ContextMenuOptions = require("bpa/base/component/ContextMenuOptions");
import MenuItem = require("bpa/base/component/MenuItem");

import DataSource = require("bpa/base/data/DataSource");
import DataSourceOptions = require("bpa/base/data/DataSourceOptions");
import DataAdapter = require("bpa/base/data/DataAdapter");

class ContextMenu extends Component{
    items: Array<MenuItem>;
    _itemsMap: any = {};

    constructor(theOptions: ContextMenuOptions) {
        super(theOptions);

        this.items = theOptions.items;

        jqxmenu;
    }

    renderTo(theContainer: any){

        var _this = this;
        this.element = $("<div id=\"" + this.id + "\"><\/div>");
        this.element.appendTo(theContainer);

        var _dataSourceOptions: DataSourceOptions = {
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
        var _records = _dataAdapter.get().getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label'}]);

        this.element = this.element.jqxMenu({source: _records, width: this.width, height: this.height,theme: this.theme});


        for(var _i = 0; _i< this.items.length; _i++){
            this._itemsMap[this.items[_i].id] = this.items[_i];
        }
        this.element.on('itemclick', function (event)
        {
            // get the clicked LI element.
            var _childId = event.args.id;
            console.log(_childId);
            _this._itemsMap[_childId].onClick(event);
        });
    }
}

export = ContextMenu;
