/**
 * Created by Yusuf on 5/9/2015.
 */
/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import EditWindow = require("bpa/base/component/container/EditWindow");
import EditWindowOptions = require("bpa/base/component/container/EditWindowOptions");
import UserForm = require("bpa/security/component/UserForm");
import Button = require("bpa/base/component/Button");
import User = require("bpa/security/model/User");
import OnSaveUserListener = require("bpa/security/component/event/OnSaveUserListener");
import EditWindowContent = require("bpa/base/component/container/EditWindowContent");

class UserEditWindow extends EditWindow{

    onSaveUserListener: OnSaveUserListener;
    user: User;

    constructor(user: User, theOnSaveListener: OnSaveUserListener) {

        super({width: 426, height: 443});

        var _this = this;

        _this.user = user;

        if(_this.isEditMode()){
            _this.title = "Edit User";
        }else{
            _this.title = "Add User";
        }

        _this.onSaveUserListener = theOnSaveListener;
    }

    buildEditWindowContent() : EditWindowContent{

        var _this = this;
        var _userForm: UserForm = new UserForm({user: this.user, onValidationSuccess: function(){
            _this.onSaveUserListener(_userForm.getValue());
        }});

        return {content : _userForm,
            onSaveButtonClick : function(){
                _userForm.validate();
            },
            onCancelButtonClick: function(){
                _this.closeWindow();
            }
        };
    }

    isEditMode(){
        if(this.user != undefined && this.user != null && this.user.userId != null && this.user.userId != ""){
            return true;
        }else{
            return false;
        }
    }

}

export  = UserEditWindow;
