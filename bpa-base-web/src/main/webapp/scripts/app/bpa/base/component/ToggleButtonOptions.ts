/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import OnToggleButtonClickListener = require("bpa/base/component/event/OnToggleButtonClickListener");

interface ToggleButtonOptions extends ComponentOptions{
    activeLabel?: string;
    inactiveLabel?: string;
    onClick?: OnToggleButtonClickListener;
}

export = ToggleButtonOptions;
