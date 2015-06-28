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
define(["require", "exports", "bpa/base/component/container/EditWindow", "bpa/accounting/component/TransactionForm"], function (require, exports, EditWindow, TransactionForm) {
    var TransactionEditWindow = (function (_super) {
        __extends(TransactionEditWindow, _super);
        function TransactionEditWindow(transaction, theOnSaveTransactionListener) {
            _super.call(this, { width: 530, height: 400 });
            var _this = this;
            _this.transaction = transaction;
            if (_this.isEditMode()) {
                _this.title = "Edit Transaction";
            }
            else {
                _this.title = "Add Transaction";
            }
            _this.onSaveTransactionListener = theOnSaveTransactionListener;
        }
        TransactionEditWindow.prototype.buildEditWindowContent = function () {
            var _this = this;
            var _transactionForm = new TransactionForm({ transaction: this.transaction, onValidationSuccess: function () {
                _this.onSaveTransactionListener(_transactionForm.getValue());
            } });
            if (_this.isEditMode()) {
                _transactionForm.editMode();
            }
            else {
                _transactionForm.newMode();
            }
            return { content: _transactionForm, onSaveButtonClick: function () {
                _transactionForm.validate();
            }, onCancelButtonClick: function () {
                _this.closeWindow();
            } };
        };
        TransactionEditWindow.prototype.isEditMode = function () {
            if (this.transaction != undefined && this.transaction != null && this.transaction.code != null && this.transaction.code != "") {
                return true;
            }
            else {
                return false;
            }
        };
        return TransactionEditWindow;
    })(EditWindow);
    return TransactionEditWindow;
});
