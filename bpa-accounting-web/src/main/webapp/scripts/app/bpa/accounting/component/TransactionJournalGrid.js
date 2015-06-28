/**
 * Created by Yusuf on 5/20/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/Component", "bpa/base/data/DataSource", "bpa/base/data/DataAdapter", "bpa/base/component/grid/DataGrid", "bpa/base/component/Toolbar", "bpa/base/component/Button", "bpa/accounting/model/Journal", "bpa/accounting/component/TransactionJournalEditWindow"], function (require, exports, Component, DataSource, DataAdapter, DataGrid, Toolbar, Button, Journal, TransactionJournalEditWindow) {
    var TransactionJournalGrid = (function (_super) {
        __extends(TransactionJournalGrid, _super);
        function TransactionJournalGrid(theOptions) {
            _super.call(this, theOptions);
            var _this = this;
            this.name = theOptions.name;
            this.journals = theOptions.journals;
            var _data = [{ code: "GROUP1", name: "Group 1" }];
            var _dataSourceOptions = {
                dataType: "json",
                dataFields: [
                    { name: 'account' },
                    { name: 'accountCode', type: 'string', map: "account>code" },
                    { name: 'currency' },
                    { name: 'currencyCode', type: 'string', map: "currency>code" },
                    { name: 'amount', type: 'number' },
                    { name: 'position' },
                ],
                id: 'journalId',
                localData: this.journals
            };
            var _dataSource = new DataSource(_dataSourceOptions);
            var _dataAdapter = new DataAdapter(_dataSource);
            var _columns = [
                { text: 'Account', datafield: 'accountCode', width: '25%' },
                { text: 'Amount', datafield: 'amount', width: '25%' },
                { text: 'Currency', datafield: 'currencyCode', width: '25%' },
                { text: 'Position', datafield: 'position', width: '25%' },
            ];
            var _addGroupButton = new Button({
                label: "Add Journal",
                onClick: function (event) {
                    var _journal = Journal.newInstance();
                    var _transactionJournalEditWindow = new TransactionJournalEditWindow(_journal, function (journal) {
                        console.log("Journal : " + journal);
                        _this.journals.push(journal);
                        _this.dataGrid.refreshGrid();
                        _transactionJournalEditWindow.closeWindow();
                        //var _result = $.grep(_this.groups, function(e){ return e.code == group.code; });
                        //if(_result.length == 0){
                        //    _this.groups.push(group);
                        //    _this.dataGrid.refreshGrid();
                        //}
                    });
                    _transactionJournalEditWindow.renderTo(_this.container);
                    _transactionJournalEditWindow.openWindow();
                }
            });
            var _removeGroupButton = new Button({
                label: "Remove",
                onClick: function (event) {
                    //var _selectedGroup = _this.dataGrid.getSelectedData();
                    //var _resultIndex = -1;
                    //for(var _i=0;_i<_this.groups.length;_i++){
                    //    if(_this.groups[_i].code == _selectedGroup.code){
                    //        _resultIndex = _i;
                    //    }
                    //}
                    //
                    //_this.groups.splice(_resultIndex, 1);
                    //_this.dataGrid.refreshGrid();
                }
            });
            var _toolbar = new Toolbar({ items: [_addGroupButton, _removeGroupButton] });
            var _dataGridOptions = {
                pagable: false,
                virtualMode: false,
                showBorder: true,
                toolbar: _toolbar,
                dataAdapter: _dataAdapter,
                columns: _columns,
                widthInPercentage: 100,
                height: 200
            };
            this.dataGrid = new DataGrid(_dataGridOptions);
        }
        TransactionJournalGrid.prototype.setValue = function (value) {
        };
        TransactionJournalGrid.prototype.getValue = function () {
            return this.journals;
        };
        TransactionJournalGrid.prototype.renderTo = function (theContainer) {
            this.dataGrid.renderTo(theContainer);
            this.container = theContainer;
        };
        return TransactionJournalGrid;
    })(Component);
    return TransactionJournalGrid;
});
