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
define(["require", "exports", "bpa/base/component/container/WindowPanel", "bpa/base/component/layout/TableLayout", "bpa/base/component/Button", "bpa/base/component/grid/DataGrid"], function (require, exports, WindowPanel, TableLayout, Button, DataGrid) {
    var SelectWindow = (function (_super) {
        __extends(SelectWindow, _super);
        function SelectWindow(theOptions) {
            _super.call(this, theOptions);
            this.dataAdapter = theOptions.dataAdapter;
            this.columns = theOptions.columns;
            this.dataGrid = theOptions.dataGrid;
            this.onSelectDataListener = theOptions.onSelectDataListener;
        }
        SelectWindow.prototype.buildContentContainer = function (theContent) {
            var _this = this;
            var _selectButton = new Button({
                label: "Select",
                onClick: function (event) {
                    _this.closeWindow();
                    if (_this.onSelectDataListener != undefined) {
                        _this.onSelectDataListener(_this.dataGrid.getSelectedData());
                    }
                }
            });
            var _cancelButton = new Button({
                label: "Cancel",
                onClick: function (event) {
                    _this.closeWindow();
                }
            });
            var _buttonContainer = new TableLayout({
                rows: [
                    {
                        columns: [
                            { widthInPercentage: 98 },
                            { content: _cancelButton, widthInPercentage: 1 },
                            { content: _selectButton, widthInPercentage: 1 },
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
        SelectWindow.prototype.buildContent = function () {
            var _dataGridOptions = {
                dataAdapter: this.dataAdapter,
                columns: this.columns,
                widthInPercentage: 100,
                heightInPercentage: 100
            };
            this.dataGrid = new DataGrid(_dataGridOptions);
            return this.dataGrid;
        };
        return SelectWindow;
    })(WindowPanel);
    return SelectWindow;
});
