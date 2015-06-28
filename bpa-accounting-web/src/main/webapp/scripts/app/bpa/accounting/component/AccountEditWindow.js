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
define(["require", "exports", "bpa/base/component/container/EditWindow", "bpa/accounting/component/AccountForm"], function (require, exports, EditWindow, AccountForm) {
    var AccountEditWindow = (function (_super) {
        __extends(AccountEditWindow, _super);
        function AccountEditWindow(account, theOnSaveAccountListener) {
            _super.call(this, { width: 390, height: 348 });
            var _this = this;
            _this.account = account;
            if (_this.isEditMode()) {
                _this.title = "Edit Account";
            }
            else {
                _this.title = "Add Account";
            }
            _this.onSaveAccountListener = theOnSaveAccountListener;
        }
        AccountEditWindow.prototype.buildEditWindowContent = function () {
            var _this = this;
            var _accountForm = new AccountForm({ account: this.account, onValidationSuccess: function () {
                _this.onSaveAccountListener(_accountForm.getValue());
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
        AccountEditWindow.prototype.isEditMode = function () {
            if (this.account != undefined && this.account != null && this.account.code != null && this.account.code != "") {
                return true;
            }
            else {
                return false;
            }
        };
        return AccountEditWindow;
    })(EditWindow);
    return AccountEditWindow;
});
