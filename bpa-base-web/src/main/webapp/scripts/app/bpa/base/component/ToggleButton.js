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
    var ToggleButton = (function (_super) {
        __extends(ToggleButton, _super);
        function ToggleButton(theOptions) {
            _super.call(this, theOptions);
            if (theOptions.activeLabel != undefined && theOptions.activeLabel != null) {
                this.activeLabel = theOptions.activeLabel;
            }
            else {
                this.activeLabel = ToggleButton.DEFAULT_LABEL;
            }
            if (theOptions.inactiveLabel != undefined && theOptions.inactiveLabel != null) {
                this.inactiveLabel = theOptions.inactiveLabel;
            }
            else {
                this.inactiveLabel = ToggleButton.DEFAULT_LABEL;
            }
            this.onClick = theOptions.onClick;
            jqxbuttons;
        }
        ToggleButton.prototype.renderTo = function (theContainer) {
            var _this = this;
            this.element = $("<input type=\"button\" value=\"" + this.activeLabel + "\" id=\"" + this.id + "\" />");
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
            this.element = this.element.jqxToggleButton({ width: _width, height: _height, theme: this.theme });
            this.element.on('click', function () {
                var _toggled = _this.element.jqxToggleButton('toggled');
                if (_toggled) {
                    _this.element[0].value = _this.activeLabel;
                    _this.onClick(true);
                }
                else {
                    _this.element[0].value = _this.inactiveLabel;
                    _this.onClick(false);
                }
            });
            _this.rendered = true;
        };
        ToggleButton.DEFAULT_LABEL = "[NO_LABEL]";
        return ToggleButton;
    })(Component);
    return ToggleButton;
});
