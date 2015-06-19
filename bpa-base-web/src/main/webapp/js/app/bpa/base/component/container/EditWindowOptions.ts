/**
 * Created by Yusuf on 5/6/2015.
 */

import WindowPanelOptions = require("bpa/base/component/container/WindowPanelOptions");

interface EditWindowOptions extends WindowPanelOptions{
    onSaveButtonClick?: any;
    onCancelButtonClick?: any;
}

export = EditWindowOptions;
