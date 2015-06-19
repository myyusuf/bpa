/**
 * Created by Yusuf on 5/23/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "bpa/base/component/Component", "bpa/base/component/input/Validator"], function (require, exports, $, Component, Validator) {
    var Form = (function (_super) {
        __extends(Form, _super);
        function Form(theOptions) {
            _super.call(this, theOptions);
            this.items = theOptions.items;
            this.layout = theOptions.layout;
            this.onValidationSuccess = theOptions.onValidationSuccess;
            this.validator = new Validator({ form: this, items: this.items, onValidationSuccess: this.onValidationSuccess });
        }
        Form.prototype.renderTo = function (theContainer) {
            this.element = $("<form id=\"" + this.id + "\"><\/form>");
            this.element.appendTo(theContainer);
            this.layout.renderTo(this.element);
        };
        Form.prototype.getValue = function () {
            var _obj = {};
            this.items.forEach(function (item) {
                _obj[item.name] = item.getValue();
            });
            return _obj;
        };
        Form.prototype.setValue = function (obj) {
            var _this = this;
            Object.getOwnPropertyNames(obj).forEach(function (prop, idx, array) {
                console.log(prop + ' -> ' + obj[prop]);
                _this.setValueByItemName(prop, obj[prop]);
            });
        };
        Form.prototype.setValueByItemName = function (itemName, value) {
            this.items.forEach(function (item) {
                if (item.name == itemName) {
                    item.setValue(value);
                    return;
                }
            });
        };
        Form.prototype.validate = function () {
            this.validator.validate();
        };
        return Form;
    })(Component);
    return Form;
});
