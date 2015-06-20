/**
 * Created by Yusuf on 5/25/2015.
 */
define(["require", "exports", "bpa/security/component/UserEditWindow", "bpa/security/component/UserList", "bpa/base/data/RemoteService", "bpa/base/component/SuccessNotification", "bpa/base/component/ErrorNotification", "bpa/base/component/ConfirmationWindow", "bpa/security/SecurityConstant"], function (require, exports, UserEditWindow, UserList, RemoteService, SuccessNotification, ErrorNotification, ConfirmationWindow, SecurityConstant) {
    var UserController = (function () {
        function UserController() {
            var _this = this;
            _this.successNotification = new SuccessNotification();
            _this.errorNotification = new ErrorNotification();
            this.remoteService = new RemoteService({ defaultUrl: SecurityConstant.USERS_URL });
            this.userList = new UserList({
                onAddUser: function (newUser) {
                    _this.userEditWindow = new UserEditWindow(newUser, function (user) {
                        _this.remoteService.postRequest({
                            data: user,
                            onSendDataSuccess: function (status, result) {
                                _this.userEditWindow.closeWindow();
                                _this.userList.refreshGrid();
                                _this.successNotification.open();
                            },
                            onSendDataError: function (status, result) {
                                //_this.userEditWindow.closeWindow();
                                _this.errorNotification.open();
                            }
                        });
                    });
                    _this.userEditWindow.renderTo(this.container);
                    _this.userEditWindow.openWindow();
                },
                onEditUser: function (userToEdit) {
                    var _userGroupUrl = SecurityConstant.USERS_URL + "/" + userToEdit.userId + "/groups";
                    _this.remoteService.getRequest({
                        data: userToEdit,
                        url: _userGroupUrl,
                        onSendDataSuccess: function (status, result) {
                            console.log(result);
                            var _groups = result.data;
                            userToEdit.groups = _groups;
                            _this.userEditWindow = new UserEditWindow(userToEdit, function (user) {
                                _this.remoteService.putRequest({
                                    data: user,
                                    onSendDataSuccess: function (status, result) {
                                        _this.userEditWindow.closeWindow();
                                        _this.userList.refreshGrid();
                                        _this.successNotification.open();
                                    },
                                    onSendDataError: function (status, result) {
                                        //_this.userEditWindow.closeWindow();
                                        _this.errorNotification.open();
                                    }
                                });
                            });
                            _this.userEditWindow.renderTo(this.container);
                            _this.userEditWindow.openWindow();
                        },
                        onSendDataError: function (status, result) {
                            _this.errorNotification.open();
                        }
                    });
                },
                onDeleteUser: function (deletedUser) {
                    _this.confirmationWindow = new ConfirmationWindow({
                        message: "Are you sure want to delete User : " + deletedUser.userId,
                        onOkButtonClick: function () {
                            _this.remoteService.deleteRequest({
                                data: deletedUser,
                                onSendDataSuccess: function (status, result) {
                                    _this.successNotification.open();
                                    _this.userList.refreshGrid();
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
        UserController.prototype.handleRequest = function (requestType, theContainer) {
            this.container = theContainer;
            if (requestType == "view") {
                this.userList.renderTo(this.container);
            }
        };
        return UserController;
    })();
    return UserController;
});
