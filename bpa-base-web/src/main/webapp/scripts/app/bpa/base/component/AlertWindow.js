/**
 * Created by Yusuf on 6/15/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/container/WindowPanel", "bpa/base/component/layout/TableLayout", "bpa/base/component/Button", "bpa/base/component/Label"], function (require, exports, WindowPanel, TableLayout, Button, Label) {
    var AlertWindow = (function (_super) {
        __extends(AlertWindow, _super);
        function AlertWindow(theOptions) {
            _super.call(this, { width: 400, height: 150 });
            if (theOptions.title == undefined) {
                this.title = "Alert";
            }
            else {
                this.title = theOptions.title;
            }
            this.titleIconUrl = "images/icons/bpa/base/error.png";
            this.message = theOptions.message;
        }
        AlertWindow.prototype.buildContentContainer = function (theContent) {
            var _this = this;
            var _closeButton = new Button({
                label: "Close",
                onClick: function (event) {
                    _this.closeWindow();
                    if (_this.onCloseButtonClick != undefined) {
                        _this.onCloseButtonClick();
                    }
                }
            });
            var _buttonContainer = new TableLayout({
                rows: [
                    {
                        columns: [
                            { widthInPercentage: 99 },
                            { content: _closeButton, widthInPercentage: 1 },
                        ]
                    }
                ]
            });
            var _tableLayout = new TableLayout({
                rows: [
                    {
                        columns: [
                            { content: theContent, width: 100 },
                        ]
                    },
                    {
                        columns: [
                            { content: _buttonContainer, width: 100 }
                        ]
                    }
                ]
            });
            return _tableLayout;
        };
        AlertWindow.prototype.buildContent = function () {
            return new Label({ label: this.message });
        };
        return AlertWindow;
    })(WindowPanel);
    return AlertWindow;
});
