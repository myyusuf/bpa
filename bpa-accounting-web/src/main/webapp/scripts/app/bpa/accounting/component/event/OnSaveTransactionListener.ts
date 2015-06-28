/**
 * Created by Yusuf on 5/7/2015.
 */

import Transaction = require("bpa/accounting/model/Transaction");

interface OnSaveTransactionListener {
    (transaction: Transaction): void;
}

export = OnSaveTransactionListener;
