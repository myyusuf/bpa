/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import ClickEventListener = require("bpa/base/component/event/ClickEventListener")
import Group = require("bpa/security/model/Group");

interface GroupFormOptions extends ComponentOptions{
    group: Group;
    onValidationSuccess?: any;
}

export = GroupFormOptions;
