/**
 * Created by Yusuf on 5/7/2015.
 */

import Group = require("bpa/security/model/Group");

interface OnSaveGroupListener {
    (group: Group): void;
}

export = OnSaveGroupListener;
