/**
 * Created by Yusuf on 5/6/2015.
 */

import WindowPanelOptions = require("bpa/base/component/container/WindowPanelOptions");

import DataAdapter = require("bpa/base/data/DataAdapter");
import GridColumn = require("bpa/base/component/grid/GridColumn");
import DataGrid = require("bpa/base/component/grid/DataGrid");

import OnSelectDataListener = require("bpa/base/component/container/event/OnSelectDataListener");

interface SelectWindowOptions extends WindowPanelOptions{

    dataAdapter?: DataAdapter;
    columns?: Array<GridColumn>;
    dataGrid?: DataGrid;

    onSelectDataListener?: OnSelectDataListener;
}

export = SelectWindowOptions;
