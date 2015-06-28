/**
 * Created by Yusuf on 5/5/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "jqxinput", "bpa/base/component/Component"], function (require, exports, $, jqxinput, Component) {
    var TextBox = (function (_super) {
        __extends(TextBox, _super);
        function TextBox(theOptions) {
            _super.call(this, theOptions);
            this.name = theOptions.name;
            this.value = theOptions.value;
            if (theOptions.disabled != undefined) {
                this.disabled = theOptions.disabled;
            }
            else {
                this.disabled = false;
            }
            if (theOptions.placeHolder != undefined && theOptions.placeHolder != null) {
                this.placeHolder = theOptions.placeHolder;
            }
            else {
                this.placeHolder = "";
            }
            this.isRequired = theOptions.isRequired;
            this.isEmailFormat = theOptions.isEmailFormat;
            this.minLength = theOptions.minLength;
            this.maxLength = theOptions.maxLength;
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
            if (this.isEmailFormat) {
                this.validatorRules.push({
                    input: "#" + this.id,
                    message: "Invalid email format",
                    action: "keyup, blur",
                    rule: "email"
                });
            }
            jqxinput;
        }
        TextBox.prototype.renderTo = function (theContainer) {
            this.element = $("<input type=\"text\" class=\"text-input\" id=\"" + this.id + "\"/>");
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
            //var _table = $('<table style="border: 0; padding: 0; margin: 0;"></table>');
            //_table.appendTo(theContainer);
            //
            //var _newRow = $('<tr></tr>');
            //_newRow.appendTo(_table);
            //
            //var _firstColumn = $('<td></td>');
            //_firstColumn.appendTo(_newRow);
            //
            //var _secondColumn = $('<td></td>');
            //_secondColumn.appendTo(_newRow);
            //
            //this.element.appendTo(_firstColumn);
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
            this.element = this.element.jqxInput({ placeHolder: this.placeHolder, height: this.height, width: this.width, disabled: this.disabled, theme: this.theme });
            if (this.value != undefined) {
                this.element.val(this.value);
            }
            this.rendered = true;
        };
        TextBox.prototype.setValue = function (value) {
            if (this.rendered) {
                this.value = value;
                this.element.val(value);
            }
            else {
                this.value = value;
            }
        };
        TextBox.prototype.getValue = function () {
            if (this.rendered) {
                return this.element.val();
            }
            else {
                return null;
            }
        };
        TextBox.prototype.disable = function () {
            this.disabled = true;
            if (this.rendered) {
                this.element.jqxInput({ disabled: true });
            }
        };
        TextBox.prototype.enable = function () {
            this.disabled = false;
            if (this.rendered) {
                this.element.jqxInput({ disabled: false });
            }
        };
        return TextBox;
    })(Component);
    return TextBox;
});
