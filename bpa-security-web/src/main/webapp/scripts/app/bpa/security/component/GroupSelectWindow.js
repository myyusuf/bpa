/**
 * Created by Yusuf on 5/9/2015.
 */
/// <reference path="../../../ts/jquery.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/container/SelectWindow", "bpa/security/model/Group", "bpa/base/data/DataSource", "bpa/base/data/DataAdapter", "bpa/security/SecurityConstant"], function (require, exports, SelectWindow, Group, DataSource, DataAdapter, SecurityConstant) {
    var GroupSelectWindow = (function (_super) {
        __extends(GroupSelectWindow, _super);
        function GroupSelectWindow(theOnSelectGroupListener) {
            _super.call(this, { title: "Select Group", width: 426, height: 280 });
            var _this = this;
            _this.onSelectGroupListener = theOnSelectGroupListener;
            _this.onSelectDataListener = function (selectedData) {
                var _selectedGroup = Group.newInstance();
                _selectedGroup.code = selectedData.code;
                _selectedGroup.name = selectedData.name;
                _this.onSelectGroupListener(_selectedGroup);
            };
            var _dataSourceOptions = {
                type: "GET",
                cache: false,
                dataType: "json",
                dataFields: [
                    { name: 'code', type: 'string' },
                    { name: 'name', type: 'string' }
                ],
                id: 'code',
                url: SecurityConstant.GROUPS_URL
            };
            var _dataSource = new DataSource(_dataSourceOptions);
            var _dataAdapter = new DataAdapter(_dataSource);
            var _columns = [
                { text: 'Code', datafield: 'code', width: '50%' },
                { text: 'Name', datafield: 'name', width: '50%' }
            ];
            this.dataAdapter = _dataAdapter;
            this.columns = _columns;
        }
        return GroupSelectWindow;
    })(SelectWindow);
    return GroupSelectWindow;
});
