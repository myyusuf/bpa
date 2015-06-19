/**
 * Created by Yusuf on 5/7/2015.
 */

import Model = require("bpa/base/model/Model");

interface OnSelectDataListener {
    (model: Model): void;
}

export = OnSelectDataListener;
