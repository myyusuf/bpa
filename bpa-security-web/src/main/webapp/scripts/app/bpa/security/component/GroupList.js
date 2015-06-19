/**
 * Created by Yusuf on 5/20/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/Component", "bpa/base/data/DataSource", "bpa/base/data/DataAdapter", "bpa/base/component/grid/DataGrid", "bpa/security/SecurityConstant", "bpa/base/component/Toolbar", "bpa/base/component/Button", "bpa/base/component/ImageButton", "bpa/base/component/input/TextBox", "bpa/security/model/Group"], function (require, exports, Component, DataSource, DataAdapter, DataGrid, SecurityConstant, Toolbar, Button, ImageButton, TextBox, Group) {
    var GroupList = (function (_super) {
        __extends(GroupList, _super);
        function GroupList(theOptions) {
            _super.call(this, theOptions);
            var _this = this;
            this.onAddGroup = theOptions.onAddGroup;
            this.onEditGroup = theOptions.onEditGroup;
            this.onDeleteGroup = theOptions.onDeleteGroup;
            var _dataSourceOptions = {
                type: "GET",
                cache: false,
                dataType: "json",
                dataFields: [
                    { name: 'code', type: 'string' },
                    { name: 'name', type: 'string' },
                    { name: 'description', type: 'string' },
                ],
                id: 'code',
                //url: "sample/bpa/security/groups.json"
                //url: "http://localhost:18787/bpa-security-web-1.0/service/security/groups"
                url: SecurityConstant.GROUPS_URL
            };
            var _searchTextBox = new TextBox({ name: "searchCodeOrName" });
            var _dataSource = new DataSource(_dataSourceOptions);
            var _dataAdapter = new DataAdapter(_dataSource, function (data) {
                data.codeOrNameStartsWith = _searchTextBox.getValue();
                return data;
            });
            var _columns = [
                { text: 'Code', datafield: 'code', width: '33.3%' },
                { text: 'Name', datafield: 'name', width: '33.3%' },
                { text: 'Description', datafield: 'description', width: '33.3%' },
            ];
            var _contextMenuItems = [
                {
                    "id": "1",
                    "text": "Add",
                    onClick: function (rowData) {
                        console.log("add rowData : " + rowData);
                        if (_this.onAddGroup != undefined) {
                            var _newGroup = Group.newInstance();
                            _this.onAddGroup(_newGroup);
                        }
                    }
                },
                {
                    "id": "2",
                    "text": "Edit",
                    onClick: function (rowData) {
                        console.log("edit rowData : " + rowData);
                        if (_this.onEditGroup != undefined) {
                            var _selectedGroup = new Group(rowData.code, rowData.name, rowData.description);
                            _this.onEditGroup(_selectedGroup);
                        }
                    }
                },
                {
                    "id": "3",
                    "text": "Delete",
                    onClick: function (rowData) {
                        console.log("delete rowData : " + rowData);
                        if (_this.onDeleteGroup != undefined) {
                            var _selectedGroup = new Group(rowData.code, rowData.name, rowData.description);
                            _this.onDeleteGroup(_selectedGroup);
                        }
                    }
                }
            ];
            var _newGroupButton = new Button({
                label: "New Group",
                onClick: function (event) {
                    console.log("add group");
                    if (_this.onAddGroup != undefined) {
                        var _newGroup = Group.newInstance();
                        _this.onAddGroup(_newGroup);
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
            var _toolbar = new Toolbar({ items: [_searchTextBox, _searchButton, _newGroupButton] });
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
        GroupList.prototype.renderTo = function (theContainer) {
            this.dataGrid.renderTo(theContainer);
        };
        GroupList.prototype.refreshGrid = function () {
            this.dataGrid.refreshGrid();
        };
        return GroupList;
    })(Component);
    return GroupList;
});
