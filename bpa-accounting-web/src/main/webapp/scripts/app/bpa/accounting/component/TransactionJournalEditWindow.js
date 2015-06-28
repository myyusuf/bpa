/**
 * Created by Yusuf on 5/9/2015.
 */
/// <reference path="../../../ts/jquery.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/container/EditWindow", "bpa/accounting/component/JournalForm"], function (require, exports, EditWindow, JournalForm) {
    var TransactionJournalEditWindow = (function (_super) {
        __extends(TransactionJournalEditWindow, _super);
        function TransactionJournalEditWindow(theJournal, theOnSaveJournalListener) {
            _super.call(this, { width: 430, height: 320 });
            var _this = this;
            _this.journal = theJournal;
            if (_this.isEditMode()) {
                _this.title = "Edit Journal";
            }
            else {
                _this.title = "Add Journal";
            }
            _this.onSaveJournalListener = theOnSaveJournalListener;
        }
        TransactionJournalEditWindow.prototype.buildEditWindowContent = function () {
            var _this = this;
            var _journalForm = new JournalForm({ journal: this.journal, onValidationSuccess: function () {
                _this.onSaveJournalListener(_journalForm.getValue());
            } });
            if (_this.isEditMode()) {
                _journalForm.editMode();
            }
            else {
                _journalForm.newMode();
            }
            return { content: _journalForm, onSaveButtonClick: function () {
                _journalForm.validate();
            }, onCancelButtonClick: function () {
                _this.closeWindow();
            } };
        };
        TransactionJournalEditWindow.prototype.isEditMode = function () {
            if (this.journal != undefined && this.journal != null && this.journal.journalId != null && this.journal.journalId != "") {
                return true;
            }
            else {
                return false;
            }
        };
        return TransactionJournalEditWindow;
    })(EditWindow);
    return TransactionJournalEditWindow;
});
