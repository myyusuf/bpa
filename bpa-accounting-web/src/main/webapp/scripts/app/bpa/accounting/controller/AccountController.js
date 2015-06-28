/**
 * Created by Yusuf on 5/25/2015.
 */
define(["require", "exports", "bpa/accounting/component/AccountEditWindow", "bpa/accounting/component/AccountList", "bpa/base/data/RemoteService", "bpa/base/component/SuccessNotification", "bpa/base/component/ErrorNotification", "bpa/base/component/ConfirmationWindow", "bpa/accounting/AccountingConstant"], function (require, exports, AccountEditWindow, AccountList, RemoteService, SuccessNotification, ErrorNotification, ConfirmationWindow, AccountingConstant) {
    var AccountController = (function () {
        function AccountController() {
            var _this = this;
            _this.successNotification = new SuccessNotification();
            _this.errorNotification = new ErrorNotification();
            this.remoteService = new RemoteService({ defaultUrl: AccountingConstant.ACCOUNTS_URL });
            this.accountList = new AccountList({
                onAddAccount: function (newAccount) {
                    console.log("account : " + newAccount);
                    _this.accountEditWindow = new AccountEditWindow(newAccount, function (account) {
                        console.log(account);
                        _this.remoteService.postRequest({
                            data: account,
                            onSendDataSuccess: function (status, result) {
                                _this.accountEditWindow.closeWindow();
                                _this.successNotification.open();
                                _this.accountList.refreshGrid();
                            },
                            onSendDataError: function (status, result) {
                                _this.accountEditWindow.closeWindow();
                                _this.errorNotification.open();
                            }
                        });
                    });
                    _this.accountEditWindow.renderTo(this.container);
                    _this.accountEditWindow.openWindow();
                },
                onEditAccount: function (accountToEdit) {
                    _this.accountEditWindow = new AccountEditWindow(accountToEdit, function (editedAccount) {
                        _this.remoteService.putRequest({
                            data: editedAccount,
                            onSendDataSuccess: function (status, result) {
                                _this.accountEditWindow.closeWindow();
                                _this.successNotification.open();
                                _this.accountList.refreshGrid();
                            },
                            onSendDataError: function (status, result) {
                                _this.accountEditWindow.closeWindow();
                                _this.errorNotification.open();
                            }
                        });
                    });
                    _this.accountEditWindow.renderTo(this.container);
                    _this.accountEditWindow.openWindow();
                },
                onDeleteAccount: function (deletedAccount) {
                    _this.confirmationWindow = new ConfirmationWindow({
                        message: "Are you sure want to delete Account : " + deletedAccount.code,
                        onOkButtonClick: function () {
                            _this.remoteService.deleteRequest({
                                data: deletedAccount,
                                onSendDataSuccess: function (status, result) {
                                    _this.successNotification.open();
                                    _this.accountList.refreshGrid();
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
        AccountController.prototype.handleRequest = function (requestType, theContainer) {
            this.container = theContainer;
            if (requestType == "view") {
                this.accountList.renderTo(this.container);
            }
        };
        return AccountController;
    })();
    return AccountController;
});
