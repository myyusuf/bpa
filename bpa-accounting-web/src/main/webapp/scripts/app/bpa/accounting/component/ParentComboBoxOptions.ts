/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");

import Account = require("bpa/accounting/model/Account");

interface ParentComboBoxOptions extends ComponentOptions{
    name: string;
    value?: any;
    isRequired?: boolean;

    groupCode: string;
    //editedAccountCode: string;

}

export = ParentComboBoxOptions;
