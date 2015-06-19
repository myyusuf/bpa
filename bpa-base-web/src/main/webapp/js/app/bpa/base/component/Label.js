/**
 * Created by Yusuf on 5/5/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "bpa/base/component/Component"], function (require, exports, $, Component) {
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label(theOptions) {
            _super.call(this, theOptions);
            this.label = theOptions.label;
        }
        Label.prototype.renderTo = function (theContainer) {
            this.element = $("<span>" + this.label + "<\/span>");
            this.element.appendTo(theContainer);
        };
        return Label;
    })(Component);
    return Label;
});
