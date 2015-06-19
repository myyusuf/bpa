/**
 * Created by Yusuf on 5/5/2015.
 */
/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
//import SplitterLayoutPanelOptions = require("bpa/base/component/layout/SplitterLayoutPanelOptions");

interface SplitterLayoutPanel{
//class SplitterLayoutPanel extends Component{

   /* size: number;
    min: number;
    collapsible: boolean;
    collapsed: boolean;
    content: Component;

    constructor(theOptions: SplitterLayoutPanelOptions) {
        super(theOptions);

        this.size = theOptions.size;
        this.min = theOptions.min;
        this.collapsible = theOptions.collapsible;
        this.collapsed = theOptions.collapsed;
        this.content = theOptions.content;

    }

    renderTo(theContainer: any){

    }*/

    size?: number;
    min?: number;
    collapsible?: boolean;
    collapsed?: boolean;
    content?: Component;

}

export = SplitterLayoutPanel;
