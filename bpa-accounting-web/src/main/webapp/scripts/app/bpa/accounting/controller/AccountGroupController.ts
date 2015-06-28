/**
 * Created by Yusuf on 5/25/2015.
 */

import AccountGroupEditWindow = require("bpa/accounting/component/AccountGroupEditWindow");
import AccountGroupList = require("bpa/accounting/component/AccountGroupList");
import AccountGroup = require("bpa/accounting/model/AccountGroup");
import RemoteService = require("bpa/base/data/RemoteService");
import SuccessNotification = require("bpa/base/component/SuccessNotification");
import ErrorNotification = require("bpa/base/component/ErrorNotification");
import ConfirmationWindow = require("bpa/base/component/ConfirmationWindow");
import AccountGroupingConstant = require("bpa/accounting/AccountingConstant");

class AccountGroupController{

    remoteService: RemoteService;

    accountGroupEditWindow: AccountGroupEditWindow;
    accountGroupList: AccountGroupList;
    container: any;

    successNotification : SuccessNotification;
    errorNotification : ErrorNotification;

    confirmationWindow: ConfirmationWindow;

    constructor(){

        var _this = this;

        _this.successNotification = new SuccessNotification();
        _this.errorNotification = new ErrorNotification();

        this.remoteService = new RemoteService({defaultUrl: AccountGroupingConstant.ACCOUNTGROUPS_URL});
        this.accountGroupList = new AccountGroupList({
            onAddAccountGroup: function(newAccountGroup: AccountGroup){
                console.log("accountGroup : " + newAccountGroup);
                _this.accountGroupEditWindow = new AccountGroupEditWindow(newAccountGroup, function(accountGroup: AccountGroup){
                    console.log(accountGroup);
                    _this.remoteService.postRequest({
                        data: accountGroup,
                        onSendDataSuccess: function(status: string, result: any){
                            _this.accountGroupEditWindow.closeWindow();
                            _this.successNotification.open();
                            _this.accountGroupList.refreshGrid();
                        },
                        onSendDataError: function(status: string, result: any){
                            _this.accountGroupEditWindow.closeWindow();
                            _this.errorNotification.open();
                        }
                    });
                });

                _this.accountGroupEditWindow.renderTo(this.container);
                _this.accountGroupEditWindow.openWindow();
            },
            onEditAccountGroup: function(accountGroupToEdit: AccountGroup){
                _this.accountGroupEditWindow = new AccountGroupEditWindow(accountGroupToEdit, function(editedAccountGroup: AccountGroup){
                    _this.remoteService.putRequest({
                        data: editedAccountGroup,
                        onSendDataSuccess: function(status: string, result: any){
                            _this.accountGroupEditWindow.closeWindow();
                            _this.successNotification.open();
                            _this.accountGroupList.refreshGrid();
                        },
                        onSendDataError: function(status: string, result: any){
                            _this.accountGroupEditWindow.closeWindow();
                            _this.errorNotification.open();
                        }
                    });

                });
                _this.accountGroupEditWindow.renderTo(this.container);
                _this.accountGroupEditWindow.openWindow();
            },
            onDeleteAccountGroup: function(deletedAccountGroup: AccountGroup){
                _this.confirmationWindow = new ConfirmationWindow({
                    message: "Are you sure want to delete AccountGroup : " + deletedAccountGroup.code,
                    onOkButtonClick: function(){
                        _this.remoteService.deleteRequest({
                            data: deletedAccountGroup,
                            onSendDataSuccess: function(status: string, result: any){
                                _this.successNotification.open();
                                _this.accountGroupList.refreshGrid();
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
            this.accountGroupList.renderTo(this.container);

        }
    }

}

export = AccountGroupController;
