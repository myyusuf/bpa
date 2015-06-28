/**
 * Created by Yusuf on 6/24/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");

interface CheckBoxOptions extends ComponentOptions{
    name: string;
    value?: boolean;
    label?: string;
    isRequired?: boolean;
    disabled?: boolean;
}

export = CheckBoxOptions;
