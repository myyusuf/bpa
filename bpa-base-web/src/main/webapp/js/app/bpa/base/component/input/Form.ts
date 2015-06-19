/**
 * Created by Yusuf on 5/23/2015.
 */

/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component")
import FormInput = require("bpa/base/component/input/FormInput");
import FormOptions = require("bpa/base/component/input/FormOptions");
import Layout = require("bpa/base/component/layout/Layout");
import Validator = require("bpa/base/component/input/Validator");

class Form extends Component{
    items: Array<FormInput>;
    layout: Layout;
    validator: Validator;
    onValidationSuccess: any;

    constructor(theOptions: FormOptions) {
        super(theOptions);
        this.items = theOptions.items;
        this.layout = theOptions.layout;
        this.onValidationSuccess = theOptions.onValidationSuccess;

        this.validator = new Validator({form: this, items: this.items, onValidationSuccess: this.onValidationSuccess});

    }

    renderTo(theContainer: any){
        this.element = $("<form id=\"" + this.id + "\"><\/form>");
        this.element.appendTo(theContainer);

        this.layout.renderTo(this.element);

    }

    getValue(): any{
        var _obj ={};
        this.items.forEach(item=>{
            _obj[item.name] = item.getValue();
        });

        return _obj;
    }

    setValue(obj: any): void{

        var _this = this;
        Object.getOwnPropertyNames(obj).forEach(function(prop, idx, array) {
            console.log(prop + ' -> ' + obj[prop]);
            _this.setValueByItemName(prop, obj[prop]);

        });
    }

    setValueByItemName(itemName: string, value: any){
        this.items.forEach(item=>{
            if(item.name == itemName){
                item.setValue(value);
                return;
            }
        });
    }

    validate(){
        this.validator.validate();
    }
}

export  = Form;