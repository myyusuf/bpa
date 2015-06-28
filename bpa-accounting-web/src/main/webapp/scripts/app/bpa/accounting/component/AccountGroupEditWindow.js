/**
 * Created by Yusuf on 5/9/2015.
 */
/// <reference path="../../../ts/jquery.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/container/EditWindow", "bpa/accounting/component/AccountGroupForm"], function (require, exports, EditWindow, AccountGroupForm) {
    var AccountGroupEditWindow = (function (_super) {
        __extends(AccountGroupEditWindow, _super);
        function AccountGroupEditWindow(accountGroup, theOnSaveAccountGroupListener) {
            _super.call(this, { width: 390, height: 286 });
            var _this = this;
            _this.accountGroup = accountGroup;
            if (_this.isEditMode()) {
                _this.title = "Edit Account Group";
            }
            else {
                _this.title = "Add Account Group";
            }
            _this.onSaveAccountGroupListener = theOnSaveAccountGroupListener;
        }
        AccountGroupEditWindow.prototype.buildEditWindowContent = function () {
            var _this = this;
            var _accountForm = new AccountGroupForm({ accountGroup: this.accountGroup, onValidationSuccess: function () {
                _this.onSaveAccountGroupListener(_accountForm.getValue());
            } });
            if (_this.isEditMode()) {
                _accountForm.editMode();
            }
            else {
                _accountForm.newMode();
            }
            return { content: _accountForm, onSaveButtonClick: function () {
                _accountForm.validate();
            }, onCancelButtonClick: function () {
                _this.closeWindow();
            } };
        };
        AccountGroupEditWindow.prototype.isEditMode = function () {
            if (this.accountGroup != undefined && this.accountGroup != null && this.accountGroup.code != null && this.accountGroup.code != "") {
                return true;
            }
            else {
                return false;
            }
        };
        return AccountGroupEditWindow;
    })(EditWindow);
    return AccountGroupEditWindow;
});
