/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import ClickEventListener = require("bpa/base/component/event/ClickEventListener");

interface ButtonOptions extends ComponentOptions{
    label: string;
    onClick: ClickEventListener;
}

export = ButtonOptions;
