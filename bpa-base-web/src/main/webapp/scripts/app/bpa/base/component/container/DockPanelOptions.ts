/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import DockPanelItem = require("bpa/base/component/container/DockPanelItem");

interface DockPanelOptions extends ComponentOptions{
    items: Array<DockPanelItem>;
    lastChildFill?: boolean;
}

export = DockPanelOptions;
