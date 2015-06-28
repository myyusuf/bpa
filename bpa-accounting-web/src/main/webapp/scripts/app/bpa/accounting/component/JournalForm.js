/**
 * Created by Yusuf on 5/20/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/input/Form", "bpa/base/component/input/CheckBox", "bpa/base/component/input/NumberInput", "bpa/base/component/ToggleButton", "bpa/base/component/input/TextArea", "bpa/base/component/Label", "bpa/base/component/layout/TableLayout", "bpa/accounting/component/AccountComboBox", "bpa/accounting/component/CurrencyComboBox"], function (require, exports, Form, CheckBox, NumberInput, ToggleButton, TextArea, Label, TableLayout, AccountComboBox, CurrencyComboBox) {
    var JournalForm = (function (_super) {
        __extends(JournalForm, _super);
        function JournalForm(theOptions) {
            var _this = this;
            _this.journal = theOptions.journal;
            _this.onValidationSuccess = theOptions.onValidationSuccess;
            var _accountLabel = new Label({ label: "Account" });
            var _accountComboBox = new AccountComboBox({
                name: "account",
                widthInPercentage: 90,
                isRequired: true
            });
            var _amountLabel = new Label({ label: "Amount" });
            var _amountNumberInput = new NumberInput({ name: 'amount', showSpinButtons: true, maxLength: 150, width: 190 });
            _this.journal.position = true;
            var _positionToggleButton = new ToggleButton({ activeLabel: ' + ', inactiveLabel: ' - ', onClick: function (toggled) {
                _this.journal.position = toggled;
            } });
            var _currencyLabel = new Label({ label: "Currency" });
            var _currencyComboBox = new CurrencyComboBox({
                name: "currency",
                widthInPercentage: 90,
                isRequired: true
            });
            var _descriptionLabel = new Label({ label: "Description" });
            var _descriptionTextArea = new TextArea({ name: 'description', value: this.journal.description, height: 100, widthInPercentage: 90 });
            var _kursLabel = new Label({ label: "Kurs" });
            var _kursCheckBox = new CheckBox({
                name: "isKursAuto",
                label: "Auto",
                width: 50,
                isRequired: true
            });
            var _kursNumberInput = new NumberInput({ name: 'kurs', showSpinButtons: true, maxLength: 150, width: 192 });
            var _tableLayout = new TableLayout({
                classStyling: "edit-table",
                rows: [
                    {
                        columns: [
                            { content: _accountLabel, width: 130 },
                            { content: _accountComboBox, colspan: 2 }
                        ]
                    },
                    {
                        columns: [
                            { content: _amountLabel, width: 130 },
                            { content: _positionToggleButton, width: 10 },
                            { content: _amountNumberInput }
                        ]
                    },
                    {
                        columns: [
                            { content: _currencyLabel, width: 130 },
                            { content: _currencyComboBox, colspan: 2 }
                        ]
                    },
                    {
                        columns: [
                            { content: _kursLabel, width: 130 },
                            { content: _kursCheckBox },
                            { content: _kursNumberInput }
                        ]
                    },
                    {
                        columns: [
                            { content: _descriptionLabel, width: 130 },
                            { content: _descriptionTextArea, colspan: 2 }
                        ]
                    }
                ]
            });
            var _formOptions = {
                items: [_accountComboBox, _amountNumberInput, _currencyComboBox, _kursCheckBox, _descriptionTextArea],
                layout: _tableLayout,
                onValidationSuccess: _this.onValidationSuccess
            };
            _super.call(this, _formOptions);
            //_this._codeTextBox = _codeTextBox;
        }
        JournalForm.prototype.getValue = function () {
            var _obj = _super.prototype.getValue.call(this);
            _obj["position"] = this.journal.position;
            return _obj;
        };
        JournalForm.prototype.editMode = function () {
            //this._codeTextBox.disable();
        };
        JournalForm.prototype.newMode = function () {
            //this._codeTextBox.enable();
        };
        return JournalForm;
    })(Form);
    return JournalForm;
});
