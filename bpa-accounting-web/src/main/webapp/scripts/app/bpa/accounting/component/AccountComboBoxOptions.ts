/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");

import Account = require("bpa/accounting/model/Account");

interface AccountComboBoxOptions extends ComponentOptions{
    name: string;
    value?: any;
    isRequired?: boolean;
}

export = AccountComboBoxOptions;
