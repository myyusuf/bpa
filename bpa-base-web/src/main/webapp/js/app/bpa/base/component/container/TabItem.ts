/**
 * Created by Yusuf on 5/9/2015.
 */

/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import TabItemOptions = require("bpa/base/component/container/TabItemOptions");

class TabItem extends Component{

    tabKey: string;
    private _caption: string;
    private _content: Component;

    constructor(theOptions: TabItemOptions) {
        super(theOptions);

        this.tabKey = theOptions.tabKey;
        this._caption = theOptions.caption;
        this._content = theOptions.content;

    }

    renderTo(theContainer: any){

        this.element = $("<div id=\"" + this.id + "\"><\/div>");
        this.element.appendTo(theContainer);

        if(this.content != undefined && this.content != null){
            this.content.renderTo(this.element);
        }

    }

    get caption(){
        //console.log("get caption");
        return this._caption;
    }

    set caption(theCaption: string){
        //console.log("set caption");
        this._caption = theCaption;
    }

    get content(): Component{
        //console.log("get content");
        return this._content;
    }

    set content(theContent: Component){
        //console.log("set content");
        this._content = theContent;
    }
}

export = TabItem;
