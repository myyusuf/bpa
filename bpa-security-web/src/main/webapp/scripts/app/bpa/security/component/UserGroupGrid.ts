/**
 * Created by Yusuf on 5/20/2015.
 */

import Component = require("bpa/base/component/Component");
import UserGroupGridOptions = require("bpa/security/component/UserGroupGridOptions");
import DataSourceOptions = require("bpa/base/data/DataSourceOptions");
import DataSource = require("bpa/base/data/DataSource");
import DataAdapter = require("bpa/base/data/DataAdapter");
import GridColumn = require("bpa/base/component/grid/GridColumn");
import DataGridOptions = require("bpa/base/component/grid/DataGridOptions");
import DataGrid = require("bpa/base/component/grid/DataGrid");
import FormInput = require("bpa/base/component/input/FormInput");
import ValidatorRule = require("bpa/base/component/input/ValidatorRule");

import Toolbar = require("bpa/base/component/Toolbar");
import Button = require("bpa/base/component/Button");

import User = require("bpa/security/model/User");
import Group = require("bpa/security/model/Group");


import GroupSelectWindow = require("bpa/security/component/GroupSelectWindow");

class UserGroupGrid extends Component implements FormInput{

    name: string;
    groups: Array<Group>;

    validatorRules: Array<ValidatorRule>;

    dataGrid: DataGrid;

    container: any;

    constructor(theOptions: UserGroupGridOptions) {
        super(theOptions);

        var _this = this;

        this.name = theOptions.name;
        this.groups = theOptions.groups;

        var _data = [{code: "GROUP1", name: "Group 1"}];

        var _dataSourceOptions: DataSourceOptions = {
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

        var _columns: Array<GridColumn> = [
            { text: 'Code', datafield: 'code', width: '50%' },
            { text: 'Name', datafield: 'name', width: '50%' },
        ];

        var _addGroupButton: Button = new Button({
            label: "Add Group",
            onClick: function(event){
                var _groupSelectWindow = new GroupSelectWindow(function(group){
                    console.log("Selected Group : " + group.name);

                    var _result = $.grep(_this.groups, function(e){ return e.code == group.code; });
                    if(_result.length == 0){
                        _this.groups.push(group);
                        _this.dataGrid.refreshGrid();
                    }

                });
                _groupSelectWindow.renderTo(_this.container);
                _groupSelectWindow.openWindow();
            }
        });

        var _removeGroupButton: Button = new Button({
            label: "Remove",
            onClick: function(event){
                var _selectedGroup = _this.dataGrid.getSelectedData();
                var _resultIndex = -1;
                for(var _i=0;_i<_this.groups.length;_i++){
                    if(_this.groups[_i].code == _selectedGroup.code){
                        _resultIndex = _i;
                    }
                }

                _this.groups.splice(_resultIndex, 1);
                _this.dataGrid.refreshGrid();
            }
        });

        var _toolbar: Toolbar = new Toolbar({items: [_addGroupButton, _removeGroupButton]});

        var _dataGridOptions: DataGridOptions = {
            pagable: false,
            virtualMode: false,
            showBorder: true,

            toolbar: _toolbar,

            dataAdapter: _dataAdapter,
            columns: _columns,
            widthInPercentage: 100,
            height: 200
        }

        this.dataGrid = new DataGrid(_dataGridOptions);
    }

    setValue(value: any){

    }

    getValue(): any{
        return this.groups;
    }

    renderTo(theContainer: any){
        this.dataGrid.renderTo(theContainer);
        this.container = theContainer;
    }

}

export = UserGroupGrid;
