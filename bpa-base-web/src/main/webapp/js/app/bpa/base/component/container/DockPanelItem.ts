/**
 * Created by Yusuf on 5/8/2015.
 */

/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import DockPanelItemOptions = require("bpa/base/component/container/DockPanelItemOptions");

class DockPanelItem{

    width: string;
    height: number;
    dock: string;
    backgroundColor: string;
    content: Component;
    container: any;
    htmlContent: any;
    dynamicHeight: boolean;

    constructor(theOptions: DockPanelItemOptions){
        this.width = theOptions.width;
        this.height = theOptions.height;
        this.dock = theOptions.dock;
        this.backgroundColor = theOptions.backgroundColor;
        this.content = theOptions.content;
        this.htmlContent = theOptions.htmlContent;
        this.dynamicHeight = theOptions.dynamicHeight;
    }

    changeContent(newContent: Component){


        if(this.container != undefined){
            var _children = $(this.container).children();
            for(var _i=0; _i<_children.length; _i++){
                $(_children[_i]).remove();
            }

            newContent.renderTo(this.container);
        }else{
            this.content = newContent;
        }

    }

}

export = DockPanelItem;
