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
define(["require", "exports", "bpa/base/component/container/EditWindow", "bpa/security/component/UserForm"], function (require, exports, EditWindow, UserForm) {
    var UserEditWindow = (function (_super) {
        __extends(UserEditWindow, _super);
        function UserEditWindow(user, theOnSaveListener) {
            _super.call(this, { title: "Edit User", width: 426, height: 443 });
            var _this = this;
            _this.user = user;
            _this.onSaveUserListener = theOnSaveListener;
        }
        UserEditWindow.prototype.buildEditWindowContent = function () {
            var _this = this;
            var _userForm = new UserForm({ user: this.user, onValidationSuccess: function () {
                _this.onSaveUserListener(_userForm.getValue());
            } });
            return { content: _userForm, onSaveButtonClick: function () {
                _userForm.validate();
            }, onCancelButtonClick: function () {
                _this.closeWindow();
            } };
        };
        return UserEditWindow;
    })(EditWindow);
    return UserEditWindow;
});
