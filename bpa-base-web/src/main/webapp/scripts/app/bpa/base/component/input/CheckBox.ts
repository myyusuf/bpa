/**
 * Created by Yusuf on 6/24/2015.
 */

/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxcheckbox = require("jqxcheckbox");
import Component = require("bpa/base/component/Component");
import FormInput = require("bpa/base/component/input/FormInput");
import CheckBoxOptions = require("bpa/base/component/input/CheckBoxOptions");
import ClickEventListener = require("bpa/base/component/event/ClickEventListener");
import ValidatorRule = require("bpa/base/component/input/ValidatorRule");

class CheckBox extends Component implements FormInput{
    static DEFAULT_LABEL: string = "[NO_LABEL]";
    name: string;
    value: boolean;
    validatorRules: Array<ValidatorRule>;
    label: string;
    disabled: boolean;
    isRequired: boolean;


    constructor(theOptions: CheckBoxOptions) {
        super(theOptions);

        this.name = theOptions.name;
        this.value = theOptions.value;

        if(theOptions.label != undefined && theOptions.label != null) {
            this.label = theOptions.label;
        }else{
            this.label = CheckBox.DEFAULT_LABEL;
        }

        jqxcheckbox;
    }

    renderTo(theContainer: any){
        this.element = $("<div id=\"" + this.id + "\" >" + this.label +"</div>");

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

        var _myContainer = $('<div style="clear: both;"></div>');
        _myContainer.appendTo(theContainer);
        this.element.appendTo(_myContainer);

        if(this.isRequired){

            var _requiredSymbol: any = $("<canvas id=\"circlecanvas_" + this.id +  "\" width=\"6\" height=\"6\" style=\"float: left; margin-top: 10px; margin-left: 5px;\"></canvas>");
            _requiredSymbol.appendTo(_myContainer);

            var context = _requiredSymbol[0].getContext("2d");
            context.arc(3, 3, 3, 0, Math.PI * 2, false);
            context.fillStyle = '#CC0000';
            context.fill();

            //this.element.css("background-color", "#FFFFCC");
            this.element.css("float", "left");
        }

        this.element = this.element.jqxCheckBox({width: _width, height: _height,theme: this.theme});

        if(this.value != undefined){
            this.setValue(this.value);
        }

        this.rendered = true;
    }

    setValue(value: boolean){
        if(this.rendered){
            this.value = value;
            this.element.jqxCheckBox({checked:value});
        }else{
            this.value = value;
        }
    }

    getValue(): boolean{
        if(this.rendered){
            return this.element.jqxCheckBox('checked');
        }else{
            return null;
        }
    }

    disable(){
        this.disabled = true;
        if(this.rendered){
            this.element.jqxCheckBox({disabled: true })
        }
    }

    enable(){
        this.disabled = false;
        if(this.rendered){
            this.element.jqxCheckBox({disabled: false })
        }
    }
}

export = CheckBox;
