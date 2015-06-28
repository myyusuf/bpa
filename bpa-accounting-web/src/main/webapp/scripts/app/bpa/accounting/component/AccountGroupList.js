/**
 * Created by Yusuf on 6/21/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/Component", "bpa/base/data/DataSource", "bpa/base/data/DataAdapter", "bpa/base/component/grid/DataGrid", "bpa/accounting/AccountingConstant", "bpa/base/component/Toolbar", "bpa/base/component/Button", "bpa/base/component/ImageButton", "bpa/base/component/input/TextBox", "bpa/accounting/model/AccountGroup"], function (require, exports, Component, DataSource, DataAdapter, DataGrid, AccountingConstant, Toolbar, Button, ImageButton, TextBox, AccountGroup) {
    var AccountGroupList = (function (_super) {
        __extends(AccountGroupList, _super);
        function AccountGroupList(theOptions) {
            _super.call(this, theOptions);
            var _this = this;
            this.onAddAccountGroup = theOptions.onAddAccountGroup;
            this.onEditAccountGroup = theOptions.onEditAccountGroup;
            this.onDeleteAccountGroup = theOptions.onDeleteAccountGroup;
            var _dataSourceOptions = {
                type: "GET",
                cache: false,
                dataType: "json",
                dataFields: [
                    { name: 'code', type: 'string' },
                    { name: 'name', type: 'string' },
                    { name: 'description', type: 'string' },
                    { name: 'defaultBalance' },
                    { name: 'defaultBalanceCode', type: 'string', map: "defaultBalance>code" },
                    { name: 'defaultBalanceName', type: 'string', map: "defaultBalance>name" }
                ],
                id: 'code',
                //url: "sample/bpa/security/groups.json"
                //url: "http://localhost:18787/bpa-security-web-1.0/service/security/groups"
                url: AccountingConstant.ACCOUNTGROUPS_URL
            };
            var _searchTextBox = new TextBox({ name: "searchCodeOrName" });
            var _dataSource = new DataSource(_dataSourceOptions);
            var _dataAdapter = new DataAdapter(_dataSource, function (data) {
                data.codeOrNameStartsWith = _searchTextBox.getValue();
                return data;
            });
            var _columns = [
                { text: 'Code', datafield: 'code', width: '25%' },
                { text: 'Name', datafield: 'name', width: '25%' },
                { text: 'Default Balance', datafield: 'defaultBalanceName', width: '25%' },
                { text: 'Description', datafield: 'description', width: '25%' },
            ];
            var _contextMenuItems = [
                {
                    "id": "1",
                    "text": "Add",
                    onClick: function (rowData) {
                        console.log("add rowData : " + rowData);
                        if (_this.onAddAccountGroup != undefined) {
                            var _newAccountGroup = AccountGroup.newInstance();
                            _this.onAddAccountGroup(_newAccountGroup);
                        }
                    }
                },
                {
                    "id": "2",
                    "text": "Edit",
                    onClick: function (rowData) {
                        console.log("edit rowData : " + rowData);
                        if (_this.onEditAccountGroup != undefined) {
                            var _selectedAccountGroup = new AccountGroup(rowData.code, rowData.name, rowData.description, rowData.defaultBalance);
                            _this.onEditAccountGroup(_selectedAccountGroup);
                        }
                    }
                },
                {
                    "id": "3",
                    "text": "Delete",
                    onClick: function (rowData) {
                        console.log("delete rowData : " + rowData);
                        if (_this.onDeleteAccountGroup != undefined) {
                            var _selectedAccountGroup = AccountGroup.newInstance();
                            _selectedAccountGroup.code = rowData.code;
                            _this.onDeleteAccountGroup(_selectedAccountGroup);
                        }
                    }
                }
            ];
            var _newAccountGroupButton = new Button({
                label: "New Account Group",
                onClick: function (event) {
                    console.log("add group");
                    if (_this.onAddAccountGroup != undefined) {
                        var _newAccountGroup = AccountGroup.newInstance();
                        _this.onAddAccountGroup(_newAccountGroup);
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
            var _toolbar = new Toolbar({ items: [_searchTextBox, _searchButton, _newAccountGroupButton] });
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
        AccountGroupList.prototype.renderTo = function (theContainer) {
            this.dataGrid.renderTo(theContainer);
        };
        AccountGroupList.prototype.refreshGrid = function () {
            this.dataGrid.refreshGrid();
        };
        return AccountGroupList;
    })(Component);
    return AccountGroupList;
});
