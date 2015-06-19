/**
 * Created by Yusuf on 5/25/2015.
 */
define(["require", "exports", "bpa/security/component/UserEditWindow", "bpa/security/component/UserList", "bpa/base/data/RemoteService", "bpa/base/component/SuccessNotification", "bpa/base/component/ErrorNotification"], function (require, exports, UserEditWindow, UserList, RemoteService, SuccessNotification, ErrorNotification) {
    var UserController = (function () {
        function UserController() {
            var _this = this;
            _this.successNotification = new SuccessNotification();
            _this.errorNotification = new ErrorNotification();
            this.remoteService = new RemoteService({ defaultUrl: "sample/bpa/security/users" });
            this.userList = new UserList({
                onAddUser: function (newUser) {
                    _this.userEditWindow = new UserEditWindow(newUser, function (user) {
                        _this.remoteService.postRequest({
                            data: user,
                            onSendDataSuccess: function (status, result) {
                                _this.userEditWindow.closeWindow();
                                _this.successNotification.open();
                            },
                            onSendDataError: function (status, result) {
                                _this.userEditWindow.closeWindow();
                                _this.errorNotification.open();
                            }
                        });
                    });
                    _this.userEditWindow.renderTo(this.container);
                    _this.userEditWindow.openWindow();
                },
                onEditUser: function (user) {
                    console.log("userId : " + user.userId);
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