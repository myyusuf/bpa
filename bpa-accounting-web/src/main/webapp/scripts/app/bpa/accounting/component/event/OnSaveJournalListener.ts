/**
 * Created by Yusuf on 5/7/2015.
 */

import Journal = require("bpa/accounting/model/Journal");

interface OnSaveJournalListener {
    (journal: Journal): void;
}

export = OnSaveJournalListener;
