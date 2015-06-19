/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import MenuItem = require("bpa/base/component/MenuItem");

interface MenuOptions extends ComponentOptions{
    mode?: string;
    items: Array<MenuItem>;
}

export = MenuOptions;
