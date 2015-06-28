/**
 * Created by Yusuf on 5/5/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "bpa/base/component/layout/Layout"], function (require, exports, $, Layout) {
    var TableLayout = (function (_super) {
        __extends(TableLayout, _super);
        function TableLayout(theOptions) {
            _super.call(this, theOptions);
            this.rows = theOptions.rows;
            this.classStyling = theOptions.classStyling;
        }
        TableLayout.prototype.renderTo = function (theContainer) {
            var _table = $("<table><\/table>");
            this.element = _table;
            this.element.appendTo(theContainer);
            var _width = '100%';
            if (this.widthInPercentage != undefined) {
                _width = this.widthInPercentage + '%';
            }
            if (this.width != undefined) {
                _width = this.width;
            }
            var _height = '100%';
            if (this.heightInPercentage != undefined) {
                _height = this.heightInPercentage + '%';
            }
            if (this.height != undefined) {
                _height = this.height;
            }
            _table.css("width", _width);
            _table.css("height", _height);
            if (this.classStyling != undefined && this.classStyling != null) {
                _table.addClass(this.classStyling);
            }
            this.rows.forEach(function (row) {
                var _tableRow = $("<tr><\/tr>");
                _tableRow.appendTo(_table);
                row.columns.forEach(function (column) {
                    var _rowColumn = $("<td><\/td>");
                    _rowColumn.appendTo(_tableRow);
                    var _columnWidth = "";
                    if (column.widthInPercentage != undefined) {
                        _columnWidth = column.widthInPercentage + '%';
                    }
                    if (column.width != undefined) {
                        _columnWidth = column.width + 'px';
                    }
                    var _columnHeight = "";
                    if (column.heightInPercentage != undefined) {
                        _columnHeight = column.heightInPercentage + '%';
                    }
                    if (column.height != undefined) {
                        _columnHeight = column.height + 'px';
                    }
                    if (_columnWidth != "") {
                        _rowColumn.css("width", _columnWidth);
                    }
                    if (_columnHeight != "") {
                        _rowColumn.css("height", _columnHeight);
                    }
                    if (column.colspan != undefined && column.colspan != null) {
                        _rowColumn.attr('colspan', column.colspan);
                    }
                    if (column.content != undefined && column.content != null) {
                        column.content.renderTo(_rowColumn);
                    }
                });
            });
        };
        return TableLayout;
    })(Layout);
    return TableLayout;
});
