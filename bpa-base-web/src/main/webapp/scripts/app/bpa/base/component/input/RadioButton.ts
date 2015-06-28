/**
 * Created by Yusuf on 5/5/2015.
 */

/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxradiobutton = require("jqxradiobutton");
import Component = require("bpa/base/component/Component");
import FormInput = require("bpa/base/component/input/FormInput");
import RadioButtonOptions = require("bpa/base/component/input/RadioButtonOptions");
import ValidatorRule = require("bpa/base/component/input/ValidatorRule");

class RadioButton extends Component implements FormInput {
    static DEFAULT_LABEL: string = "[NO_LABEL]";
    name: string;
    value: boolean;
    label: string;
    validatorRules: Array<ValidatorRule>;
    isRequired: boolean;
    disabled: boolean;

    constructor(theOptions: RadioButton) {
        super(theOptions);

        this.name = theOptions.name;
        this.value = theOptions.value;

        if(theOptions.label != undefined && theOptions.label != null) {
            this.label = theOptions.label;
        }else{
            this.label = RadioButton.DEFAULT_LABEL;
        }

        if(theOptions.disabled != undefined){
            this.disabled = theOptions.disabled;
        }else{
            this.disabled = false;
        }

        this.isRequired = theOptions.isRequired;

        this.validatorRules = [];

        if(this.isRequired){
            this.validatorRules.push({
                input: "#" + this.id,
                message: this.name + " is required",
                action: "keyup, blur",
                rule: "required"
            });
        }

        jqxradiobutton;
    }

    renderTo(theContainer: any){

        this.element = $("<div id=\"" + this.id + "\" >" + this.label +"</div>");

        var _width: any = '';
        if(this.widthInPercentage != undefined){
            _width = this.widthInPercentage + '%';
        }
        if(this.width != undefined){
            _width = this.width + "px";
        }

        if(_width != ''){
            this.element.css("width", _width);
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

        this.element = this.element.jqxRadioButton({height: this.height, width: _width, disabled: this.disabled, theme: this.theme});

        if(this.value != undefined){
            this.setValue(this.value);
        }

        this.rendered = true;
    }

    setValue(value: boolean){
        if(this.rendered){
            this.value = value;
            this.element.jqxRadioButton({checked:value});
        }else{
            this.value = value;
        }
    }

    getValue(): boolean{
        if(this.rendered){
            return this.element.jqxRadioButton('checked');
        }else{
            return null;
        }
    }

    disable(){
        this.disabled = true;
        if(this.rendered){
            this.element.jqxRadioButton({disabled: true })
        }
    }

    enable(){
        this.disabled = false;
        if(this.rendered){
            this.element.jqxRadioButton({disabled: false })
        }
    }
}

export  = RadioButton;
