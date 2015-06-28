/**
 * Created by Yusuf on 5/20/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/input/Form", "bpa/base/component/input/TextBox", "bpa/base/component/Label", "bpa/base/component/layout/TableLayout", "bpa/base/component/container/SimplePanel", "bpa/accounting/component/TransactionJournalGrid"], function (require, exports, Form, TextBox, Label, TableLayout, SimplePanel, TransactionJournalGrid) {
    var TransactionForm = (function (_super) {
        __extends(TransactionForm, _super);
        //_codeTextBox: TextBox;
        function TransactionForm(theOptions) {
            var _this = this;
            this.transaction = theOptions.transaction;
            this.onValidationSuccess = theOptions.onValidationSuccess;
            var _transactionNumberLabel = new Label({ label: "Transaction Number" });
            var _transactionNumberTextBox = new TextBox({ name: 'transactionNumber', value: this.transaction.transactionNumber, isRequired: true, minLength: 3, maxLength: 20, widthInPercentage: 90 });
            var _descriptionLabel = new Label({ label: "Description" });
            var _descriptionTextBox = new TextBox({ name: 'description', value: this.transaction.description, maxLength: 150, widthInPercentage: 90 });
            var _createdTimeLabel = new Label({ label: "Created" });
            var _createdTimeTextBox = new TextBox({ name: 'createdTime', value: this.transaction.createdTime, isRequired: true, minLength: 3, maxLength: 20, widthInPercentage: 90 });
            //var _accountLabel: Label = new Label({label: "Account"});
            //var _accountComboBox: AccountComboBox =
            //    new AccountComboBox({
            //        name: "account",
            //        widthInPercentage: 90,
            //        isRequired: true
            //    });
            //
            //var _amountLabel: Label = new Label({label: "Amount"});
            //var _amountNumberInput: NumberInput = new NumberInput({name: 'amount', showSpinButtons: true, maxLength: 150, width: 150});
            var _journalsLabel = new Label({ label: "Journals" });
            var _transactionJournalGrid = new TransactionJournalGrid({ name: 'journals', journals: [] });
            var _simplePanel = new SimplePanel({ content: _transactionJournalGrid });
            var _tableLayout = new TableLayout({
                classStyling: "edit-table",
                rows: [
                    {
                        columns: [
                            { content: _transactionNumberLabel },
                            { content: _transactionNumberTextBox }
                        ]
                    },
                    {
                        columns: [
                            { content: _descriptionLabel },
                            { content: _descriptionTextBox }
                        ]
                    },
                    {
                        columns: [
                            { content: _createdTimeLabel },
                            { content: _createdTimeTextBox }
                        ]
                    },
                    {
                        columns: [
                            { colspan: 2, content: _simplePanel }
                        ]
                    },
                ]
            });
            var _formOptions = {
                items: [_transactionNumberTextBox, _descriptionTextBox, _createdTimeTextBox, _transactionJournalGrid],
                layout: _tableLayout,
                onValidationSuccess: _this.onValidationSuccess
            };
            _super.call(this, _formOptions);
            //_this._codeTextBox = _codeTextBox;
        }
        TransactionForm.prototype.editMode = function () {
            //this._codeTextBox.disable();
        };
        TransactionForm.prototype.newMode = function () {
            //this._codeTextBox.enable();
        };
        return TransactionForm;
    })(Form);
    return TransactionForm;
});
