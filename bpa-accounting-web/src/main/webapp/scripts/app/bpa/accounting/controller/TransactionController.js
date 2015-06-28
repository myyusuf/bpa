/**
 * Created by Yusuf on 5/25/2015.
 */
define(["require", "exports", "bpa/accounting/component/TransactionEditWindow", "bpa/accounting/component/TransactionList", "bpa/base/data/RemoteService", "bpa/base/component/SuccessNotification", "bpa/base/component/ErrorNotification", "bpa/base/component/ConfirmationWindow", "bpa/accounting/AccountingConstant"], function (require, exports, TransactionEditWindow, TransactionList, RemoteService, SuccessNotification, ErrorNotification, ConfirmationWindow, AccountingConstant) {
    var TransactionController = (function () {
        function TransactionController() {
            var _this = this;
            _this.successNotification = new SuccessNotification();
            _this.errorNotification = new ErrorNotification();
            this.remoteService = new RemoteService({ defaultUrl: AccountingConstant.GROUPS_URL });
            this.transactionList = new TransactionList({
                onAddTransaction: function (newTransaction) {
                    _this.transactionEditWindow = new TransactionEditWindow(newTransaction, function (transaction) {
                        _this.remoteService.postRequest({
                            data: transaction,
                            onSendDataSuccess: function (status, result) {
                                _this.transactionEditWindow.closeWindow();
                                _this.successNotification.open();
                                _this.transactionList.refreshGrid();
                            },
                            onSendDataError: function (status, result) {
                                _this.transactionEditWindow.closeWindow();
                                _this.errorNotification.open();
                            }
                        });
                    });
                    _this.transactionEditWindow.renderTo(this.container);
                    _this.transactionEditWindow.openWindow();
                },
                onEditTransaction: function (transactionToEdit) {
                    _this.transactionEditWindow = new TransactionEditWindow(transactionToEdit, function (editedTransaction) {
                        _this.remoteService.putRequest({
                            data: editedTransaction,
                            onSendDataSuccess: function (status, result) {
                                _this.transactionEditWindow.closeWindow();
                                _this.successNotification.open();
                                _this.transactionList.refreshGrid();
                            },
                            onSendDataError: function (status, result) {
                                _this.transactionEditWindow.closeWindow();
                                _this.errorNotification.open();
                            }
                        });
                    });
                    _this.transactionEditWindow.renderTo(this.container);
                    _this.transactionEditWindow.openWindow();
                },
                onDeleteTransaction: function (deletedTransaction) {
                    _this.confirmationWindow = new ConfirmationWindow({
                        message: "Are you sure want to delete transaction : " + deletedTransaction.code,
                        onOkButtonClick: function () {
                            _this.remoteService.deleteRequest({
                                data: deletedTransaction,
                                onSendDataSuccess: function (status, result) {
                                    _this.successNotification.open();
                                    _this.transactionList.refreshGrid();
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
        TransactionController.prototype.handleRequest = function (requestType, theContainer) {
            this.container = theContainer;
            if (requestType == "view") {
                this.transactionList.renderTo(this.container);
            }
        };
        return TransactionController;
    })();
    return TransactionController;
});
