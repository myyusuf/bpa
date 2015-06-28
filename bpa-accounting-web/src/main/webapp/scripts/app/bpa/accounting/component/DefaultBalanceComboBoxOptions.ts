/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");

import DefaultBalance = require("bpa/accounting/model/DefaultBalance");

interface DefaultBalanceComboBoxOptions extends ComponentOptions{
    name: string;
    value?: any;
    isRequired?: boolean;

    onChange?: any;

}

export = DefaultBalanceComboBoxOptions;
