/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import TableRow = require("bpa/base/component/layout/TableRow");

interface TableLayoutOptions extends ComponentOptions{
    classStyling?: string;
    rows: Array<TableRow>;
}

export = TableLayoutOptions;
