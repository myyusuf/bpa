/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import ClickEventListener = require("bpa/base/component/event/ClickEventListener")
import Account = require("bpa/accounting/model/Account");

interface AccountFormOptions extends ComponentOptions{
    account: Account;
    onValidationSuccess?: any;
}

export = AccountFormOptions;
