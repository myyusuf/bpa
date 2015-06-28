/**
 * Created by Yusuf on 5/25/2015.
 */

import AccountEditWindow = require("bpa/accounting/component/AccountEditWindow");
import AccountList = require("bpa/accounting/component/AccountList");
import Account = require("bpa/accounting/model/Account");
import RemoteService = require("bpa/base/data/RemoteService");
import SuccessNotification = require("bpa/base/component/SuccessNotification");
import ErrorNotification = require("bpa/base/component/ErrorNotification");
import ConfirmationWindow = require("bpa/base/component/ConfirmationWindow");
import AccountingConstant = require("bpa/accounting/AccountingConstant");

class AccountController{

    remoteService: RemoteService;

    accountEditWindow: AccountEditWindow;
    accountList: AccountList;
    container: any;

    successNotification : SuccessNotification;
    errorNotification : ErrorNotification;

    confirmationWindow: ConfirmationWindow;

    constructor(){

        var _this = this;

        _this.successNotification = new SuccessNotification();
        _this.errorNotification = new ErrorNotification();

        this.remoteService = new RemoteService({defaultUrl: AccountingConstant.ACCOUNTS_URL});
        this.accountList = new AccountList({
            onAddAccount: function(newAccount: Account){
                console.log("account : " + newAccount);
                _this.accountEditWindow = new AccountEditWindow(newAccount, function(account: Account){
                    console.log(account);
                    _this.remoteService.postRequest({
                        data: account,
                        onSendDataSuccess: function(status: string, result: any){
                            _this.accountEditWindow.closeWindow();
                            _this.successNotification.open();
                            _this.accountList.refreshGrid();
                        },
                        onSendDataError: function(status: string, result: any){
                            _this.accountEditWindow.closeWindow();
                            _this.errorNotification.open();
                        }
                    });
                });

                _this.accountEditWindow.renderTo(this.container);
                _this.accountEditWindow.openWindow();
            },
            onEditAccount: function(accountToEdit: Account){
                _this.accountEditWindow = new AccountEditWindow(accountToEdit, function(editedAccount: Account){
                    _this.remoteService.putRequest({
                        data: editedAccount,
                        onSendDataSuccess: function(status: string, result: any){
                            _this.accountEditWindow.closeWindow();
                            _this.successNotification.open();
                            _this.accountList.refreshGrid();
                        },
                        onSendDataError: function(status: string, result: any){
                            _this.accountEditWindow.closeWindow();
                            _this.errorNotification.open();
                        }
                    });

                });
                _this.accountEditWindow.renderTo(this.container);
                _this.accountEditWindow.openWindow();
            },
            onDeleteAccount: function(deletedAccount: Account){
                _this.confirmationWindow = new ConfirmationWindow({
                    message: "Are you sure want to delete Account : " + deletedAccount.code,
                    onOkButtonClick: function(){
                        _this.remoteService.deleteRequest({
                            data: deletedAccount,
                            onSendDataSuccess: function(status: string, result: any){
                                _this.successNotification.open();
                                _this.accountList.refreshGrid();
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
            this.accountList.renderTo(this.container);

        }
    }

}

export = AccountController;
