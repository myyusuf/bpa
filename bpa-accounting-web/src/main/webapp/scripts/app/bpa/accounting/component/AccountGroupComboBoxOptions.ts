/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");

import AccountGroup = require("bpa/accounting/model/AccountGroup");

interface AccountGroupComboBoxOptions extends ComponentOptions{
    name: string;
    value?: any;
    isRequired?: boolean;

    onChange?: any;

}

export = AccountGroupComboBoxOptions;
