/**
 * Created by Yusuf on 5/20/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/input/Form", "bpa/base/component/input/TextBox", "bpa/base/component/Label", "bpa/base/component/layout/TableLayout"], function (require, exports, Form, TextBox, Label, TableLayout) {
    var GroupForm = (function (_super) {
        __extends(GroupForm, _super);
        function GroupForm(theOptions) {
            var _this = this;
            this.group = theOptions.group;
            this.onValidationSuccess = theOptions.onValidationSuccess;
            var _codeLabel = new Label({ label: "Code" });
            var _codeTextBox = new TextBox({ name: 'code', value: this.group.code, isRequired: true, minLength: 3, maxLength: 20, widthInPercentage: 90 });
            var _nameLabel = new Label({ label: "Name" });
            var _nameTextBox = new TextBox({ name: 'name', value: this.group.name, isRequired: true, minLength: 3, maxLength: 20, widthInPercentage: 90 });
            var _descriptionLabel = new Label({ label: "Description" });
            var _descriptionTextBox = new TextBox({ name: 'description', value: this.group.description, maxLength: 150, widthInPercentage: 90 });
            var _tableLayout = new TableLayout({
                classStyling: "edit-table",
                rows: [
                    {
                        columns: [
                            { content: _codeLabel, width: 85 },
                            { content: _codeTextBox }
                        ]
                    },
                    {
                        columns: [
                            { content: _nameLabel },
                            { content: _nameTextBox }
                        ]
                    },
                    {
                        columns: [
                            { content: _descriptionLabel },
                            { content: _descriptionTextBox }
                        ]
                    }
                ]
            });
            var _formOptions = {
                items: [_codeTextBox, _nameTextBox, _descriptionTextBox],
                layout: _tableLayout,
                onValidationSuccess: _this.onValidationSuccess
            };
            _super.call(this, _formOptions);
            _this._codeTextBox = _codeTextBox;
        }
        GroupForm.prototype.editMode = function () {
            this._codeTextBox.disable();
        };
        GroupForm.prototype.newMode = function () {
            this._codeTextBox.enable();
        };
        return GroupForm;
    })(Form);
    return GroupForm;
});
