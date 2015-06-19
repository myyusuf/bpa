/**
 * Created by Yusuf on 5/5/2015.
 */

/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxbuttons = require("jqxbuttons");
import Component = require("bpa/base/component/Component");
import ImageButtonOptions = require("bpa/base/component/ImageButtonOptions");
import ClickEventListener = require("bpa/base/component/event/ClickEventListener");

class ImageButton extends Component{
    static DEFAULT_LABEL: string = "";
    imageUrl: string;
    label: string;
    onClick: ClickEventListener;

    constructor(theOptions: ImageButtonOptions) {
        super(theOptions);

        if(theOptions.label != undefined && theOptions.label != null) {
            this.label = theOptions.label;
        }else{
            this.label = ImageButton.DEFAULT_LABEL;
        }

        this.imageUrl = theOptions.imageUrl;

        this.onClick = theOptions.onClick;

        jqxbuttons;
    }

    renderTo(theContainer: any){
        this.element = $('<div id="' + this.id +'">' +
            '<img style="float: left; " src="' + this.imageUrl + '" />' +
            '<div style="float: left; ">' + this.label + '</div>' +
            '</div>');
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

export = ImageButton;