/**
 * Created by Yusuf on 6/24/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "jqxcheckbox", "bpa/base/component/Component"], function (require, exports, $, jqxcheckbox, Component) {
    var CheckBox = (function (_super) {
        __extends(CheckBox, _super);
        function CheckBox(theOptions) {
            _super.call(this, theOptions);
            this.name = theOptions.name;
            this.value = theOptions.value;
            if (theOptions.label != undefined && theOptions.label != null) {
                this.label = theOptions.label;
            }
            else {
                this.label = CheckBox.DEFAULT_LABEL;
            }
            jqxcheckbox;
        }
        CheckBox.prototype.renderTo = function (theContainer) {
            this.element = $("<div id=\"" + this.id + "\" >" + this.label + "</div>");
            var _width = 'auto';
            if (this.widthInPercentage != undefined) {
                _width = this.widthInPercentage + '%';
            }
            if (this.width != undefined) {
                _width = this.width;
            }
            var _height = 'auto';
            if (this.heightInPercentage != undefined) {
                _height = this.heightInPercentage + '%';
            }
            if (this.height != undefined) {
                _height = this.height;
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
            this.element = this.element.jqxCheckBox({ width: _width, height: _height, theme: this.theme });
            if (this.value != undefined) {
                this.setValue(this.value);
            }
            this.rendered = true;
        };
        CheckBox.prototype.setValue = function (value) {
            if (this.rendered) {
                this.value = value;
                this.element.jqxCheckBox({ checked: value });
            }
            else {
                this.value = value;
            }
        };
        CheckBox.prototype.getValue = function () {
            if (this.rendered) {
                return this.element.jqxCheckBox('checked');
            }
            else {
                return null;
            }
        };
        CheckBox.prototype.disable = function () {
            this.disabled = true;
            if (this.rendered) {
                this.element.jqxCheckBox({ disabled: true });
            }
        };
        CheckBox.prototype.enable = function () {
            this.disabled = false;
            if (this.rendered) {
                this.element.jqxCheckBox({ disabled: false });
            }
        };
        CheckBox.DEFAULT_LABEL = "[NO_LABEL]";
        return CheckBox;
    })(Component);
    return CheckBox;
});
