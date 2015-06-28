/**
 * Created by Yusuf on 5/20/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/Component", "bpa/base/data/DataSource", "bpa/base/data/DataAdapter", "bpa/base/component/grid/DataGrid", "bpa/accounting/AccountingConstant", "bpa/base/component/Toolbar", "bpa/base/component/Button", "bpa/base/component/ImageButton", "bpa/base/component/input/TextBox", "bpa/accounting/model/Transaction"], function (require, exports, Component, DataSource, DataAdapter, DataGrid, AccountingConstant, Toolbar, Button, ImageButton, TextBox, Transaction) {
    var TransactionList = (function (_super) {
        __extends(TransactionList, _super);
        function TransactionList(theOptions) {
            _super.call(this, theOptions);
            var _this = this;
            this.onAddTransaction = theOptions.onAddTransaction;
            this.onEditTransaction = theOptions.onEditTransaction;
            this.onDeleteTransaction = theOptions.onDeleteTransaction;
            var _dataSourceOptions = {
                type: "GET",
                cache: false,
                dataType: "json",
                dataFields: [
                    { name: 'transactionId', type: 'string' },
                    { name: 'transactionNumber', type: 'string' },
                    { name: 'description', type: 'string' },
                    { name: 'createdTime' }
                ],
                id: 'code',
                url: AccountingConstant.TRANSACTIONS_URL
            };
            var _searchTextBox = new TextBox({ name: "searchCodeOrName" });
            var _dataSource = new DataSource(_dataSourceOptions);
            var _dataAdapter = new DataAdapter(_dataSource, function (data) {
                data.codeOrNameStartsWith = _searchTextBox.getValue();
                return data;
            });
            var _columns = [
                { text: 'Transaction Id', datafield: 'transactionId', width: '25%' },
                { text: 'Transaction Number', datafield: 'transactionNumber', width: '25%' },
                { text: 'Description', datafield: 'description', width: '25%' },
                { text: 'Created', datafield: 'createdTime', width: '25%' },
            ];
            var _contextMenuItems = [
                {
                    "id": "1",
                    "text": "Add",
                    onClick: function (rowData) {
                        console.log("add rowData : " + rowData);
                        if (_this.onAddTransaction != undefined) {
                            var _newTransaction = Transaction.newInstance();
                            _this.onAddTransaction(_newTransaction);
                        }
                    }
                },
                {
                    "id": "2",
                    "text": "Edit",
                    onClick: function (rowData) {
                        console.log("edit rowData : " + rowData);
                        //if(_this.onEditTransaction != undefined){
                        //    var _selectedTransaction: Transaction = new Transaction(rowData.code, rowData.name, rowData.description);
                        //    _this.onEditTransaction(_selectedTransaction);
                        //}
                    }
                },
                {
                    "id": "3",
                    "text": "Delete",
                    onClick: function (rowData) {
                        console.log("delete rowData : " + rowData);
                        //if(_this.onDeleteTransaction != undefined){
                        //    var _selectedTransaction: Transaction = new Transaction(rowData.code, rowData.name, rowData.description);
                        //    _this.onDeleteTransaction(_selectedTransaction);
                        //}
                    }
                }
            ];
            var _newTransactionButton = new Button({
                label: "New Transaction",
                onClick: function (event) {
                    console.log("add transaction");
                    if (_this.onAddTransaction != undefined) {
                        var _newTransaction = Transaction.newInstance();
                        _this.onAddTransaction(_newTransaction);
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
            var _toolbar = new Toolbar({ items: [_searchTextBox, _searchButton, _newTransactionButton] });
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
        TransactionList.prototype.renderTo = function (theContainer) {
            this.dataGrid.renderTo(theContainer);
        };
        TransactionList.prototype.refreshGrid = function () {
            this.dataGrid.refreshGrid();
        };
        return TransactionList;
    })(Component);
    return TransactionList;
});
