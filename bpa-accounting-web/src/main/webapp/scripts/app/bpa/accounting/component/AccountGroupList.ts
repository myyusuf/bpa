/**
 * Created by Yusuf on 6/21/2015.
 */

import Component = require("bpa/base/component/Component");
import AccountGroupListOptions = require("bpa/accounting/component/AccountGroupListOptions");
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

import AccountGroup = require("bpa/accounting/model/AccountGroup");

class AccountGroupList extends Component{

    onAddAccountGroup: OnAddModelListener;
    onEditAccountGroup: OnEditModelListener;
    onDeleteAccountGroup: OnDeleteModelListener;
    dataGrid: DataGrid;

    constructor(theOptions: AccountGroupListOptions) {
        super(theOptions);

        var _this = this;

        this.onAddAccountGroup = theOptions.onAddAccountGroup;
        this.onEditAccountGroup = theOptions.onEditAccountGroup;
        this.onDeleteAccountGroup = theOptions.onDeleteAccountGroup;

        var _dataSourceOptions: DataSourceOptions = {
            type: "GET",
            cache: false,
            dataType: "json",
            dataFields: [
                { name: 'code', type: 'string' },
                { name: 'name', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'defaultBalance'},
                { name: 'defaultBalanceCode', type: 'string', map: "defaultBalance>code" },
                { name: 'defaultBalanceName', type: 'string', map: "defaultBalance>name" }
            ],
            id: 'code',
            //url: "sample/bpa/security/groups.json"
            //url: "http://localhost:18787/bpa-security-web-1.0/service/security/groups"
            url: AccountingConstant.ACCOUNTGROUPS_URL
        };

        var _searchTextBox = new TextBox({name: "searchCodeOrName"});

        var _dataSource = new DataSource(_dataSourceOptions);
        var _dataAdapter = new DataAdapter(_dataSource, function(data){
            data.codeOrNameStartsWith = _searchTextBox.getValue();
            return data;
        });

        var _columns: Array<GridColumn> = [
            { text: 'Code', datafield: 'code', width: '25%' },
            { text: 'Name', datafield: 'name', width: '25%' },
            { text: 'Default Balance', datafield: 'defaultBalanceName', width: '25%' },
            { text: 'Description', datafield: 'description', width: '25%' },
        ];

        var _contextMenuItems: Array<GridContextMenuItem> = [
            {
                "id": "1",
                "text": "Add",
                onClick: function(rowData){
                    console.log("add rowData : " +  rowData);
                    if(_this.onAddAccountGroup != undefined){
                        var _newAccountGroup: AccountGroup = AccountGroup.newInstance();
                        _this.onAddAccountGroup(_newAccountGroup);
                    }
                }
            },
            {
                "id": "2",
                "text": "Edit",
                onClick: function(rowData){

                    console.log("edit rowData : " +  rowData);
                    if(_this.onEditAccountGroup != undefined){
                        var _selectedAccountGroup: AccountGroup = new AccountGroup(rowData.code, rowData.name, rowData.description, rowData.defaultBalance);
                        _this.onEditAccountGroup(_selectedAccountGroup);
                    }
                }
            },
            {
                "id": "3",
                "text": "Delete",
                onClick: function(rowData){
                    console.log("delete rowData : " +  rowData);
                    if(_this.onDeleteAccountGroup != undefined){
                        var _selectedAccountGroup: AccountGroup = AccountGroup.newInstance();
                        _selectedAccountGroup.code = rowData.code;
                        _this.onDeleteAccountGroup(_selectedAccountGroup);
                    }
                }
            }

        ];

        var _newAccountGroupButton: Button = new Button({
            label: "New Account Group",
            onClick: function(event){
                console.log("add group");
                if(_this.onAddAccountGroup != undefined){
                    var _newAccountGroup: AccountGroup = AccountGroup.newInstance();
                    _this.onAddAccountGroup(_newAccountGroup);
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

        var _toolbar: Toolbar = new Toolbar({items: [_searchTextBox, _searchButton, _newAccountGroupButton]});

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

export = AccountGroupList;

