/**
 * Created by Yusuf on 6/19/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/Component", "bpa/base/data/DataSource", "bpa/base/data/DataAdapter", "bpa/base/component/grid/TreeGrid", "bpa/accounting/AccountingConstant", "bpa/accounting/model/Account", "bpa/base/component/AlertWindow"], function (require, exports, Component, DataSource, DataAdapter, TreeGrid, AccountingConstant, Account, AlertWindow) {
    var AccountList = (function (_super) {
        __extends(AccountList, _super);
        function AccountList(theOptions) {
            _super.call(this, theOptions);
            var _this = this;
            this.onAddAccount = theOptions.onAddAccount;
            this.onEditAccount = theOptions.onEditAccount;
            this.onDeleteAccount = theOptions.onDeleteAccount;
            var _dataSourceOptions = {
                type: "GET",
                cache: false,
                dataType: "json",
                dataFields: [
                    { name: 'code', type: 'string' },
                    { name: 'name', type: 'string' },
                    { name: 'description', type: 'string' },
                    { name: 'parentCode', type: 'string' },
                    { name: 'isGroup', type: 'boolean' },
                    { name: 'accountGroup' },
                    { name: 'defaultBalance' }
                ],
                hierarchy: {
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
            var _columns = [
                { text: 'Code', datafield: 'code', width: '33.3%', cellsRenderer: function (row, dataField, cellValue, rowData, cellText) {
                    if (rowData.isGroup) {
                        return '<span style="font-weight: bold;">' + cellValue + '</span>';
                    }
                    else {
                        return '<span>' + cellValue + '</span>';
                    }
                } },
                { text: 'Name', datafield: 'name', width: '33.3%' },
                { text: 'Description', datafield: 'description', width: '33.3%' }
            ];
            _this._alertWindow = new AlertWindow({ title: "Error when doing operation", message: "Unable to edit or delete Account Group from this page" });
            var _contextMenuItems = [
                {
                    "id": "1",
                    "text": "Add",
                    onClick: function (rowData) {
                        console.log("add rowData : " + rowData);
                        if (_this.onAddAccount != undefined) {
                            var _newAccount = null;
                            if (rowData.isGroup) {
                                var _tempAccountGroup = Account.newInstance();
                                _tempAccountGroup.code = rowData.code;
                                _newAccount = new Account(null, null, null, _tempAccountGroup, _tempAccountGroup, rowData.defaultBalance);
                            }
                            else {
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
                    onClick: function (rowData) {
                        console.log("edit rowData : " + rowData);
                        if (_this.onEditAccount != undefined) {
                            if (rowData.isGroup) {
                                _this._alertWindow.openWindow();
                                return;
                            }
                            var _selectedAccount = new Account(rowData.code, rowData.name, rowData.description, rowData.accountGroup, rowData.parent, rowData.defaultBalance);
                            _this.onEditAccount(_selectedAccount);
                        }
                    }
                },
                {
                    "id": "3",
                    "text": "Delete",
                    onClick: function (rowData) {
                        console.log("delete rowData : " + rowData);
                        if (_this.onDeleteAccount != undefined) {
                            if (rowData.isGroup) {
                                _this._alertWindow.openWindow();
                                return;
                            }
                            var _selectedAccount = Account.newInstance();
                            _selectedAccount.code = rowData.code;
                            _this.onDeleteAccount(_selectedAccount);
                        }
                    }
                }
            ];
            var _treeGridOptions = {
                dataAdapter: _dataAdapter,
                columns: _columns,
                contextMenuItems: _contextMenuItems,
                widthInPercentage: 100,
                heightInPercentage: 100
            };
            this.treeGrid = new TreeGrid(_treeGridOptions);
        }
        AccountList.prototype.renderTo = function (theContainer) {
            this.treeGrid.renderTo(theContainer);
            this._alertWindow.renderTo(theContainer);
        };
        AccountList.prototype.refreshGrid = function () {
            this.treeGrid.refreshGrid();
        };
        return AccountList;
    })(Component);
    return AccountList;
});
