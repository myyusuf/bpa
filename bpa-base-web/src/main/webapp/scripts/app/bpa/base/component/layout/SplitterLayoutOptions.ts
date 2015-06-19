/**
 * Created by Yusuf on 5/6/2015.
 */

import LayoutOptions = require("bpa/base/component/layout/LayoutOptions");
import SplitterLayoutPanel = require("bpa/base/component/layout/SplitterLayoutPanel");

interface SplitterLayoutOptions extends LayoutOptions{
    orientation?: string;
    panels: Array<SplitterLayoutPanel>;
}

export = SplitterLayoutOptions;
