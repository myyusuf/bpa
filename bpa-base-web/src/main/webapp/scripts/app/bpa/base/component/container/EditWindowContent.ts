/**
 * Created by Yusuf on 5/6/2015.
 */

import Component = require("bpa/base/component/Component");

interface EditWindowContent{
    content: Component;
    onSaveButtonClick?: any;
    onCancelButtonClick?: any;
}

export = EditWindowContent;
