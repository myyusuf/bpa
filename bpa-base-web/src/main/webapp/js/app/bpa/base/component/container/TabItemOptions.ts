/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import Component = require("bpa/base/component/Component");

interface TabItemOptions extends ComponentOptions{

    tabKey: string;
    caption: string;
    content?: Component;
}

export = TabItemOptions;
