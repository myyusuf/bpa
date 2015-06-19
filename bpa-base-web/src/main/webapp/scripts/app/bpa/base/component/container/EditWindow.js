/**
 * Created by Yusuf on 5/9/2015.
 */
/// <reference path="../../../../ts/jquery.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/container/WindowPanel", "bpa/base/component/layout/TableLayout", "bpa/base/component/Button", "bpa/base/component/container/SimplePanel"], function (require, exports, WindowPanel, TableLayout, Button, SimplePanel) {
    var EditWindow = (function (_super) {
        __extends(EditWindow, _super);
        function EditWindow(theOptions) {
            _super.call(this, theOptions);
            this.onSaveButtonClick = theOptions.onSaveButtonClick;
            this.onCancelButtonClick = theOptions.onCancelButtonClick;
            this.content = theOptions.content;
        }
        EditWindow.prototype.buildContentContainer = function (theContent) {
            var _editWindowContent = this.buildEditWindowContent();
            return this.buildEditWindowContentContainer(_editWindowContent);
        };
        EditWindow.prototype.buildEditWindowContentContainer = function (theEditWindowContent) {
            var _this = this;
            var _saveButton = new Button({
                label: "Save",
                onClick: function (event) {
                    if (theEditWindowContent.onSaveButtonClick != undefined) {
                        theEditWindowContent.onSaveButtonClick();
                    }
                }
            });
            var _cancelButton = new Button({
                label: "Cancel",
                onClick: function (event) {
                    if (theEditWindowContent.onCancelButtonClick != undefined) {
                        theEditWindowContent.onCancelButtonClick();
                    }
                }
            });
            var _buttonContainer = new TableLayout({
                rows: [
                    {
                        columns: [
                            { widthInPercentage: 98 },
                            { content: _cancelButton, widthInPercentage: 1 },
                            { content: _saveButton, widthInPercentage: 1 },
                        ]
                    }
                ]
            });
            var _tableLayout = new TableLayout({
                rows: [
                    {
                        columns: [
                            { content: theEditWindowContent.content, width: 100 },
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
        EditWindow.prototype.buildEditWindowContent = function () {
            return { content: new SimplePanel({}) };
        };
        return EditWindow;
    })(WindowPanel);
    return EditWindow;
});
