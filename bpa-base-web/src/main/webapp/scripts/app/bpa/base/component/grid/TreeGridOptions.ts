/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import DataAdapter = require("bpa/base/data/DataAdapter");
import GridColumn = require("bpa/base/component/grid/GridColumn");

import GridContextMenuItem = require("bpa/base/component/grid/GridContextMenuItem");
import Component = require("bpa/base/component/Component");

interface TreeGridOptions extends ComponentOptions{
    dataAdapter: DataAdapter;
	columns: Array<GridColumn>;
    contextMenuItems?: Array<GridContextMenuItem>;

    showBorder?: boolean;

    toolbar?: Component;
}

export = TreeGridOptions;
