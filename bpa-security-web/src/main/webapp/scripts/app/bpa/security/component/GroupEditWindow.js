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
define(["require", "exports", "bpa/base/component/container/EditWindow", "bpa/security/component/GroupForm"], function (require, exports, EditWindow, GroupForm) {
    var GroupEditWindow = (function (_super) {
        __extends(GroupEditWindow, _super);
        function GroupEditWindow(group, theOnSaveGroupListener) {
            _super.call(this, { width: 300, height: 180 });
            var _this = this;
            _this.group = group;
            if (_this.isEditMode()) {
                _this.title = "Edit Group";
            }
            else {
                _this.title = "Add Group";
            }
            _this.onSaveGroupListener = theOnSaveGroupListener;
        }
        GroupEditWindow.prototype.buildEditWindowContent = function () {
            var _this = this;
            var _groupForm = new GroupForm({ group: this.group, onValidationSuccess: function () {
                _this.onSaveGroupListener(_groupForm.getValue());
            } });
            if (_this.isEditMode()) {
                _groupForm.editMode();
            }
            else {
                _groupForm.newMode();
            }
            return { content: _groupForm, onSaveButtonClick: function () {
                _groupForm.validate();
            }, onCancelButtonClick: function () {
                _this.closeWindow();
            } };
        };
        GroupEditWindow.prototype.isEditMode = function () {
            if (this.group != undefined && this.group != null && this.group.code != null && this.group.code != "") {
                return true;
            }
            else {
                return false;
            }
        };
        return GroupEditWindow;
    })(EditWindow);
    return GroupEditWindow;
});
