/**
 * Created by Yusuf on 5/9/2015.
 */
/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import SelectWindow = require("bpa/base/component/container/SelectWindow");
import SelectWindowOptions = require("bpa/base/component/container/SelectWindowOptions");
import UserForm = require("bpa/security/component/UserForm");
import Button = require("bpa/base/component/Button");
import Group = require("bpa/security/model/Group");
import OnSelectGroupListener = require("bpa/security/component/event/OnSelectGroupListener");
import SelectWindowContent = require("bpa/base/component/container/SelectWindowContent");

import DataSourceOptions = require("bpa/base/data/DataSourceOptions");
import DataSource = require("bpa/base/data/DataSource");
import DataAdapter = require("bpa/base/data/DataAdapter");
import GridColumn = require("bpa/base/component/grid/GridColumn");
import DataGridOptions = require("bpa/base/component/grid/DataGridOptions");
import DataGrid = require("bpa/base/component/grid/DataGrid");

import SecurityConstant = require("bpa/security/SecurityConstant");

class GroupSelectWindow extends SelectWindow{

    onSelectGroupListener: any;
    group: Group;

    constructor(theOnSelectGroupListener: OnSelectGroupListener) {

        super({title: "Select Group", width: 426, height: 280});

        var _this = this;

        _this.onSelectGroupListener = theOnSelectGroupListener;

        _this.onSelectDataListener =  function(group: Group){
            _this.onSelectGroupListener(group);
        }

        var _dataSourceOptions: DataSourceOptions = {
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

        var _columns: Array<GridColumn> = [
            { text: 'Code', datafield: 'code', width: '50%' },
            { text: 'Name', datafield: 'name', width: '50%' }
        ];

        this.dataAdapter = _dataAdapter;
        this.columns = _columns;
    }


}

export  = GroupSelectWindow;
