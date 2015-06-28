/**
 * Created by Yusuf on 5/25/2015.
 */

import JournalEditWindow = require("bpa/accounting/component/JournalEditWindow");
import JournalList = require("bpa/accounting/component/JournalList");
import Journal = require("bpa/accounting/model/Journal");
import RemoteService = require("bpa/base/data/RemoteService");
import SuccessNotification = require("bpa/base/component/SuccessNotification");
import ErrorNotification = require("bpa/base/component/ErrorNotification");
import ConfirmationWindow = require("bpa/base/component/ConfirmationWindow");
import AccountingConstant = require("bpa/accounting/AccountingConstant");

class JournalController{

    remoteService: RemoteService;

    journalEditWindow: JournalEditWindow;
    journalList: JournalList;
    container: any;

    successNotification : SuccessNotification;
    errorNotification : ErrorNotification;

    confirmationWindow: ConfirmationWindow;

    constructor(){

        var _this = this;

        _this.successNotification = new SuccessNotification();
        _this.errorNotification = new ErrorNotification();

        this.remoteService = new RemoteService({defaultUrl: AccountingConstant.ACCOUNTS_URL});
        this.journalList = new JournalList({
            onAddJournal: function(newJournal: Journal){
                console.log("journalt : " + newJournal);
                _this.journalEditWindow = new JournalEditWindow(newJournal, function(journal: Journal){
                    console.log(journal);
                    _this.remoteService.postRequest({
                        data: journal,
                        onSendDataSuccess: function(status: string, result: any){
                            _this.journalEditWindow.closeWindow();
                            _this.successNotification.open();
                            _this.journalList.refreshGrid();
                        },
                        onSendDataError: function(status: string, result: any){
                            _this.journalEditWindow.closeWindow();
                            _this.errorNotification.open();
                        }
                    });
                });

                _this.journalEditWindow.renderTo(this.container);
                _this.journalEditWindow.openWindow();
            },
            onEditJournal: function(journaltToEdit: Journal){
                _this.journalEditWindow = new JournalEditWindow(journaltToEdit, function(editedJournal: Journal){
                    _this.remoteService.putRequest({
                        data: editedJournal,
                        onSendDataSuccess: function(status: string, result: any){
                            _this.journalEditWindow.closeWindow();
                            _this.successNotification.open();
                            _this.journalList.refreshGrid();
                        },
                        onSendDataError: function(status: string, result: any){
                            _this.journalEditWindow.closeWindow();
                            _this.errorNotification.open();
                        }
                    });

                });
                _this.journalEditWindow.renderTo(this.container);
                _this.journalEditWindow.openWindow();
            },
            onDeleteJournal: function(deletedJournal: Journal){
                _this.confirmationWindow = new ConfirmationWindow({
                    message: "Are you sure want to delete Journal : " + deletedJournal.journalId,
                    onOkButtonClick: function(){
                        _this.remoteService.deleteRequest({
                            data: deletedJournal,
                            onSendDataSuccess: function(status: string, result: any){
                                _this.successNotification.open();
                                _this.journalList.refreshGrid();
                            },
                            onSendDataError: function(status: string, result: any){
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

    handleRequest(requestType: string, theContainer: any){

        this.container = theContainer;

        if(requestType == "view"){
            this.journalList.renderTo(this.container);

        }
    }

}

export = JournalController;
