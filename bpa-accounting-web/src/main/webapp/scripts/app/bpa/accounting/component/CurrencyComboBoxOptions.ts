/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");

import Currency = require("bpa/accounting/model/Currency");

interface CurrencyComboBoxOptions extends ComponentOptions{
    name: string;
    value?: any;
    isRequired?: boolean;

    onChange?: any;

}

export = CurrencyComboBoxOptions;
