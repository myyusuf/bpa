/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");

interface RadioButtonOptions extends ComponentOptions{
    name: string;
    value?: string;
    label?: string;
    isRequired?: boolean;
    disabled?: boolean;
}

export = RadioButtonOptions;
