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
    var AccountGroup = (function (_super) {
        __extends(AccountGroup, _super);
        function AccountGroup(theCode, theName, theDescription, theDefaultBalance) {
            _super.call(this);
            this.code = theCode;
            this.name = theName;
            this.description = theDescription;
            this.defaultBalance = theDefaultBalance;
        }
        AccountGroup.newInstance = function () {
            return new AccountGroup(null, null, null, null);
        };
        return AccountGroup;
    })(Model);
    return AccountGroup;
});
