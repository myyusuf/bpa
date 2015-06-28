/**
 * Created by Yusuf on 5/5/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "jqxradiobutton", "bpa/base/component/Component"], function (require, exports, $, jqxradiobutton, Component) {
    var RadioButton = (function (_super) {
        __extends(RadioButton, _super);
        function RadioButton(theOptions) {
            _super.call(this, theOptions);
            this.name = theOptions.name;
            this.value = theOptions.value;
            if (theOptions.label != undefined && theOptions.label != null) {
                this.label = theOptions.label;
            }
            else {
                this.label = RadioButton.DEFAULT_LABEL;
            }
            if (theOptions.disabled != undefined) {
                this.disabled = theOptions.disabled;
            }
            else {
                this.disabled = false;
            }
            this.isRequired = theOptions.isRequired;
            this.validatorRules = [];
            if (this.isRequired) {
                this.validatorRules.push({
                    input: "#" + this.id,
                    message: this.name + " is required",
                    action: "keyup, blur",
                    rule: "required"
                });
            }
            jqxradiobutton;
        }
        RadioButton.prototype.renderTo = function (theContainer) {
            this.element = $("<div id=\"" + this.id + "\" >" + this.label + "</div>");
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
            this.element = this.element.jqxRadioButton({ height: this.height, width: _width, disabled: this.disabled, theme: this.theme });
            if (this.value != undefined) {
                this.setValue(this.value);
            }
            this.rendered = true;
        };
        RadioButton.prototype.setValue = function (value) {
            if (this.rendered) {
                this.value = value;
                this.element.jqxRadioButton({ checked: value });
            }
            else {
                this.value = value;
            }
        };
        RadioButton.prototype.getValue = function () {
            if (this.rendered) {
                return this.element.jqxRadioButton('checked');
            }
            else {
                return null;
            }
        };
        RadioButton.prototype.disable = function () {
            this.disabled = true;
            if (this.rendered) {
                this.element.jqxRadioButton({ disabled: true });
            }
        };
        RadioButton.prototype.enable = function () {
            this.disabled = false;
            if (this.rendered) {
                this.element.jqxRadioButton({ disabled: false });
            }
        };
        RadioButton.DEFAULT_LABEL = "[NO_LABEL]";
        return RadioButton;
    })(Component);
    return RadioButton;
});
