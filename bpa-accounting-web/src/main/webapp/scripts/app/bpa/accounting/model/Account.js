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
    var Account = (function (_super) {
        __extends(Account, _super);
        function Account(theCode, theName, theDescription, theGroup, theParent, theDefaultBalance) {
            _super.call(this);
            this.code = theCode;
            this.name = theName;
            this.description = theDescription;
            this.group = theGroup;
            this.parent = theParent;
            this.defaultBalance = theDefaultBalance;
        }
        Account.newInstance = function () {
            return new Account(null, null, null, null, null, null);
        };
        return Account;
    })(Model);
    return Account;
});
