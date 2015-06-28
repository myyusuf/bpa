/**
 * Created by Yusuf on 5/7/2015.
 */

import AccountGroup = require("bpa/accounting/model/AccountGroup");

interface OnSaveAccountGroupListener {
    (accountGroup: AccountGroup): void;
}

export = OnSaveAccountGroupListener;
