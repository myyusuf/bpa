/**
 * Created by Yusuf on 5/5/2015.
 */

/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxbuttons = require("jqxbuttons");
import Component = require("bpa/base/component/Component");
import ButtonOptions = require("bpa/base/component/ButtonOptions");
import ClickEventListener = require("bpa/base/component/event/ClickEventListener");

class Button extends Component{
    static DEFAULT_LABEL: string = "[NO_LABEL]";
    label: string;
    onClick: ClickEventListener;

    constructor(theOptions: ButtonOptions) {
        super(theOptions);

        if(theOptions.label != undefined && theOptions.label != null) {
            this.label = theOptions.label;
        }else{
            this.label = Button.DEFAULT_LABEL;
        }

        this.onClick = theOptions.onClick;

        jqxbuttons;
    }

    renderTo(theContainer: any){
        this.element = $("<input type=\"button\" value=\"" + this.label + "\" id=\"" + this.id + "\" />");
        this.element.appendTo(theContainer);

        var _width: any = 'auto';
        if(this.widthInPercentage != undefined){
            _width = this.widthInPercentage + '%';
        }
        if(this.width != undefined){
            _width = this.width;
        }

        var _height: any = 'auto';
        if(this.heightInPercentage != undefined){
            _height = this.heightInPercentage + '%';
        }
        if(this.height != undefined){
            _height = this.height;
        }

        this.element = this.element.jqxButton({width: _width, height: _height,theme: this.theme});
        this.element.click(this.onClick);
    }
}

export = Button;