/**
 * Created by Yusuf on 5/25/2015.
 */

import TransactionEditWindow = require("bpa/accounting/component/TransactionEditWindow");
import TransactionList = require("bpa/accounting/component/TransactionList");
import Transaction = require("bpa/accounting/model/Transaction");
import RemoteService = require("bpa/base/data/RemoteService");
import SuccessNotification = require("bpa/base/component/SuccessNotification");
import ErrorNotification = require("bpa/base/component/ErrorNotification");
import ConfirmationWindow = require("bpa/base/component/ConfirmationWindow");
import AccountingConstant = require("bpa/accounting/AccountingConstant");

class TransactionController{

    remoteService: RemoteService;

    transactionEditWindow: TransactionEditWindow;
    transactionList: TransactionList;
    container: any;

    successNotification : SuccessNotification;
    errorNotification : ErrorNotification;

    confirmationWindow: ConfirmationWindow;

    constructor(){

        var _this = this;

        _this.successNotification = new SuccessNotification();
        _this.errorNotification = new ErrorNotification();

        this.remoteService = new RemoteService({defaultUrl: AccountingConstant.GROUPS_URL});
        this.transactionList = new TransactionList({
            onAddTransaction: function(newTransaction: Transaction){

                _this.transactionEditWindow = new TransactionEditWindow(newTransaction, function(transaction: Transaction){
                    _this.remoteService.postRequest({
                        data: transaction,
                        onSendDataSuccess: function(status: string, result: any){
                            _this.transactionEditWindow.closeWindow();
                            _this.successNotification.open();
                            _this.transactionList.refreshGrid();
                        },
                        onSendDataError: function(status: string, result: any){
                            _this.transactionEditWindow.closeWindow();
                            _this.errorNotification.open();
                        }
                    });
                });
                _this.transactionEditWindow.renderTo(this.container);
                _this.transactionEditWindow.openWindow();

            },
            onEditTransaction: function(transactionToEdit: Transaction){
                _this.transactionEditWindow = new TransactionEditWindow(transactionToEdit, function(editedTransaction: Transaction){
                    _this.remoteService.putRequest({
                        data: editedTransaction,
                        onSendDataSuccess: function(status: string, result: any){
                            _this.transactionEditWindow.closeWindow();
                            _this.successNotification.open();
                            _this.transactionList.refreshGrid();
                        },
                        onSendDataError: function(status: string, result: any){
                            _this.transactionEditWindow.closeWindow();
                            _this.errorNotification.open();
                        }
                    });

                });
                _this.transactionEditWindow.renderTo(this.container);
                _this.transactionEditWindow.openWindow();
            },
            onDeleteTransaction: function(deletedTransaction: Transaction){
                _this.confirmationWindow = new ConfirmationWindow({
                    message: "Are you sure want to delete transaction : " + deletedTransaction.code,
                    onOkButtonClick: function(){
                        _this.remoteService.deleteRequest({
                            data: deletedTransaction,
                            onSendDataSuccess: function(status: string, result: any){
                                _this.successNotification.open();
                                _this.transactionList.refreshGrid();
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
            this.transactionList.renderTo(this.container);

        }
    }

}

export = TransactionController;
