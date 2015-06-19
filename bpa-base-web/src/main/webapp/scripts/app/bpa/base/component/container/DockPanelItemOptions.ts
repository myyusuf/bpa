/**
 * Created by Yusuf on 5/8/2015.
 */

import Component = require("bpa/base/component/Component");

interface DockPanelItemOptions{

    width?: string;
    height?: number;
    dock?: string;
    backgroundColor?: string;
    content?: Component;
    htmlContent?: any;
    dynamicHeight?: boolean;

}

export = DockPanelItemOptions;
