/**
 * Created by Yusuf on 5/20/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/input/Form", "bpa/base/component/input/TextBox", "bpa/base/component/input/TextArea", "bpa/base/component/Label", "bpa/base/component/layout/TableLayout", "bpa/accounting/component/DefaultBalanceComboBox"], function (require, exports, Form, TextBox, TextArea, Label, TableLayout, DefaultBalanceComboBox) {
    var AccountGroupForm = (function (_super) {
        __extends(AccountGroupForm, _super);
        function AccountGroupForm(theOptions) {
            var _this = this;
            _this.accountGroup = theOptions.accountGroup;
            _this.onValidationSuccess = theOptions.onValidationSuccess;
            var _codeLabel = new Label({ label: "Code" });
            var _codeTextBox = new TextBox({ name: 'code', value: this.accountGroup.code, isRequired: true, minLength: 3, maxLength: 20, widthInPercentage: 90 });
            var _nameLabel = new Label({ label: "Name" });
            var _nameTextBox = new TextBox({ name: 'name', value: this.accountGroup.name, isRequired: true, minLength: 3, maxLength: 20, widthInPercentage: 90 });
            var _defaultBalanceLabel = new Label({ label: "Default Balance" });
            var _defaultBalanceComboBox = new DefaultBalanceComboBox({
                name: "defaultBalance",
                value: this.accountGroup.defaultBalance,
                widthInPercentage: 90,
                isRequired: true
            });
            var _descriptionLabel = new Label({ label: "Description" });
            var _descriptionTextArea = new TextArea({ name: 'description', value: this.accountGroup.description, height: 100, widthInPercentage: 90 });
            var _tableLayout = new TableLayout({
                classStyling: "edit-table",
                rows: [
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
                items: [_codeTextBox, _nameTextBox, _defaultBalanceComboBox, _descriptionTextArea],
                layout: _tableLayout,
                onValidationSuccess: _this.onValidationSuccess
            };
            _super.call(this, _formOptions);
            //_this._codeTextBox = _codeTextBox;
        }
        AccountGroupForm.prototype.editMode = function () {
            //this._codeTextBox.disable();
        };
        AccountGroupForm.prototype.newMode = function () {
            //this._codeTextBox.enable();
        };
        return AccountGroupForm;
    })(Form);
    return AccountGroupForm;
});
