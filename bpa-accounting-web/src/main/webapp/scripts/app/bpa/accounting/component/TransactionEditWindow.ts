/**
 * Created by Yusuf on 5/9/2015.
 */
/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import EditWindow = require("bpa/base/component/container/EditWindow");
import EditWindowOptions = require("bpa/base/component/container/EditWindowOptions");
import TransactionForm = require("bpa/accounting/component/TransactionForm");
import Button = require("bpa/base/component/Button");
import Transaction = require("bpa/accounting/model/Transaction");
import OnSaveTransactionListener = require("bpa/accounting/component/event/OnSaveTransactionListener");
import EditWindowContent = require("bpa/base/component/container/EditWindowContent");

class TransactionEditWindow extends EditWindow{

    onSaveTransactionListener: OnSaveTransactionListener;
    transaction: Transaction;

    constructor(transaction: Transaction, theOnSaveTransactionListener: OnSaveTransactionListener) {

        super({width: 530, height: 400});

        var _this = this;

        _this.transaction = transaction;

        if(_this.isEditMode()){
            _this.title = "Edit Transaction";
        }else{
            _this.title = "Add Transaction";
        }

        _this.onSaveTransactionListener = theOnSaveTransactionListener;
        
    }

    buildEditWindowContent() : EditWindowContent{

        var _this = this;
        var _transactionForm: TransactionForm = new TransactionForm({transaction: this.transaction, onValidationSuccess: function(){
            _this.onSaveTransactionListener(_transactionForm.getValue());
        }});

        if(_this.isEditMode()){
            _transactionForm.editMode();
        }else{
            _transactionForm.newMode();
        }

        return {content : _transactionForm,
            onSaveButtonClick : function(){
                _transactionForm.validate();
            },
            onCancelButtonClick: function(){
                _this.closeWindow();
            }
        };
    }

    isEditMode(){
        if(this.transaction != undefined && this.transaction != null && this.transaction.code != null && this.transaction.code != ""){
            return true;
        }else{
            return false;
        }
    }

}

export  = TransactionEditWindow;
