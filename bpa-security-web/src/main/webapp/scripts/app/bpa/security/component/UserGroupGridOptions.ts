/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");

import Group = require("bpa/security/model/Group");

interface UserGroupGridOptions extends ComponentOptions{

    name: string;
    groups: Array<Group>;
}

export = UserGroupGridOptions;
