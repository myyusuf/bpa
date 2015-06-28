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
    var DefaultBalance = (function (_super) {
        __extends(DefaultBalance, _super);
        function DefaultBalance(theCode, theName) {
            _super.call(this);
            this.code = theCode;
            this.name = theName;
        }
        DefaultBalance.newInstance = function () {
            return new DefaultBalance(null, null);
        };
        return DefaultBalance;
    })(Model);
    return DefaultBalance;
});
