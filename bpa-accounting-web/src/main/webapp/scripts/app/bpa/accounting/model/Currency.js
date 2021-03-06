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
    var Currency = (function (_super) {
        __extends(Currency, _super);
        function Currency(theCode, theName, theDescription) {
            _super.call(this);
            this.code = theCode;
            this.name = theName;
            this.description = theDescription;
        }
        Currency.newInstance = function () {
            return new Currency(null, null, null);
        };
        return Currency;
    })(Model);
    return Currency;
});
