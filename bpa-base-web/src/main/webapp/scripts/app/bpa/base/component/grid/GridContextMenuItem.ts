/**
 * Created by Yusuf on 5/8/2015.
 */

import GridContextMenuClickListener = require("bpa/base/component/grid/GridContextMenuClickListener");

interface GridContextMenuItem{

    id: string;
    parentid?: string;
    text: string;
    subMenuWidth?: string;
    onClick?: GridContextMenuClickListener;

}

export = GridContextMenuItem;
