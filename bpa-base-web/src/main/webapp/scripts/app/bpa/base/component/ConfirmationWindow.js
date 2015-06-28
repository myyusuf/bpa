/// <reference path="../../../ts/jquery.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/container/WindowPanel", "bpa/base/component/layout/TableLayout", "bpa/base/component/Button", "bpa/base/component/Label"], function (require, exports, WindowPanel, TableLayout, Button, Label) {
    var ConfirmationWindow = (function (_super) {
        __extends(ConfirmationWindow, _super);
        function ConfirmationWindow(theOptions) {
            _super.call(this, { width: 400, height: 150 });
            if (theOptions.title == undefined) {
                this.title = "Confirmation";
            }
            else {
                this.title = theOptions.title;
            }
            this.titleIconUrl = "images/icons/bpa/base/exclamation-circle.png";
            this.message = theOptions.message;
            this.onOkButtonClick = theOptions.onOkButtonClick;
            this.onCancelButtonClick = theOptions.onCancelButtonClick;
            this.content = theOptions.content;
        }
        ConfirmationWindow.prototype.buildContentContainer = function (theContent) {
            var _this = this;
            var _okButton = new Button({
                label: "OK",
                onClick: function (event) {
                    _this.closeWindow();
                    if (_this.onOkButtonClick != undefined) {
                        _this.onOkButtonClick();
                    }
                }
            });
            var _cancelButton = new Button({
                label: "Cancel",
                onClick: function (event) {
                    _this.closeWindow();
                    if (_this.onCancelButtonClick != undefined) {
                        _this.onCancelButtonClick();
                    }
                }
            });
            var _buttonContainer = new TableLayout({
                rows: [
                    {
                        columns: [
                            { widthInPercentage: 98 },
                            { content: _cancelButton, widthInPercentage: 1 },
                            { content: _okButton, widthInPercentage: 1 },
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
        ConfirmationWindow.prototype.buildContent = function () {
            return new Label({ label: this.message });
        };
        return ConfirmationWindow;
    })(WindowPanel);
    return ConfirmationWindow;
});
