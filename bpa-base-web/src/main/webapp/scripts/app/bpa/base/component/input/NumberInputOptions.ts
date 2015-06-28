/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");

interface NumberInputOptions extends ComponentOptions{
    name: string;
    value?: string;
    isRequired?: boolean;
    minLength?: number;
    maxLength?: number;
    disabled?: boolean;

    digits?: number;
    decimalDigits?: number;
    max?: number;

    showSpinButtons?: boolean;
}

export = NumberInputOptions;
