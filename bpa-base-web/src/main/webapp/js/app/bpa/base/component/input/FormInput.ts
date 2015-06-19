/**
 * Created by Yusuf on 5/6/2015.
 */

import ValidatorRule = require("bpa/base/component/input/ValidatorRule");

interface FormInput{
    setValue(any: string): void;
    getValue(): any;
    name: string;
    validatorRules: Array<ValidatorRule>;
}

export = FormInput;
