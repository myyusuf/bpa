/**
 * Created by Yusuf on 5/9/2015.
 */
/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import WindowPanel = require("bpa/base/component/container/WindowPanel");
import SelectWindowOptions = require("bpa/base/component/container/SelectWindowOptions");
import SelectWindowContent = require("bpa/base/component/container/SelectWindowContent");
import TableLayout = require("bpa/base/component/layout/TableLayout");
import Button = require("bpa/base/component/Button");
import SimplePanel = require("bpa/base/component/container/SimplePanel");

import DataSourceOptions = require("bpa/base/data/DataSourceOptions");
import DataSource = require("bpa/base/data/DataSource");
import DataAdapter = require("bpa/base/data/DataAdapter");
import GridColumn = require("bpa/base/component/grid/GridColumn");
import DataGridOptions = require("bpa/base/component/grid/DataGridOptions");
import DataGrid = require("bpa/base/component/grid/DataGrid");

import OnSelectDataListener = require("bpa/base/component/container/event/OnSelectDataListener");

class SelectWindow extends WindowPanel{

    dataAdapter: DataAdapter;
    columns: Array<GridColumn>;
    dataGrid: DataGrid;

    onSelectDataListener: OnSelectDataListener;

    constructor(theOptions: SelectWindowOptions) {

        super(theOptions);

        this.dataAdapter = theOptions.dataAdapter;
        this.columns = theOptions.columns;
        this.dataGrid = theOptions.dataGrid;

        this.onSelectDataListener = theOptions.onSelectDataListener;

    }


    buildContentContainer(theContent: Component) : Component{
        var _this = this;

        var _selectButton = new Button(
            {
                label: "Select",
                onClick: function(event){
                    _this.closeWindow();
                    if(_this.onSelectDataListener != undefined){
                        _this.onSelectDataListener(_this.dataGrid.getSelectedData());
                    }
                }
            });

        var _cancelButton = new Button(
            {
                label: "Cancel",
                onClick: function(event){
                    _this.closeWindow();
                }
            });

        var _buttonContainer: TableLayout = new TableLayout({
            rows:[
                {
                    columns:[
                        {widthInPercentage: 98},
                        {content: _cancelButton, widthInPercentage: 1},
                        {content: _selectButton, widthInPercentage: 1},
                    ]
                }
            ]
        });

        var _tableLayout: TableLayout = new TableLayout({
            rows:[
                {
                    columns:[
                        {content: theContent, width: 100},
                    ]
                },
                {
                    columns:[
                        {content: _buttonContainer, width: 100}
                    ]
                }
            ]
        });

        return _tableLayout;
    }

    buildContent() : Component{

        var _dataGridOptions: DataGridOptions = {
            dataAdapter: this.dataAdapter,
            columns: this.columns,
            widthInPercentage: 100,
            heightInPercentage: 100
        }

        this.dataGrid = new DataGrid(_dataGridOptions);

        return this.dataGrid;
    }

}

export  = SelectWindow;
