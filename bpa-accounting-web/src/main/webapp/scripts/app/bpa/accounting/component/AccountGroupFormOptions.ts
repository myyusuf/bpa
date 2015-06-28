/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import ClickEventListener = require("bpa/base/component/event/ClickEventListener")
import AccountGroup = require("bpa/accounting/model/AccountGroup");

interface AccountGroupFormOptions extends ComponentOptions{
    accountGroup: AccountGroup;
    onValidationSuccess?: any;
}

export = AccountGroupFormOptions;
