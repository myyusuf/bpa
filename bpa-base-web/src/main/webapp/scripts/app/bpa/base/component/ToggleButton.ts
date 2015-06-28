/**
 * Created by Yusuf on 5/5/2015.
 */

/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxbuttons = require("jqxbuttons");
import Component = require("bpa/base/component/Component");
import ToggleButtonOptions = require("bpa/base/component/ToggleButtonOptions");
import OnToggleButtonClickListener = require("bpa/base/component/event/OnToggleButtonClickListener");

class ToggleButton extends Component{
    static DEFAULT_LABEL: string = "[NO_LABEL]";
    activeLabel: string;
    inactiveLabel: string;
    onClick: OnToggleButtonClickListener;

    constructor(theOptions: ToggleButtonOptions) {
        super(theOptions);

        if(theOptions.activeLabel != undefined && theOptions.activeLabel != null) {
            this.activeLabel = theOptions.activeLabel;
        }else{
            this.activeLabel = ToggleButton.DEFAULT_LABEL;
        }

        if(theOptions.inactiveLabel != undefined && theOptions.inactiveLabel != null) {
            this.inactiveLabel = theOptions.inactiveLabel;
        }else{
            this.inactiveLabel = ToggleButton.DEFAULT_LABEL;
        }

        this.onClick = theOptions.onClick;

        jqxbuttons;
    }

    renderTo(theContainer: any){

        var _this = this;
        this.element = $("<input type=\"button\" value=\"" + this.activeLabel + "\" id=\"" + this.id + "\" />");
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

        this.element = this.element.jqxToggleButton({width: _width, height: _height,theme: this.theme});

        this.element.on('click', function () {
            var _toggled = _this.element.jqxToggleButton('toggled');
            if (_toggled) {
                _this.element[0].value = _this.activeLabel;
                _this.onClick(true);
            }else{
                _this.element[0].value = _this.inactiveLabel;
                _this.onClick(false);
            }


        });

        _this.rendered = true;
    }
}

export = ToggleButton;