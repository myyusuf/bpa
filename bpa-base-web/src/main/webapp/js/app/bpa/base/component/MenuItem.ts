/**
 * Created by Yusuf on 5/8/2015.
 */

import ClickEventListener = require("bpa/base/component/event/ClickEventListener");

interface MenuItem{

    id: string;
    parentid?: string;
    text: string;
    subMenuWidth?: string;
    onClick?: ClickEventListener;

}

export = MenuItem;
