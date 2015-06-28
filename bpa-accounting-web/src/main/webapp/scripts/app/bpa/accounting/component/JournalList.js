/**
 * Created by Yusuf on 6/21/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/Component", "bpa/base/data/DataSource", "bpa/base/data/DataAdapter", "bpa/base/component/grid/DataGrid", "bpa/accounting/AccountingConstant", "bpa/base/component/Toolbar", "bpa/base/component/Button", "bpa/base/component/ImageButton", "bpa/base/component/input/TextBox", "bpa/accounting/model/Journal"], function (require, exports, Component, DataSource, DataAdapter, DataGrid, AccountingConstant, Toolbar, Button, ImageButton, TextBox, Journal) {
    var JournalList = (function (_super) {
        __extends(JournalList, _super);
        function JournalList(theOptions) {
            _super.call(this, theOptions);
            var _this = this;
            this.onAddJournal = theOptions.onAddJournal;
            this.onEditJournal = theOptions.onEditJournal;
            this.onDeleteJournal = theOptions.onDeleteJournal;
            var _dataSourceOptions = {
                type: "GET",
                cache: false,
                dataType: "json",
                dataFields: [
                    { name: 'journalId', type: 'string' },
                    { name: 'amount', type: 'number' },
                    { name: 'description', type: 'string' },
                ],
                id: 'code',
                url: AccountingConstant.JOURNALS_URL
            };
            var _searchTextBox = new TextBox({ name: "searchCodeOrName" });
            var _dataSource = new DataSource(_dataSourceOptions);
            var _dataAdapter = new DataAdapter(_dataSource, function (data) {
                data.codeOrNameStartsWith = _searchTextBox.getValue();
                return data;
            });
            var _columns = [
                { text: 'Journal Id', datafield: 'journalId', width: '33.3%' },
                { text: 'Amount', datafield: 'amount', width: '33.3%' },
                { text: 'Description', datafield: 'description', width: '33.3%' },
            ];
            var _contextMenuItems = [
                {
                    "id": "1",
                    "text": "Add",
                    onClick: function (rowData) {
                        console.log("add rowData : " + rowData);
                        if (_this.onAddJournal != undefined) {
                            var _newJournal = Journal.newInstance();
                            _this.onAddJournal(_newJournal);
                        }
                    }
                },
                {
                    "id": "2",
                    "text": "Edit",
                    onClick: function (rowData) {
                        console.log("edit rowData : " + rowData);
                        //if(_this.onEditJournal != undefined){
                        //    var _selectedJournal: Journal = new Journal(rowData.code, rowData.name, rowData.description);
                        //    _this.onEditJournal(_selectedJournal);
                        //}
                    }
                },
                {
                    "id": "3",
                    "text": "Delete",
                    onClick: function (rowData) {
                        console.log("delete rowData : " + rowData);
                        //if(_this.onDeleteJournal != undefined){
                        //    var _selectedJournal: Journal = new Journal(rowData.code, rowData.name, rowData.description);
                        //    _this.onDeleteJournal(_selectedJournal);
                        //}
                    }
                }
            ];
            var _newJournalButton = new Button({
                label: "New Journal",
                onClick: function (event) {
                    console.log("add journal");
                    if (_this.onAddJournal != undefined) {
                        var _newJournal = Journal.newInstance();
                        _this.onAddJournal(_newJournal);
                    }
                }
            });
            var _searchButton = new ImageButton({
                width: 15,
                height: 15,
                imageUrl: "images/icons/bpa/base/search.png",
                onClick: function (event) {
                    _this.dataGrid.refreshGrid();
                }
            });
            var _toolbar = new Toolbar({ items: [_searchTextBox, _searchButton, _newJournalButton] });
            var _dataGridOptions = {
                dataAdapter: _dataAdapter,
                columns: _columns,
                toolbar: _toolbar,
                contextMenuItems: _contextMenuItems,
                widthInPercentage: 100,
                heightInPercentage: 100
            };
            this.dataGrid = new DataGrid(_dataGridOptions);
        }
        JournalList.prototype.renderTo = function (theContainer) {
            this.dataGrid.renderTo(theContainer);
        };
        JournalList.prototype.refreshGrid = function () {
            this.dataGrid.refreshGrid();
        };
        return JournalList;
    })(Component);
    return JournalList;
});
