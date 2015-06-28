/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import ClickEventListener = require("bpa/base/component/event/ClickEventListener")
import Journal = require("bpa/accounting/model/Journal");

interface JournalFormOptions extends ComponentOptions{
    journal: Journal;
    onValidationSuccess?: any;
}

export = JournalFormOptions;
