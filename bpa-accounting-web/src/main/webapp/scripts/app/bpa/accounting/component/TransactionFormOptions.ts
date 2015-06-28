/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import ClickEventListener = require("bpa/base/component/event/ClickEventListener")
import Transaction = require("bpa/accounting/model/Transaction");

interface TransactionFormOptions extends ComponentOptions{
    transaction: Transaction;
    onValidationSuccess?: any;
}

export = TransactionFormOptions;
