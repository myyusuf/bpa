/**
 * Created by Yusuf on 5/7/2015.
 */

import Group = require("bpa/security/model/Group");

interface OnSelectGroupListener {
    (group: Group): void;
}

export = OnSelectGroupListener;
