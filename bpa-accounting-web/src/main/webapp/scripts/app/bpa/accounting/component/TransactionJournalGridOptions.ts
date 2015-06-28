/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");

import Journal = require("bpa/accounting/model/Journal");

interface TransactionJournalGridOptions extends ComponentOptions{

    name: string;
    journals: Array<Journal>;
}

export = TransactionJournalGridOptions;
