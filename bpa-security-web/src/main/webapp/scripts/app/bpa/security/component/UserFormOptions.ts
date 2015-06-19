/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");
import ClickEventListener = require("bpa/base/component/event/ClickEventListener")
import User = require("bpa/security/model/User");

interface UserFormOptions extends ComponentOptions{
    user: User;
    onValidationSuccess?: any;
}

export = UserFormOptions;
