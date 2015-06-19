/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import TreeItem = require("bpa/base/component/TreeItem");
import SelectTreeItemEventListener = require("bpa/base/component/event/SelectTreeItemEventListener");

interface TreeOptions extends ComponentOptions{
    items: Array<TreeItem>;
    onSelectItem?: SelectTreeItemEventListener;
    showBorder?: boolean;
}

export = TreeOptions;
