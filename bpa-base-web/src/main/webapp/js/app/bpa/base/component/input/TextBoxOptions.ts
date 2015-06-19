/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");

interface TextBoxOptions extends ComponentOptions{
    name: string;
    value?: string;
    placeHolder?: string;
    isRequired?: boolean;
    minLength?: number;
    maxLength?: number;
    disabled?: boolean;
}

export = TextBoxOptions;
