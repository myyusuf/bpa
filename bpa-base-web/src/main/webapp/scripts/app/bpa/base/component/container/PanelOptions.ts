/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("componentoptions");
import ClickEvent = require("clickevent");
import Component = require("component");

interface PanelOptions extends ComponentOptions{
    caption: string;
    onClick: ClickEvent;
    content: Component;
}

export = PanelOptions;
