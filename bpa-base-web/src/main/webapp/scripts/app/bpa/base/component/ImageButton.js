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
    var ImageButton = (function (_super) {
        __extends(ImageButton, _super);
        function ImageButton(theOptions) {
            _super.call(this, theOptions);
            if (theOptions.label != undefined && theOptions.label != null) {
                this.label = theOptions.label;
            }
            else {
                this.label = ImageButton.DEFAULT_LABEL;
            }
            this.imageUrl = theOptions.imageUrl;
            this.onClick = theOptions.onClick;
            jqxbuttons;
        }
        ImageButton.prototype.renderTo = function (theContainer) {
            this.element = $('<div id="' + this.id + '">' + '<img style="float: left; " src="' + this.imageUrl + '" />' + '<div style="float: left; ">' + this.label + '</div>' + '</div>');
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
        ImageButton.DEFAULT_LABEL = "";
        return ImageButton;
    })(Component);
    return ImageButton;
});
