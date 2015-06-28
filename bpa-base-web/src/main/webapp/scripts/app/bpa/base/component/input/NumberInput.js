/**
 * Created by Yusuf on 5/5/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "jqxnumberinput", "bpa/base/component/Component"], function (require, exports, $, jqxnumberinput, Component) {
    var NumberInput = (function (_super) {
        __extends(NumberInput, _super);
        function NumberInput(theOptions) {
            _super.call(this, theOptions);
            this.name = theOptions.name;
            this.value = theOptions.value;
            if (theOptions.disabled != undefined) {
                this.disabled = theOptions.disabled;
            }
            else {
                this.disabled = false;
            }
            this.isRequired = theOptions.isRequired;
            this.minLength = theOptions.minLength;
            this.maxLength = theOptions.maxLength;
            if (theOptions.showSpinButtons != undefined) {
                this.showSpinButtons = theOptions.showSpinButtons;
            }
            else {
                this.showSpinButtons = true;
            }
            if (theOptions.digits != undefined) {
                this.digits = theOptions.digits;
            }
            else {
                this.digits = 8;
            }
            if (theOptions.decimalDigits != undefined) {
                this.decimalDigits = theOptions.decimalDigits;
            }
            else {
                this.decimalDigits = 2;
            }
            if (theOptions.max != undefined) {
                this.max = theOptions.max;
            }
            else {
                this.max = 99999999;
            }
            this.validatorRules = [];
            if (this.isRequired) {
                this.validatorRules.push({
                    input: "#" + this.id,
                    message: this.name + " is required",
                    action: "keyup, blur",
                    rule: "required"
                });
            }
            if (this.minLength != undefined) {
                this.validatorRules.push({
                    input: "#" + this.id,
                    message: this.name + " minimum length is : " + this.minLength,
                    action: "keyup, blur",
                    rule: "minLength=" + this.minLength
                });
            }
            jqxnumberinput;
        }
        NumberInput.prototype.renderTo = function (theContainer) {
            this.element = $("<div class=\"text-input\" id=\"" + this.id + "\"></div>");
            var _width = '';
            if (this.widthInPercentage != undefined) {
                _width = this.widthInPercentage + '%';
            }
            if (this.width != undefined) {
                _width = this.width + "px";
            }
            if (_width != '') {
                this.element.css("width", _width);
            }
            var _myContainer = $('<div style="clear: both;"></div>');
            _myContainer.appendTo(theContainer);
            this.element.appendTo(_myContainer);
            if (this.isRequired) {
                var _requiredSymbol = $("<canvas id=\"circlecanvas_" + this.id + "\" width=\"6\" height=\"6\" style=\"float: left; margin-top: 10px; margin-left: 5px;\"></canvas>");
                _requiredSymbol.appendTo(_myContainer);
                var context = _requiredSymbol[0].getContext("2d");
                context.arc(3, 3, 3, 0, Math.PI * 2, false);
                context.fillStyle = '#CC0000';
                context.fill();
                //this.element.css("background-color", "#FFFFCC");
                this.element.css("float", "left");
            }
            if (this.maxLength != undefined) {
                this.element.attr("maxlength", this.maxLength);
            }
            this.element = this.element.jqxNumberInput({
                height: this.height,
                width: this.width,
                disabled: this.disabled,
                digits: this.digits,
                decimalDigits: this.decimalDigits,
                max: this.max,
                spinButtons: this.showSpinButtons,
                theme: this.theme
            });
            if (this.value != undefined) {
                this.element.val(this.value);
            }
            this.rendered = true;
        };
        NumberInput.prototype.setValue = function (value) {
            if (this.rendered) {
                this.value = value;
                this.element.val(value);
            }
            else {
                this.value = value;
            }
        };
        NumberInput.prototype.getValue = function () {
            if (this.rendered) {
                return this.element.val();
            }
            else {
                return null;
            }
        };
        NumberInput.prototype.disable = function () {
            this.disabled = true;
            if (this.rendered) {
                this.element.jqxInput({ disabled: true });
            }
        };
        NumberInput.prototype.enable = function () {
            this.disabled = false;
            if (this.rendered) {
                this.element.jqxInput({ disabled: false });
            }
        };
        return NumberInput;
    })(Component);
    return NumberInput;
});
