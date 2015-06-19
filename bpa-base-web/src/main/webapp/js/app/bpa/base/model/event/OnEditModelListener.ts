/**
 * Created by Yusuf on 6/8/2015.
 */

import Model = require("bpa/base/model/Model");

interface onEditModelListener {
    (newModel: Model): void;
}

export = onEditModelListener;