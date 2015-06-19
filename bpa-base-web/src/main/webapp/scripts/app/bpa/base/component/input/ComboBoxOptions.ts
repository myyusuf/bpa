/**
 * Created by Yusuf on 5/23/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import DataAdapter = require("bpa/base/data/DataAdapter");

interface ComboBoxOptions extends ComponentOptions{
    dataAdapter: DataAdapter;
    displayMember: string;
    valueMember: string;
}

export = ComboBoxOptions;
