/**
 * Created by Yusuf on 5/25/2015.
 */
define(["require", "exports", "bpa/accounting/component/AccountGroupEditWindow", "bpa/accounting/component/AccountGroupList", "bpa/base/data/RemoteService", "bpa/base/component/SuccessNotification", "bpa/base/component/ErrorNotification", "bpa/base/component/ConfirmationWindow", "bpa/accounting/AccountingConstant"], function (require, exports, AccountGroupEditWindow, AccountGroupList, RemoteService, SuccessNotification, ErrorNotification, ConfirmationWindow, AccountGroupingConstant) {
    var AccountGroupController = (function () {
        function AccountGroupController() {
            var _this = this;
            _this.successNotification = new SuccessNotification();
            _this.errorNotification = new ErrorNotification();
            this.remoteService = new RemoteService({ defaultUrl: AccountGroupingConstant.ACCOUNTGROUPS_URL });
            this.accountGroupList = new AccountGroupList({
                onAddAccountGroup: function (newAccountGroup) {
                    console.log("accountGroup : " + newAccountGroup);
                    _this.accountGroupEditWindow = new AccountGroupEditWindow(newAccountGroup, function (accountGroup) {
                        console.log(accountGroup);
                        _this.remoteService.postRequest({
                            data: accountGroup,
                            onSendDataSuccess: function (status, result) {
                                _this.accountGroupEditWindow.closeWindow();
                                _this.successNotification.open();
                                _this.accountGroupList.refreshGrid();
                            },
                            onSendDataError: function (status, result) {
                                _this.accountGroupEditWindow.closeWindow();
                                _this.errorNotification.open();
                            }
                        });
                    });
                    _this.accountGroupEditWindow.renderTo(this.container);
                    _this.accountGroupEditWindow.openWindow();
                },
                onEditAccountGroup: function (accountGroupToEdit) {
                    _this.accountGroupEditWindow = new AccountGroupEditWindow(accountGroupToEdit, function (editedAccountGroup) {
                        _this.remoteService.putRequest({
                            data: editedAccountGroup,
                            onSendDataSuccess: function (status, result) {
                                _this.accountGroupEditWindow.closeWindow();
                                _this.successNotification.open();
                                _this.accountGroupList.refreshGrid();
                            },
                            onSendDataError: function (status, result) {
                                _this.accountGroupEditWindow.closeWindow();
                                _this.errorNotification.open();
                            }
                        });
                    });
                    _this.accountGroupEditWindow.renderTo(this.container);
                    _this.accountGroupEditWindow.openWindow();
                },
                onDeleteAccountGroup: function (deletedAccountGroup) {
                    _this.confirmationWindow = new ConfirmationWindow({
                        message: "Are you sure want to delete AccountGroup : " + deletedAccountGroup.code,
                        onOkButtonClick: function () {
                            _this.remoteService.deleteRequest({
                                data: deletedAccountGroup,
                                onSendDataSuccess: function (status, result) {
                                    _this.successNotification.open();
                                    _this.accountGroupList.refreshGrid();
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
        AccountGroupController.prototype.handleRequest = function (requestType, theContainer) {
            this.container = theContainer;
            if (requestType == "view") {
                this.accountGroupList.renderTo(this.container);
            }
        };
        return AccountGroupController;
    })();
    return AccountGroupController;
});
