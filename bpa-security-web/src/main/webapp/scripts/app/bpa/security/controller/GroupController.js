/**
 * Created by Yusuf on 5/25/2015.
 */
define(["require", "exports", "bpa/security/component/GroupEditWindow", "bpa/security/component/GroupList", "bpa/base/data/RemoteService", "bpa/base/component/SuccessNotification", "bpa/base/component/ErrorNotification", "bpa/base/component/ConfirmationWindow", "bpa/security/SecurityConstant"], function (require, exports, GroupEditWindow, GroupList, RemoteService, SuccessNotification, ErrorNotification, ConfirmationWindow, SecurityConstant) {
    var GroupController = (function () {
        function GroupController() {
            var _this = this;
            _this.successNotification = new SuccessNotification();
            _this.errorNotification = new ErrorNotification();
            this.remoteService = new RemoteService({ defaultUrl: SecurityConstant.GROUPS_URL });
            this.groupList = new GroupList({
                onAddGroup: function (newGroup) {
                    _this.groupEditWindow = new GroupEditWindow(newGroup, function (group) {
                        _this.remoteService.postRequest({
                            data: group,
                            onSendDataSuccess: function (status, result) {
                                _this.groupEditWindow.closeWindow();
                                _this.successNotification.open();
                                _this.groupList.refreshGrid();
                            },
                            onSendDataError: function (status, result) {
                                _this.groupEditWindow.closeWindow();
                                _this.errorNotification.open();
                            }
                        });
                    });
                    _this.groupEditWindow.renderTo(this.container);
                    _this.groupEditWindow.openWindow();
                },
                onEditGroup: function (groupToEdit) {
                    _this.groupEditWindow = new GroupEditWindow(groupToEdit, function (editedGroup) {
                        _this.remoteService.putRequest({
                            data: editedGroup,
                            onSendDataSuccess: function (status, result) {
                                _this.groupEditWindow.closeWindow();
                                _this.successNotification.open();
                                _this.groupList.refreshGrid();
                            },
                            onSendDataError: function (status, result) {
                                _this.groupEditWindow.closeWindow();
                                _this.errorNotification.open();
                            }
                        });
                    });
                    _this.groupEditWindow.renderTo(this.container);
                    _this.groupEditWindow.openWindow();
                },
                onDeleteGroup: function (deletedGroup) {
                    _this.confirmationWindow = new ConfirmationWindow({
                        message: "Are you sure want to delete group : " + deletedGroup.code,
                        onOkButtonClick: function () {
                            _this.remoteService.deleteRequest({
                                data: deletedGroup,
                                onSendDataSuccess: function (status, result) {
                                    _this.successNotification.open();
                                    _this.groupList.refreshGrid();
                                },
                                onSendDataError: function (status, result) {
                                    _this.errorNotification.open();
                                }
                            });
                        }
                    });
                    _this.confirmationWindow.renderTo(this.container);
                    _this.confirmationWindow.openWindow();
                }
            });
        }
        GroupController.prototype.handleRequest = function (requestType, theContainer) {
            this.container = theContainer;
            if (requestType == "view") {
                this.groupList.renderTo(this.container);
            }
        };
        return GroupController;
    })();
    return GroupController;
});
