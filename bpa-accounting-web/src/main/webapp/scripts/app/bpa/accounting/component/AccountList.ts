/**
 * Created by Yusuf on 6/19/2015.
 */

import Component = require("bpa/base/component/Component");
import AccountListOptions = require("bpa/accounting/component/AccountListOptions");
import DataSourceOptions = require("bpa/base/data/DataSourceOptions");
import DataSource = require("bpa/base/data/DataSource");
import DataAdapter = require("bpa/base/data/DataAdapter");
import GridColumn = require("bpa/base/component/grid/GridColumn");
import TreeGridOptions = require("bpa/base/component/grid/TreeGridOptions");
import TreeGrid = require("bpa/base/component/grid/TreeGrid");
import GridContextMenuItem = require("bpa/base/component/grid/GridContextMenuItem");
import OnAddModelListener = require("bpa/base/model/event/OnAddModelListener");
import OnEditModelListener = require("bpa/base/model/event/OnEditModelListener");
import OnDeleteModelListener = require("bpa/base/model/event/OnDeleteModelListener");
import AccountingConstant = require("bpa/accounting/AccountingConstant");

import Account = require("bpa/accounting/model/Account");

import AlertWindow = require("bpa/base/component/AlertWindow");

class AccountList extends Component{

    onAddAccount: OnAddModelListener;
    onEditAccount: OnEditModelListener;
    onDeleteAccount: OnDeleteModelListener;
    treeGrid: TreeGrid;

    _alertWindow: AlertWindow;

    constructor(theOptions: AccountListOptions) {
        super(theOptions);

        var _this = this;

        this.onAddAccount = theOptions.onAddAccount;
        this.onEditAccount = theOptions.onEditAccount;
        this.onDeleteAccount = theOptions.onDeleteAccount;

        var _dataSourceOptions: DataSourceOptions = {
            type: "GET",
            cache: false,
            dataType: "json",
            dataFields: [
                { name: 'code', type: 'string' },
                { name: 'name', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'parentCode', type: 'string' },
                { name: 'isGroup', type: 'boolean'},
                { name: 'accountGroup'},
                { name: 'defaultBalance'}
            ],
            hierarchy:
            {
                keyDataField: { name: 'code' },
                parentDataField: { name: 'parentCode' }
            },
            id: 'code',
            //url: "sample/bpa/security/groups.json"
            //url: "http://localhost:18787/bpa-security-web-1.0/service/security/groups"
            url: AccountingConstant.ACCOUNTS_URL
        };

        var _dataSource = new DataSource(_dataSourceOptions);
        var _dataAdapter = new DataAdapter(_dataSource);

        var _columns: Array<GridColumn> =  [
            { text: 'Code', datafield: 'code', width: '33.3%',
                cellsRenderer: function (row, dataField, cellValue, rowData, cellText) {
                    if(rowData.isGroup){
                        return '<span style="font-weight: bold;">'+ cellValue +'</span>';
                    }else{
                        return '<span>'+ cellValue +'</span>';
                    }

                }
            },
            { text: 'Name', datafield: 'name', width: '33.3%' },
            { text: 'Description', datafield: 'description', width: '33.3%' }
        ];

        _this._alertWindow = new AlertWindow({title: "Error when doing operation", message: "Unable to edit or delete Account Group from this page"});

        var _contextMenuItems: Array<GridContextMenuItem> = [
            {
                "id": "1",
                "text": "Add",
                onClick: function(rowData){
                    console.log("add rowData : " +  rowData);
                    if(_this.onAddAccount != undefined){

                        var _newAccount: Account = null;

                        if(rowData.isGroup){
                            var _tempAccountGroup = Account.newInstance();
                            _tempAccountGroup.code = rowData.code;

                            _newAccount = new Account(null, null, null, _tempAccountGroup, _tempAccountGroup, rowData.defaultBalance);
                        }else{
                            var _tempParentAccount = Account.newInstance();
                            _tempParentAccount.code = rowData.code;

                            _newAccount = new Account(null, null, null, rowData.accountGroup, _tempParentAccount, rowData.defaultBalance);
                        }

                        _this.onAddAccount(_newAccount);

                    }
                }
            },
            {
                "id": "2",
                "text": "Edit",
                onClick: function(rowData){

                    console.log("edit rowData : " +  rowData);
                    if(_this.onEditAccount != undefined){

                        if(rowData.isGroup){
                            _this._alertWindow.openWindow();
                            return;
                        }

                        var _selectedAccount: Account = new Account(rowData.code, rowData.name, rowData.description, rowData.accountGroup, rowData.parent, rowData.defaultBalance);
                        _this.onEditAccount(_selectedAccount);
                    }
                }
            },
            {
                "id": "3",
                "text": "Delete",
                onClick: function(rowData){
                    console.log("delete rowData : " +  rowData);
                    if(_this.onDeleteAccount != undefined){

                        if(rowData.isGroup){
                            _this._alertWindow.openWindow();
                            return;
                        }

                        var _selectedAccount: Account = Account.newInstance();
                        _selectedAccount.code = rowData.code;
                        _this.onDeleteAccount(_selectedAccount);
                    }
                }
            }

        ];

        var _treeGridOptions: TreeGridOptions = {
            dataAdapter: _dataAdapter,
            columns: _columns,
            contextMenuItems: _contextMenuItems,
            widthInPercentage: 100,
            heightInPercentage: 100
        }

        this.treeGrid = new TreeGrid(_treeGridOptions);
    }

    renderTo(theContainer: any){

        this.treeGrid.renderTo(theContainer);
        this._alertWindow.renderTo(theContainer);
    }

    refreshGrid(){
        this.treeGrid.refreshGrid();
    }

}

export = AccountList;
