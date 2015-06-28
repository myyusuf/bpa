/**
 * Created by Yusuf on 5/23/2015.
 */

/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxcombobox = require("jqxcombobox");
import Component = require("bpa/base/component/Component");
import ComboBoxOptions = require("bpa/base/component/input/ComboBoxOptions");
import DataAdapter = require("bpa/base/data/DataAdapter");

import FormInput = require("bpa/base/component/input/FormInput");
import ValidatorRule = require("bpa/base/component/input/ValidatorRule");

class ComboBox extends Component implements FormInput{

    name: string;
    value: any;
    comboBoxValue: string;
    objectToValueCoverter: any;
    valueToObjectConverter: any;
    validatorRules: Array<ValidatorRule>;
    isRequired: boolean;

    promptText: string;
    renderer: any;
    renderSelectedItem: any;
    autoComplete: boolean;

    dataAdapter: DataAdapter;
    displayMember: string;
    valueMember: string;

    onChange: any;

    constructor(theOptions: ComboBoxOptions) {
        super(theOptions);

        var _this = this;

        this.name = theOptions.name;

        this.value = theOptions.value;

        if(theOptions.objectToValueCoverter != undefined){
            this.objectToValueCoverter = theOptions.objectToValueCoverter;

        }else{
            this.objectToValueCoverter = function(theObject: string){
                return theObject;
            }
        }

        if(theOptions.valueToObjectConverter != undefined){
            this.valueToObjectConverter = theOptions.valueToObjectConverter;
        }else{
            this.valueToObjectConverter = function(theComboBoxValue: string){
                return theComboBoxValue;
            }
        }

        this.comboBoxValue = this.objectToValueCoverter(this.value);

        this.dataAdapter = theOptions.dataAdapter;
        this.valueMember = theOptions.valueMember;
        this.displayMember = theOptions.displayMember;
        this.isRequired = theOptions.isRequired;
        this.promptText = theOptions.promptText;
        this.renderer = theOptions.renderer;
        this.renderSelectedItem = theOptions.renderSelectedItem;
        this.autoComplete = theOptions.autoComplete;

        this.validatorRules = [];

        if(this.isRequired){
            this.validatorRules.push({
                input: "#" + this.id,
                message: this.name + " is required",
                action: "select",
                rule: function(input: any){
                    var val = _this.element.jqxComboBox('val');
                    if(val==""){
                        return false;
                    }
                    return true;
                }
            });
        }

        this.onChange = theOptions.onChange;

        jqxcombobox;
    }

    renderTo(theContainer: any){

        var _this = this;

        this.element = $("<div id=\"" + this.id + "\"><\/div>");
        //this.element.appendTo(theContainer);

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

            this.element.css("float", "left");
        }

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

        this.element = this.element.jqxComboBox({
            source: this.dataAdapter.get(),
            displayMember: this.displayMember,
            valueMember: this.valueMember,
            promptText: this.promptText,
            renderer: this.renderer,
            renderSelectedItem: this.renderSelectedItem,
            width: _width,
            height: _height,
            autoComplete: _this.autoComplete,
            theme: this.theme

        });

        this.element.on('bindingComplete', function (event) {

            if(_this.comboBoxValue != undefined){
                _this.selectItemByValue(_this.comboBoxValue);
            }

        });

        if(this.onChange != undefined){

            this.element.unbind('change');

            this.element.bind('change', function(event){
                if (event.args){
                    var _value = event.args.item.value;
                    _this.onChange(_value);
                }
            });
        }

        this.rendered = true;
    }

    selectItemByValue(theComboBoxValue : string): void {

        if(this.rendered){
            this.element.val(theComboBoxValue);
            this.comboBoxValue = theComboBoxValue;
            var _selectedItem = this.element.jqxComboBox('getItemByValue', theComboBoxValue);
            this.element.jqxComboBox('selectItem', _selectedItem);
        }else{
            this.comboBoxValue = theComboBoxValue;
        }

    }

    setValue(value: any){
        this.value = value;
        this.selectItemByValue(this.objectToValueCoverter(this.value));
    }

    getValue(): any{
        if(this.rendered){
            return this.valueToObjectConverter(this.element.val());
        }else{
            return this.valueToObjectConverter(this.comboBoxValue);
        }
    }

    reloadData(): void{
        this.dataAdapter.get().dataBind();
        this.element = this.element.jqxComboBox({source: this.dataAdapter});
    }
}

export = ComboBox;
