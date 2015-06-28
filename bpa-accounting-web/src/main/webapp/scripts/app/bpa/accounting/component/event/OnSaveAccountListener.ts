/**
 * Created by Yusuf on 5/7/2015.
 */

import Account = require("bpa/accounting/model/Account");

interface OnSaveAccountListener {
    (account: Account): void;
}

export = OnSaveAccountListener;
