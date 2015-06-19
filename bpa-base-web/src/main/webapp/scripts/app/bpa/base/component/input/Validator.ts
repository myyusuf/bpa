/**
 * Created by Yusuf on 5/23/2015.
 */

/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxvalidator = require("jqxvalidator");
import ValidatorOptions = require("bpa/base/component/input/ValidatorOptions");
import ValidatorRule = require("bpa/base/component/input/ValidatorRule");
import FormInput = require("bpa/base/component/input/FormInput");
import Form = require("bpa/base/component/input/Form");

class Validator{

    form: Form;
    items: Array<FormInput>;
    rules: Array<ValidatorRule>;
    isValidatorInitialized: boolean = false;
    onValidationSuccess: any;

    constructor(theOptions: ValidatorOptions) {
        this.form = theOptions.form;
        this.items = theOptions.items;

        this.rules = [];
        this.items.forEach(item=>{
            if(item.validatorRules != undefined && item.validatorRules != null){
                item.validatorRules.forEach(validatorRule=>{
                    this.rules.push(validatorRule);
                });
            }
        });

        this.onValidationSuccess = theOptions.onValidationSuccess;

        jqxvalidator;
    }

    validate(){
        var _this2 = this;
        if(!this.isValidatorInitialized){
            this.form.element.jqxValidator({
                closeOnClick: true,
                arrow: false,
                rules: this.rules
                //rules: [
                //    { input: "#" + _codeInput.attr("id"), message: 'Code is required', action: 'keyup, blur', rule: 'required' },
                //    { input: "#" + _nameInput.attr("id"), message: 'Name is required', action: 'keyup, blur', rule: 'required' },
                //    { input: "#" + _defaultBalanceInput.attr("id"), message: 'Default balance is required', action: 'keyup, blur',
                //        rule: function(input){
                //            var _val = _defaultBalanceComboBox.jqxComboBox('val');
                //            if(_val==""){
                //                return false;
                //            }
                //            return true;
                //        }
                //    }
                //
                //]
            });

            this.form.element.on('validationSuccess', function (event) {
                console.log("validationSuccess...");

                if(_this2.onValidationSuccess != undefined && _this2.onValidationSuccess != null){
                    _this2.onValidationSuccess();
                }
            });

            this.isValidatorInitialized = true;
        }

        this.form.element.jqxValidator('validate');
    }

}

export = Validator;
