/**
 * Created by Yusuf on 5/25/2015.
 */

import GroupEditWindow = require("bpa/security/component/GroupEditWindow");
import GroupList = require("bpa/security/component/GroupList");
import Group = require("bpa/security/model/Group");
import RemoteService = require("bpa/base/data/RemoteService");
import SuccessNotification = require("bpa/base/component/SuccessNotification");
import ErrorNotification = require("bpa/base/component/ErrorNotification");
import ConfirmationWindow = require("bpa/base/component/ConfirmationWindow");
import SecurityConstant = require("bpa/security/SecurityConstant");

class GroupController{

    remoteService: RemoteService;

    groupEditWindow: GroupEditWindow;
    groupList: GroupList;
    container: any;

    successNotification : SuccessNotification;
    errorNotification : ErrorNotification;

    confirmationWindow: ConfirmationWindow;

    constructor(){

        var _this = this;

        _this.successNotification = new SuccessNotification();
        _this.errorNotification = new ErrorNotification();

        this.remoteService = new RemoteService({defaultUrl: SecurityConstant.GROUPS_URL});
        this.groupList = new GroupList({
            onAddGroup: function(newGroup: Group){

                _this.groupEditWindow = new GroupEditWindow(newGroup, function(group: Group){
                    _this.remoteService.postRequest({
                        data: group,
                        onSendDataSuccess: function(status: string, result: any){
                            _this.groupEditWindow.closeWindow();
                            _this.successNotification.open();
                            _this.groupList.refreshGrid();
                        },
                        onSendDataError: function(status: string, result: any){
                            _this.groupEditWindow.closeWindow();
                            _this.errorNotification.open();
                        }
                    });
                });
                _this.groupEditWindow.renderTo(this.container);
                _this.groupEditWindow.openWindow();

            },
            onEditGroup: function(groupToEdit: Group){
                _this.groupEditWindow = new GroupEditWindow(groupToEdit, function(editedGroup: Group){
                    _this.remoteService.putRequest({
                        data: editedGroup,
                        onSendDataSuccess: function(status: string, result: any){
                            _this.groupEditWindow.closeWindow();
                            _this.successNotification.open();
                            _this.groupList.refreshGrid();
                        },
                        onSendDataError: function(status: string, result: any){
                            _this.groupEditWindow.closeWindow();
                            _this.errorNotification.open();
                        }
                    });

                });
                _this.groupEditWindow.renderTo(this.container);
                _this.groupEditWindow.openWindow();
            },
            onDeleteGroup: function(deletedGroup: Group){
                _this.confirmationWindow = new ConfirmationWindow({
                    message: "Are you sure want to delete group : " + deletedGroup.code,
                    onOkButtonClick: function(){
                        _this.remoteService.deleteRequest({
                            data: deletedGroup,
                            onSendDataSuccess: function(status: string, result: any){
                                _this.successNotification.open();
                                _this.groupList.refreshGrid();
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
            this.groupList.renderTo(this.container);

        }
    }

}

export = GroupController;
