/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import NavigationBarItem = require("bpa/base/component/container/NavigationBarItem");

interface NavigationBarOptions extends ComponentOptions{

    items: Array<NavigationBarItem>;
}

export = NavigationBarOptions;
