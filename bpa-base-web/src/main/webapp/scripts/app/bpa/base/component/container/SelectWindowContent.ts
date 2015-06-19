/**
 * Created by Yusuf on 5/6/2015.
 */

import Component = require("bpa/base/component/Component");

interface SelectWindowContent{
    content: Component;
    onSelectButtonClick?: any;
    onCancelButtonClick?: any;
}

export = SelectWindowContent;
