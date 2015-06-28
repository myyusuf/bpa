/**
 * Created by Yusuf on 5/6/2015.
 */

import WindowPanelOptions = require("bpa/base/component/container/WindowPanelOptions");

interface AlertWindowOptions extends WindowPanelOptions{
    message: string;
    onOkButtonClick?: any;
    onCancelButtonClick?: any;
}

export = AlertWindowOptions;
