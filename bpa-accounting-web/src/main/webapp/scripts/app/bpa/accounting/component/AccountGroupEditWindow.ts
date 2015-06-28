/**
 * Created by Yusuf on 5/9/2015.
 */
/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import EditWindow = require("bpa/base/component/container/EditWindow");
import EditWindowOptions = require("bpa/base/component/container/EditWindowOptions");
import AccountGroupForm = require("bpa/accounting/component/AccountGroupForm");
import Button = require("bpa/base/component/Button");
import AccountGroup = require("bpa/accounting/model/AccountGroup");
import OnSaveAccountGroupListener = require("bpa/accounting/component/event/OnSaveAccountGroupListener");
import EditWindowContent = require("bpa/base/component/container/EditWindowContent");

class AccountGroupEditWindow extends EditWindow{

    onSaveAccountGroupListener: OnSaveAccountGroupListener;
    accountGroup: AccountGroup;

    constructor(accountGroup: AccountGroup, theOnSaveAccountGroupListener: OnSaveAccountGroupListener) {

        super({width: 390, height: 286});

        var _this = this;

        _this.accountGroup = accountGroup;

        if(_this.isEditMode()){
            _this.title = "Edit Account Group";
        }else{
            _this.title = "Add Account Group";
        }

        _this.onSaveAccountGroupListener = theOnSaveAccountGroupListener;
        
    }

    buildEditWindowContent() : EditWindowContent{

        var _this = this;
        var _accountForm: AccountGroupForm = new AccountGroupForm({accountGroup: this.accountGroup, onValidationSuccess: function(){
            _this.onSaveAccountGroupListener(_accountForm.getValue());
        }});

        if(_this.isEditMode()){
            _accountForm.editMode();
        }else{
            _accountForm.newMode();
        }

        return {content : _accountForm,
            onSaveButtonClick : function(){
                _accountForm.validate();
            },
            onCancelButtonClick: function(){
                _this.closeWindow();
            }
        };
    }

    isEditMode(){
        if(this.accountGroup != undefined && this.accountGroup != null && this.accountGroup.code != null && this.accountGroup.code != ""){
            return true;
        }else{
            return false;
        }
    }

}

export  = AccountGroupEditWindow;
