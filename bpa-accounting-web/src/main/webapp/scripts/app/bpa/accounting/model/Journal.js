/**
 * Created by Yusuf on 6/21/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/model/Model"], function (require, exports, Model) {
    var Journal = (function (_super) {
        __extends(Journal, _super);
        function Journal(theJournalId, theAccount, theAmount, theCurrency, theKurs, thePosition, theTransaction, theDescription, theCreatedTime) {
            _super.call(this);
            this.journalId = theJournalId;
            this.account = theAccount;
            this.amount = theAmount;
            this.currency = theCurrency;
            this.kurs = theKurs;
            this.position = thePosition;
            this.transaction = theTransaction;
            this.description = theDescription;
            this.createdTime = theCreatedTime;
        }
        Journal.newInstance = function () {
            return new Journal(null, null, null, null, null, null, null, null, null);
        };
        return Journal;
    })(Model);
    return Journal;
});
