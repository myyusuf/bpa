/**
 * Created by Yusuf on 5/25/2015.
 */
define(["require", "exports", "bpa/accounting/component/JournalEditWindow", "bpa/accounting/component/JournalList", "bpa/base/data/RemoteService", "bpa/base/component/SuccessNotification", "bpa/base/component/ErrorNotification", "bpa/base/component/ConfirmationWindow", "bpa/accounting/AccountingConstant"], function (require, exports, JournalEditWindow, JournalList, RemoteService, SuccessNotification, ErrorNotification, ConfirmationWindow, AccountingConstant) {
    var JournalController = (function () {
        function JournalController() {
            var _this = this;
            _this.successNotification = new SuccessNotification();
            _this.errorNotification = new ErrorNotification();
            this.remoteService = new RemoteService({ defaultUrl: AccountingConstant.ACCOUNTS_URL });
            this.journalList = new JournalList({
                onAddJournal: function (newJournal) {
                    console.log("journalt : " + newJournal);
                    _this.journalEditWindow = new JournalEditWindow(newJournal, function (journal) {
                        console.log(journal);
                        _this.remoteService.postRequest({
                            data: journal,
                            onSendDataSuccess: function (status, result) {
                                _this.journalEditWindow.closeWindow();
                                _this.successNotification.open();
                                _this.journalList.refreshGrid();
                            },
                            onSendDataError: function (status, result) {
                                _this.journalEditWindow.closeWindow();
                                _this.errorNotification.open();
                            }
                        });
                    });
                    _this.journalEditWindow.renderTo(this.container);
                    _this.journalEditWindow.openWindow();
                },
                onEditJournal: function (journaltToEdit) {
                    _this.journalEditWindow = new JournalEditWindow(journaltToEdit, function (editedJournal) {
                        _this.remoteService.putRequest({
                            data: editedJournal,
                            onSendDataSuccess: function (status, result) {
                                _this.journalEditWindow.closeWindow();
                                _this.successNotification.open();
                                _this.journalList.refreshGrid();
                            },
                            onSendDataError: function (status, result) {
                                _this.journalEditWindow.closeWindow();
                                _this.errorNotification.open();
                            }
                        });
                    });
                    _this.journalEditWindow.renderTo(this.container);
                    _this.journalEditWindow.openWindow();
                },
                onDeleteJournal: function (deletedJournal) {
                    _this.confirmationWindow = new ConfirmationWindow({
                        message: "Are you sure want to delete Journal : " + deletedJournal.journalId,
                        onOkButtonClick: function () {
                            _this.remoteService.deleteRequest({
                                data: deletedJournal,
                                onSendDataSuccess: function (status, result) {
                                    _this.successNotification.open();
                                    _this.journalList.refreshGrid();
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
        JournalController.prototype.handleRequest = function (requestType, theContainer) {
            this.container = theContainer;
            if (requestType == "view") {
                this.journalList.renderTo(this.container);
            }
        };
        return JournalController;
    })();
    return JournalController;
});
