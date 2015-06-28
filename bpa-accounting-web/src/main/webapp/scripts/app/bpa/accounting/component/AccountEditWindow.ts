/**
 * Created by Yusuf on 5/9/2015.
 */
/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import EditWindow = require("bpa/base/component/container/EditWindow");
import EditWindowOptions = require("bpa/base/component/container/EditWindowOptions");
import AccountForm = require("bpa/accounting/component/AccountForm");
import Button = require("bpa/base/component/Button");
import Account = require("bpa/accounting/model/Account");
import OnSaveAccountListener = require("bpa/accounting/component/event/OnSaveAccountListener");
import EditWindowContent = require("bpa/base/component/container/EditWindowContent");

class AccountEditWindow extends EditWindow{

    onSaveAccountListener: OnSaveAccountListener;
    account: Account;

    constructor(account: Account, theOnSaveAccountListener: OnSaveAccountListener) {

        super({width: 390, height: 348});

        var _this = this;

        _this.account = account;

        if(_this.isEditMode()){
            _this.title = "Edit Account";
        }else{
            _this.title = "Add Account";
        }

        _this.onSaveAccountListener = theOnSaveAccountListener;
        
    }

    buildEditWindowContent() : EditWindowContent{

        var _this = this;
        var _accountForm: AccountForm = new AccountForm({account: this.account, onValidationSuccess: function(){
            _this.onSaveAccountListener(_accountForm.getValue());
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
        if(this.account != undefined && this.account != null && this.account.code != null && this.account.code != ""){
            return true;
        }else{
            return false;
        }
    }

}

export  = AccountEditWindow;
