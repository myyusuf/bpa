/**
 * Created by Yusuf on 5/20/2015.
 */

import Component = require("bpa/base/component/Component");
import TransactionListOptions = require("bpa/accounting/component/TransactionListOptions");
import DataSourceOptions = require("bpa/base/data/DataSourceOptions");
import DataSource = require("bpa/base/data/DataSource");
import DataAdapter = require("bpa/base/data/DataAdapter");
import GridColumn = require("bpa/base/component/grid/GridColumn");
import DataGridOptions = require("bpa/base/component/grid/DataGridOptions");
import DataGrid = require("bpa/base/component/grid/DataGrid");
import GridContextMenuItem = require("bpa/base/component/grid/GridContextMenuItem");
import OnAddModelListener = require("bpa/base/model/event/OnAddModelListener");
import OnEditModelListener = require("bpa/base/model/event/OnEditModelListener");
import OnDeleteModelListener = require("bpa/base/model/event/OnDeleteModelListener");
import AccountingConstant = require("bpa/accounting/AccountingConstant");

import Toolbar = require("bpa/base/component/Toolbar");
import Button = require("bpa/base/component/Button");
import ImageButton = require("bpa/base/component/ImageButton");
import TextBox = require("bpa/base/component/input/TextBox");

import Transaction = require("bpa/accounting/model/Transaction");

class TransactionList extends Component{

    onAddTransaction: OnAddModelListener;
    onEditTransaction: OnEditModelListener;
    onDeleteTransaction: OnDeleteModelListener;
    dataGrid: DataGrid;

    constructor(theOptions: TransactionListOptions) {
        super(theOptions);

        var _this = this;

        this.onAddTransaction = theOptions.onAddTransaction;
        this.onEditTransaction = theOptions.onEditTransaction;
        this.onDeleteTransaction = theOptions.onDeleteTransaction;

        var _dataSourceOptions: DataSourceOptions = {
            type: "GET",
            cache: false,
            dataType: "json",
            dataFields: [
                { name: 'transactionId', type: 'string' },
                { name: 'transactionNumber', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'createdTime'}
            ],
            id: 'code',
            url: AccountingConstant.TRANSACTIONS_URL
        };

        var _searchTextBox = new TextBox({name: "searchCodeOrName"});

        var _dataSource = new DataSource(_dataSourceOptions);
        var _dataAdapter = new DataAdapter(_dataSource, function(data){
            data.codeOrNameStartsWith = _searchTextBox.getValue();
            return data;
        });

        var _columns: Array<GridColumn> = [
            { text: 'Transaction Id', datafield: 'transactionId', width: '25%' },
            { text: 'Transaction Number', datafield: 'transactionNumber', width: '25%' },
            { text: 'Description', datafield: 'description', width: '25%' },
            { text: 'Created', datafield: 'createdTime', width: '25%' },
        ];

        var _contextMenuItems: Array<GridContextMenuItem> = [
            {
                "id": "1",
                "text": "Add",
                onClick: function(rowData){
                    console.log("add rowData : " +  rowData);
                    if(_this.onAddTransaction != undefined){
                        var _newTransaction: Transaction = Transaction.newInstance();
                        _this.onAddTransaction(_newTransaction);
                    }
                }
            },
            {
                "id": "2",
                "text": "Edit",
                onClick: function(rowData){

                    console.log("edit rowData : " +  rowData);
                    //if(_this.onEditTransaction != undefined){
                    //    var _selectedTransaction: Transaction = new Transaction(rowData.code, rowData.name, rowData.description);
                    //    _this.onEditTransaction(_selectedTransaction);
                    //}
                }
            },
            {
                "id": "3",
                "text": "Delete",
                onClick: function(rowData){
                    console.log("delete rowData : " +  rowData);
                    //if(_this.onDeleteTransaction != undefined){
                    //    var _selectedTransaction: Transaction = new Transaction(rowData.code, rowData.name, rowData.description);
                    //    _this.onDeleteTransaction(_selectedTransaction);
                    //}
                }
            }

        ];

        var _newTransactionButton: Button = new Button({
            label: "New Transaction",
            onClick: function(event){
               console.log("add transaction");
                if(_this.onAddTransaction != undefined){
                    var _newTransaction: Transaction = Transaction.newInstance();
                    _this.onAddTransaction(_newTransaction);
                }
            }
        });

        var _searchButton: ImageButton = new ImageButton({
            width: 15,
            height: 15,
            imageUrl: "images/icons/bpa/base/search.png",
            onClick: function(event){
                _this.dataGrid.refreshGrid();
            }
        });

        var _toolbar: Toolbar = new Toolbar({items: [_searchTextBox, _searchButton, _newTransactionButton]});

        var _dataGridOptions: DataGridOptions = {
            dataAdapter: _dataAdapter,
            columns: _columns,
            toolbar: _toolbar,
            contextMenuItems: _contextMenuItems,
            widthInPercentage: 100,
            heightInPercentage: 100
        }

        this.dataGrid = new DataGrid(_dataGridOptions);
    }

    renderTo(theContainer: any){
        this.dataGrid.renderTo(theContainer);
    }

    refreshGrid(){
        this.dataGrid.refreshGrid();
    }

}

export = TransactionList;
