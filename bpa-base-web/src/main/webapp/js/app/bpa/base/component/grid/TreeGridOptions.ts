/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import DataAdapter = require("bpa/base/data/DataAdapter");
import GridColumn = require("bpa/base/component/grid/GridColumn");

interface TreeGridOptions extends ComponentOptions{
    dataAdapter: DataAdapter;
	columns: Array<GridColumn>;
}

export = TreeGridOptions;
