/**
 * Created by Yusuf on 5/8/2015.
 */

import Component = require("bpa/base/component/Component");
import ComponentOptions = require("bpa/base/component/ComponentOptions");
import TableColumn = require("bpa/base/component/layout/TableColumn");

interface TableRow extends ComponentOptions{

    columns: Array<TableColumn>;

}

export = TableRow;
