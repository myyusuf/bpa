/**
 * Created by Yusuf on 5/20/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/input/Form", "bpa/base/component/input/TextBox", "bpa/base/component/input/TextArea", "bpa/base/component/Label", "bpa/base/component/layout/TableLayout", "bpa/accounting/component/AccountGroupComboBox", "bpa/accounting/component/DefaultBalanceComboBox", "bpa/accounting/component/ParentComboBox"], function (require, exports, Form, TextBox, TextArea, Label, TableLayout, AccountGroupComboBox, DefaultBalanceComboBox, ParentComboBox) {
    var AccountForm = (function (_super) {
        __extends(AccountForm, _super);
        function AccountForm(theOptions) {
            var _this = this;
            _this.account = theOptions.account;
            _this.onValidationSuccess = theOptions.onValidationSuccess;
            var _parentComboBox = null;
            var _accountGroupLabel = new Label({ label: "Account Group" });
            var _accountGroupComboBox = new AccountGroupComboBox({
                name: "group",
                value: _this.account.group,
                widthInPercentage: 90,
                isRequired: true,
                onChange: function (value) {
                    _parentComboBox.changeGroupCode(value);
                }
            });
            var _parentLabel = new Label({ label: "Parent" });
            _parentComboBox = new ParentComboBox({
                groupCode: "10000000",
                name: "parent",
                value: _this.account.parent,
                widthInPercentage: 90,
                isRequired: true
            });
            var _codeLabel = new Label({ label: "Code" });
            var _codeTextBox = new TextBox({ name: 'code', value: this.account.code, isRequired: true, minLength: 3, maxLength: 20, widthInPercentage: 90 });
            var _nameLabel = new Label({ label: "Name" });
            var _nameTextBox = new TextBox({ name: 'name', value: this.account.name, isRequired: true, minLength: 3, maxLength: 20, widthInPercentage: 90 });
            var _defaultBalanceLabel = new Label({ label: "Account Group" });
            var _defaultBalanceComboBox = new DefaultBalanceComboBox({
                name: "defaultBalance",
                value: this.account.defaultBalance,
                widthInPercentage: 90,
                isRequired: true
            });
            var _descriptionLabel = new Label({ label: "Description" });
            var _descriptionTextArea = new TextArea({ name: 'description', value: this.account.description, height: 100, widthInPercentage: 90 });
            var _tableLayout = new TableLayout({
                classStyling: "edit-table",
                rows: [
                    {
                        columns: [
                            { content: _accountGroupLabel, width: 130 },
                            { content: _accountGroupComboBox }
                        ]
                    },
                    {
                        columns: [
                            { content: _parentLabel, width: 130 },
                            { content: _parentComboBox }
                        ]
                    },
                    {
                        columns: [
                            { content: _codeLabel, width: 130 },
                            { content: _codeTextBox }
                        ]
                    },
                    {
                        columns: [
                            { content: _nameLabel, width: 130 },
                            { content: _nameTextBox }
                        ]
                    },
                    {
                        columns: [
                            { content: _defaultBalanceLabel, width: 130 },
                            { content: _defaultBalanceComboBox }
                        ]
                    },
                    {
                        columns: [
                            { content: _descriptionLabel, width: 130 },
                            { content: _descriptionTextArea }
                        ]
                    }
                ]
            });
            var _formOptions = {
                items: [_accountGroupComboBox, _parentComboBox, _codeTextBox, _nameTextBox, _defaultBalanceComboBox, _descriptionTextArea],
                layout: _tableLayout,
                onValidationSuccess: _this.onValidationSuccess
            };
            _super.call(this, _formOptions);
            //_this._codeTextBox = _codeTextBox;
        }
        AccountForm.prototype.editMode = function () {
            //this._codeTextBox.disable();
        };
        AccountForm.prototype.newMode = function () {
            //this._codeTextBox.enable();
        };
        return AccountForm;
    })(Form);
    return AccountForm;
});
