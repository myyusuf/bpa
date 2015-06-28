/**
 * Created by Yusuf on 5/9/2015.
 */
/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import EditWindow = require("bpa/base/component/container/EditWindow");
import EditWindowOptions = require("bpa/base/component/container/EditWindowOptions");
import JournalForm = require("bpa/accounting/component/JournalForm");
import Button = require("bpa/base/component/Button");
import Journal = require("bpa/accounting/model/Journal");
import OnSaveJournalListener = require("bpa/accounting/component/event/OnSaveJournalListener");
import EditWindowContent = require("bpa/base/component/container/EditWindowContent");

class TransactionJournalEditWindow extends EditWindow{

    onSaveJournalListener: OnSaveJournalListener;
    journal: Journal;

    constructor(theJournal: Journal, theOnSaveJournalListener: OnSaveJournalListener) {

        super({width: 430, height: 320});

        var _this = this;

        _this.journal = theJournal;

        if(_this.isEditMode()){
            _this.title = "Edit Journal";
        }else{
            _this.title = "Add Journal";
        }

        _this.onSaveJournalListener = theOnSaveJournalListener;
        
    }

    buildEditWindowContent() : EditWindowContent{

        var _this = this;
        var _journalForm: JournalForm = new JournalForm({journal: this.journal, onValidationSuccess: function(){
            _this.onSaveJournalListener(_journalForm.getValue());
        }});

        if(_this.isEditMode()){
            _journalForm.editMode();
        }else{
            _journalForm.newMode();
        }

        return {content : _journalForm,
            onSaveButtonClick : function(){
                _journalForm.validate();
            },
            onCancelButtonClick: function(){
                _this.closeWindow();
            }
        };
    }

    isEditMode(){
        if(this.journal != undefined && this.journal != null && this.journal.journalId != null && this.journal.journalId != ""){
            return true;
        }else{
            return false;
        }
    }

}

export  = TransactionJournalEditWindow;
