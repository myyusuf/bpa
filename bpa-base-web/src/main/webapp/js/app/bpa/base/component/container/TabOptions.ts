/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import TabItem = require("bpa/base/component/container/TabItem");

interface TabOptions extends ComponentOptions{
    selectionTracker: boolean;
    items: Array<TabItem>;
}

export = TabOptions;
