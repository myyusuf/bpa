/**
 * Created by Yusuf on 5/23/2015.
 */
define(["require", "exports", "jqxvalidator"], function (require, exports, jqxvalidator) {
    var Validator = (function () {
        function Validator(theOptions) {
            var _this = this;
            this.isValidatorInitialized = false;
            this.form = theOptions.form;
            this.items = theOptions.items;
            this.rules = [];
            this.items.forEach(function (item) {
                if (item.validatorRules != undefined && item.validatorRules != null) {
                    item.validatorRules.forEach(function (validatorRule) {
                        _this.rules.push(validatorRule);
                    });
                }
            });
            this.onValidationSuccess = theOptions.onValidationSuccess;
            jqxvalidator;
        }
        Validator.prototype.validate = function () {
            var _this2 = this;
            if (!this.isValidatorInitialized) {
                this.form.element.jqxValidator({
                    focus: false,
                    scroll: false,
                    closeOnClick: true,
                    arrow: false,
                    rules: this.rules
                });
                this.form.element.on('validationSuccess', function (event) {
                    console.log("validationSuccess...");
                    if (_this2.onValidationSuccess != undefined && _this2.onValidationSuccess != null) {
                        _this2.onValidationSuccess();
                    }
                });
                this.isValidatorInitialized = true;
            }
            this.form.element.jqxValidator('validate');
        };
        return Validator;
    })();
    return Validator;
});
