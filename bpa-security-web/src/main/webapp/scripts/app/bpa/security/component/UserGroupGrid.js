/**
 * Created by Yusuf on 5/20/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/Component", "bpa/base/data/DataSource", "bpa/base/data/DataAdapter", "bpa/base/component/grid/DataGrid", "bpa/base/component/Toolbar", "bpa/base/component/Button", "bpa/security/component/GroupSelectWindow"], function (require, exports, Component, DataSource, DataAdapter, DataGrid, Toolbar, Button, GroupSelectWindow) {
    var UserGroupGrid = (function (_super) {
        __extends(UserGroupGrid, _super);
        function UserGroupGrid(theOptions) {
            _super.call(this, theOptions);
            var _this = this;
            this.name = theOptions.name;
            this.groups = theOptions.groups;
            var _data = [{ code: "GROUP1", name: "Group 1" }];
            var _dataSourceOptions = {
                dataType: "json",
                dataFields: [
                    { name: 'code', type: 'string' },
                    { name: 'name', type: 'string' },
                ],
                id: 'code',
                localData: this.groups
            };
            var _dataSource = new DataSource(_dataSourceOptions);
            var _dataAdapter = new DataAdapter(_dataSource);
            var _columns = [
                { text: 'Code', datafield: 'code', width: '50%' },
                { text: 'Name', datafield: 'name', width: '50%' },
            ];
            var _addGroupButton = new Button({
                label: "Add Group",
                onClick: function (event) {
                    var _groupSelectWindow = new GroupSelectWindow(function (group) {
                        console.log("Selected Group : " + group.name);
                        var _result = $.grep(_this.groups, function (e) {
                            return e.code == group.code;
                        });
                        if (_result.length == 0) {
                            _this.groups.push(group);
                            _this.dataGrid.refreshGrid();
                        }
                    });
                    _groupSelectWindow.renderTo(_this.container);
                    _groupSelectWindow.openWindow();
                }
            });
            var _removeGroupButton = new Button({
                label: "Remove",
                onClick: function (event) {
                    var _selectedGroup = _this.dataGrid.getSelectedData();
                    var _resultIndex = -1;
                    for (var _i = 0; _i < _this.groups.length; _i++) {
                        if (_this.groups[_i].code == _selectedGroup.code) {
                            _resultIndex = _i;
                        }
                    }
                    _this.groups.splice(_resultIndex, 1);
                    _this.dataGrid.refreshGrid();
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
        UserGroupGrid.prototype.setValue = function (value) {
        };
        UserGroupGrid.prototype.getValue = function () {
            return this.groups;
        };
        UserGroupGrid.prototype.renderTo = function (theContainer) {
            this.dataGrid.renderTo(theContainer);
            this.container = theContainer;
        };
        return UserGroupGrid;
    })(Component);
    return UserGroupGrid;
});
