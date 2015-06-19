/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import Component = require("bpa/base/component/Component");

interface WindowOptions extends ComponentOptions{
    title?: string;
    titleIconUrl?: string;
    content?: Component;
}

export = WindowOptions;
