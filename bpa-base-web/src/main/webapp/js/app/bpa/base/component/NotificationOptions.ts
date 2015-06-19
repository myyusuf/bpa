/**
 * Created by Yusuf on 5/6/2015.
 */

import ComponentOptions = require("bpa/base/component/ComponentOptions");

interface NotificationOptions extends ComponentOptions{
    label: string;
    position?: string;
    opacity?: number;
    autoOpen?: boolean;
    animationOpenDelay?: number;
    autoClose?: boolean;
    autoCloseDelay?: number;
    template?: string;
}

export = NotificationOptions;
