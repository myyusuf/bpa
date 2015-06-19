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
    var ErrorNotification = (function (_super) {
        __extends(ErrorNotification, _super);
        function ErrorNotification() {
            _super.call(this, { label: "Error while doing operation", template: "error", width: 280 });
        }
        return ErrorNotification;
    })(Notification);
    return ErrorNotification;
});
