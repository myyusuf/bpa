/**
 * Created by Yusuf on 5/23/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "jqxdatetimeinput", "bpa/base/component/Component"], function (require, exports, $, jqxdatetimeinput, Component) {
    var DateTimeInput = (function (_super) {
        __extends(DateTimeInput, _super);
        function DateTimeInput(theOptions) {
            _super.call(this, theOptions);
            this.name = theOptions.name;
            this.value = theOptions.value;
            if (theOptions.disabled != undefined) {
                this.disabled = theOptions.disabled;
            }
            else {
                this.disabled = false;
            }
            if (theOptions.type != undefined) {
                this.type = theOptions.type;
            }
            else {
                this.type = DateTimeInput.DATE_TYPE;
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
            jqxdatetimeinput;
        }
        DateTimeInput.prototype.renderTo = function (theContainer) {
            this.element = $("<div id=\"" + this.id + "\"></div>");
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
            var _jqxDateTimeOptions = {
                height: this.height,
                width: _width,
                disabled: this.disabled,
                theme: this.theme
            };
            if (this.type == DateTimeInput.TIME_TYPE) {
                _jqxDateTimeOptions["formatString"] = "T";
                _jqxDateTimeOptions["showTimeButton"] = true;
                _jqxDateTimeOptions["showCalendarButton"] = false;
            }
            else if (this.type == DateTimeInput.DATETIME_TYPE) {
                _jqxDateTimeOptions["formatString"] = "F";
                _jqxDateTimeOptions["showTimeButton"] = true;
            }
            this.element = this.element.jqxDateTimeInput(_jqxDateTimeOptions);
            if (this.value != undefined) {
                this.element.jqxDateTimeInput({ value: this.value });
            }
            this.rendered = true;
        };
        DateTimeInput.prototype.setValue = function (value) {
            if (this.rendered) {
                this.value = value;
                this.element.jqxDateTimeInput({ value: value });
            }
            else {
                this.value = value;
            }
        };
        DateTimeInput.prototype.getValue = function () {
            if (this.rendered) {
                return this.element.jqxDateTimeInput('value');
            }
            else {
                return this.value;
            }
        };
        DateTimeInput.DATE_TYPE = "date";
        DateTimeInput.TIME_TYPE = "time";
        DateTimeInput.DATETIME_TYPE = "datetime";
        return DateTimeInput;
    })(Component);
    return DateTimeInput;
});
