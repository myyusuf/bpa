/**
 * Created by Yusuf on 5/20/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/Component", "bpa/base/data/DataSource", "bpa/base/data/DataAdapter", "bpa/base/component/grid/DataGrid", "bpa/security/SecurityConstant", "bpa/security/model/User"], function (require, exports, Component, DataSource, DataAdapter, DataGrid, SecurityConstant, User) {
    var UserList = (function (_super) {
        __extends(UserList, _super);
        function UserList(theOptions) {
            _super.call(this, theOptions);
            var _this = this;
            this.onAddUser = theOptions.onAddUser;
            this.onEditUser = theOptions.onEditUser;
            this.onDeleteUser = theOptions.onDeleteUser;
            //var _data = [{code: "USER1", name: "User 1"}];
            var _dataSourceOptions = {
                type: "GET",
                cache: false,
                dataType: "json",
                dataFields: [
                    { name: 'userId', type: 'string' },
                    { name: 'firstName', type: 'string' },
                    { name: 'lastName', type: 'string' },
                    { name: 'email', type: 'string' },
                    { name: 'password', type: 'string' }
                ],
                id: 'code',
                //url: "sample/bpa/security/users.json"
                //url: "http://localhost:18787/bpa-security-web-1.0/service/security/users"
                url: SecurityConstant.USERS_URL
            };
            var _dataSource = new DataSource(_dataSourceOptions);
            var _dataAdapter = new DataAdapter(_dataSource);
            var _columns = [
                { text: 'User Id', datafield: 'userId', width: '25%' },
                { text: 'First Name', datafield: 'firstName', width: '25%' },
                { text: 'Last Name', datafield: 'lastName', width: '25%' },
                { text: 'Email', datafield: 'email', width: '25%' }
            ];
            var _contextMenuItems = [
                {
                    "id": "1",
                    "text": "Add",
                    onClick: function (rowData) {
                        console.log("add rowData : " + rowData);
                        if (_this.onAddUser != undefined) {
                            var _newUser = User.newInstance();
                            _this.onAddUser(_newUser);
                        }
                    }
                },
                {
                    "id": "2",
                    "text": "Edit",
                    onClick: function (rowData) {
                        console.log("edit rowData : " + rowData);
                        if (_this.onEditUser != undefined) {
                            var _selectedUser = new User(rowData.userId, rowData.firstName, rowData.lastName, rowData.email, rowData.password);
                            _this.onEditUser(_selectedUser);
                        }
                    }
                },
                {
                    "id": "3",
                    "text": "Delete",
                    onClick: function (rowData) {
                        console.log("delete rowData : " + rowData);
                        if (_this.onDeleteUser != undefined) {
                            var _selectedUser = new User(rowData.userId, rowData.firstName);
                            _this.onDeleteUser(_selectedUser);
                        }
                    }
                }
            ];
            var _dataGridOptions = {
                dataAdapter: _dataAdapter,
                columns: _columns,
                contextMenuItems: _contextMenuItems,
                widthInPercentage: 100,
                heightInPercentage: 100
            };
            this.dataGrid = new DataGrid(_dataGridOptions);
        }
        UserList.prototype.renderTo = function (theContainer) {
            this.dataGrid.renderTo(theContainer);
        };
        return UserList;
    })(Component);
    return UserList;
});
