/**
 * Created by Yusuf on 5/25/2015.
 */

import UserEditWindow = require("bpa/security/component/UserEditWindow");
import UserList = require("bpa/security/component/UserList");
import User = require("bpa/security/model/User");
import RemoteService = require("bpa/base/data/RemoteService");
import SuccessNotification = require("bpa/base/component/SuccessNotification");
import ErrorNotification = require("bpa/base/component/ErrorNotification");
import ConfirmationWindow = require("bpa/base/component/ConfirmationWindow");
import SecurityConstant = require("bpa/security/SecurityConstant");


class UserController{

    remoteService: RemoteService;

    userEditWindow: UserEditWindow;
    userList: UserList;
    container: any;

    successNotification : SuccessNotification;
    errorNotification : ErrorNotification;

    confirmationWindow: ConfirmationWindow;

    constructor(){

        var _this = this;

        _this.successNotification = new SuccessNotification();
        _this.errorNotification = new ErrorNotification();

        this.remoteService = new RemoteService({defaultUrl: SecurityConstant.USERS_URL});
        this.userList = new UserList({
            onAddUser: function(newUser: User){

                _this.userEditWindow = new UserEditWindow(newUser, function(user: User){
                    _this.remoteService.postRequest({
                        data: user,
                        onSendDataSuccess: function(status: string, result: any){
                            _this.userEditWindow.closeWindow();
                            _this.userList.refreshGrid();
                            _this.successNotification.open();
                        },
                        onSendDataError: function(status: string, result: any){
                            //_this.userEditWindow.closeWindow();
                            _this.errorNotification.open();
                        }
                    });
                });
                _this.userEditWindow.renderTo(this.container);
                _this.userEditWindow.openWindow();

            },
            onEditUser: function(userToEdit: User){

                var _userGroupUrl = SecurityConstant.USERS_URL + "/" + userToEdit.userId + "/groups"
                _this.remoteService.getRequest({
                    data: userToEdit,
                    url: _userGroupUrl,
                    onSendDataSuccess: function(status: string, result: any){
                        console.log(result);
                        var _groups = result.data;

                        userToEdit.groups = _groups;

                        _this.userEditWindow = new UserEditWindow(userToEdit, function(user: User){
                            _this.remoteService.putRequest({
                                data: user,
                                onSendDataSuccess: function(status: string, result: any){
                                    _this.userEditWindow.closeWindow();
                                    _this.userList.refreshGrid();
                                    _this.successNotification.open();
                                },
                                onSendDataError: function(status: string, result: any){
                                    //_this.userEditWindow.closeWindow();
                                    _this.errorNotification.open();
                                }
                            });
                        });
                        _this.userEditWindow.renderTo(this.container);
                        _this.userEditWindow.openWindow();

                    },
                    onSendDataError: function(status: string, result: any){

                        _this.errorNotification.open();
                    }

                });
            },
            onDeleteUser: function(deletedUser: User){
                _this.confirmationWindow = new ConfirmationWindow({
                    message: "Are you sure want to delete User : " + deletedUser.userId,
                    onOkButtonClick: function(){
                        _this.remoteService.deleteRequest({
                            data: deletedUser,
                            onSendDataSuccess: function(status: string, result: any){
                                _this.successNotification.open();
                                _this.userList.refreshGrid();
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
            this.userList.renderTo(this.container);

        }
    }

}

export = UserController;
