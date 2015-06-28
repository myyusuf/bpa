/**
 * Created by Yusuf on 5/8/2015.
 */

import Component = require("bpa/base/component/Component");
import ComponentOptions = require("bpa/base/component/ComponentOptions");

interface TableColumn extends ComponentOptions{

    colspan?: number;
    content?: Component;

}

export = TableColumn;
