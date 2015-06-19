/**
 * Created by Yusuf on 5/8/2015.
 */

/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import SimplePanelOptions = require("bpa/base/component/container/SimplePanelOptions");

class SimplePanel extends Component{

    content: Component;

    constructor(theOptions: SimplePanelOptions) {
        super(theOptions);

        this.content = theOptions.content;
    }

    renderTo(theContainer: any){

        this.element = $("<div id=\"" + this.id + "\" style=\"height: 100%;\"><\/div>");
        this.element.appendTo(theContainer);
        if(this.content != undefined){
            this.content.renderTo(this.element);
        }
    }
}

export = SimplePanel;