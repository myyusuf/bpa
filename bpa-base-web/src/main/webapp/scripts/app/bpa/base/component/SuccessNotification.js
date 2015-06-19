/**
 * Created by Yusuf on 6/12/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/Notification"], function (require, exports, Notification) {
    var SuccessNotification = (function (_super) {
        __extends(SuccessNotification, _super);
        function SuccessNotification() {
            _super.call(this, { label: "Operation Completed Successfully" });
        }
        return SuccessNotification;
    })(Notification);
    return SuccessNotification;
});
