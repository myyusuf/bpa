/**
 * Created by Yusuf on 5/25/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/model/Model"], function (require, exports, Model) {
    var Transaction = (function (_super) {
        __extends(Transaction, _super);
        function Transaction(theTransactionId, theTransactionNumber, theDescription, theCreatedTime, theJournals) {
            _super.call(this);
            this.transactionId = theTransactionId;
            this.transactionNumber = theTransactionNumber;
            this.description = theDescription;
            this.createdTime = theCreatedTime;
            this.journals = theJournals;
        }
        Transaction.newInstance = function () {
            return new Transaction(null, null, null, null, []);
        };
        return Transaction;
    })(Model);
    return Transaction;
});
