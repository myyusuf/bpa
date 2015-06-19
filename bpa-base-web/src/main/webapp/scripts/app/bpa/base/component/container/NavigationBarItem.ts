/**
 * Created by Yusuf on 5/8/2015.
 */

import Component = require("bpa/base/component/Component");

interface NavigationBarItem{

    label: string;
    iconUrl?: string;
    iconAlt?: string;
    content?: Component;

}

export = NavigationBarItem;
