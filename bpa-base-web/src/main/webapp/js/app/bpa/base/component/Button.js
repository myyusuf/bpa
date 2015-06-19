/**
 * Created by Yusuf on 5/5/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "jqxbuttons", "bpa/base/component/Component"], function (require, exports, $, jqxbuttons, Component) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(theOptions) {
            _super.call(this, theOptions);
            if (theOptions.label != undefined && theOptions.label != null) {
                this.label = theOptions.label;
            }
            else {
                this.label = Button.DEFAULT_LABEL;
            }
            this.onClick = theOptions.onClick;
            jqxbuttons;
        }
        Button.prototype.renderTo = function (theContainer) {
            this.element = $("<input type=\"button\" value=\"" + this.label + "\" id=\"" + this.id + "\" />");
            this.element.appendTo(theContainer);
            var _width = 'auto';
            if (this.widthInPercentage != undefined) {
                _width = this.widthInPercentage + '%';
            }
            if (this.width != undefined) {
                _width = this.width;
            }
            var _height = 'auto';
            if (this.heightInPercentage != undefined) {
                _height = this.heightInPercentage + '%';
            }
            if (this.height != undefined) {
                _height = this.height;
            }
            this.element = this.element.jqxButton({ width: _width, height: _height, theme: this.theme });
            this.element.click(this.onClick);
        };
        Button.DEFAULT_LABEL = "[NO_LABEL]";
        return Button;
    })(Component);
    return Button;
});
