/**
 * Created by Yusuf on 5/8/2015.
 */

import Component = require("bpa/base/component/Component");

interface TreeItem{

    icon?: string;
    label: string;
    value?: any;
    expanded?: boolean;
    selected?: boolean;
    items?: Array<TreeItem>;

}

export = TreeItem;
