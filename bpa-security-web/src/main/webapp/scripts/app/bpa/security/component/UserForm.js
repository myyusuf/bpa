/**
 * Created by Yusuf on 5/20/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/input/Form", "bpa/base/component/input/TextBox", "bpa/base/component/Label", "bpa/base/component/layout/TableLayout", "bpa/security/component/UserGroupGrid", "bpa/base/component/container/SimplePanel"], function (require, exports, Form, TextBox, Label, TableLayout, UserGroupGrid, SimplePanel) {
    var UserForm = (function (_super) {
        __extends(UserForm, _super);
        function UserForm(theOptions) {
            var _this = this;
            this.user = theOptions.user;
            this.onValidationSuccess = theOptions.onValidationSuccess;
            var _userIdLabel = new Label({ label: "User Id" });
            var _userIdTextBox = new TextBox({ name: 'userId', value: this.user.userId, isRequired: true, widthInPercentage: 90 });
            var _firstNameLabel = new Label({ label: "First Name" });
            var _firstNameTextBox = new TextBox({ name: 'firstName', value: this.user.firstName, isRequired: true, widthInPercentage: 90 });
            var _lastNameLabel = new Label({ label: "Last Name" });
            var _lastNameTextBox = new TextBox({ name: 'lastName', value: this.user.lastName, isRequired: false, widthInPercentage: 90 });
            var _userGroupLabel = new Label({ label: "Group" });
            var _userGroupGrid = new UserGroupGrid({ name: 'userGroup' });
            var _simplePanel = new SimplePanel({ content: _userGroupGrid });
            var _tableLayout = new TableLayout({
                classStyling: "edit-table",
                rows: [
                    {
                        columns: [
                            { content: _userIdLabel, width: 85 },
                            { content: _userIdTextBox }
                        ]
                    },
                    {
                        columns: [
                            { content: _firstNameLabel },
                            { content: _firstNameTextBox }
                        ]
                    },
                    {
                        columns: [
                            { content: _lastNameLabel },
                            { content: _lastNameTextBox }
                        ]
                    },
                    {
                        columns: [
                            { content: _userGroupLabel, height: 180 },
                            { content: _simplePanel, height: 180 }
                        ]
                    }
                ]
            });
            var _formOptions = {
                items: [_userIdTextBox, _firstNameTextBox, _userGroupGrid],
                layout: _tableLayout,
                onValidationSuccess: _this.onValidationSuccess
            };
            _super.call(this, _formOptions);
        }
        return UserForm;
    })(Form);
    return UserForm;
});
