/**
 * Created by Yusuf on 5/7/2015.
 */

import User = require("bpa/security/model/User");

interface OnSaveUserListener {
    (user: User): void;
}

export = OnSaveUserListener;
