/**
 * Created by Yusuf on 5/20/2015.
 */

import Component = require("bpa/base/component/Component");
import GroupListOptions = require("bpa/security/component/GroupListOptions");
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
import SecurityConstant = require("bpa/security/SecurityConstant");

import Toolbar = require("bpa/base/component/Toolbar");
import Button = require("bpa/base/component/Button");
import ImageButton = require("bpa/base/component/ImageButton");
import TextBox = require("bpa/base/component/input/TextBox");

import Group = require("bpa/security/model/Group");

class GroupList extends Component{

    onAddGroup: OnAddModelListener;
    onEditGroup: OnEditModelListener;
    onDeleteGroup: OnDeleteModelListener;
    dataGrid: DataGrid;

    constructor(theOptions: GroupListOptions) {
        super(theOptions);

        var _this = this;

        this.onAddGroup = theOptions.onAddGroup;
        this.onEditGroup = theOptions.onEditGroup;
        this.onDeleteGroup = theOptions.onDeleteGroup;

        var _dataSourceOptions: DataSourceOptions = {
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

        var _searchTextBox = new TextBox({name: "searchCodeOrName"});

        var _dataSource = new DataSource(_dataSourceOptions);
        var _dataAdapter = new DataAdapter(_dataSource, function(data){
            data.codeOrNameStartsWith = _searchTextBox.getValue();
            return data;
        });

        var _columns: Array<GridColumn> = [
            { text: 'Code', datafield: 'code', width: '33.3%' },
            { text: 'Name', datafield: 'name', width: '33.3%' },
            { text: 'Description', datafield: 'description', width: '33.3%' },
        ];

        var _contextMenuItems: Array<GridContextMenuItem> = [
            {
                "id": "1",
                "text": "Add",
                onClick: function(rowData){
                    console.log("add rowData : " +  rowData);
                    if(_this.onAddGroup != undefined){
                        var _newGroup: Group = Group.newInstance();
                        _this.onAddGroup(_newGroup);
                    }
                }
            },
            {
                "id": "2",
                "text": "Edit",
                onClick: function(rowData){

                    console.log("edit rowData : " +  rowData);
                    if(_this.onEditGroup != undefined){
                        var _selectedGroup: Group = new Group(rowData.code, rowData.name, rowData.description);
                        _this.onEditGroup(_selectedGroup);
                    }
                }
            },
            {
                "id": "3",
                "text": "Delete",
                onClick: function(rowData){
                    console.log("delete rowData : " +  rowData);
                    if(_this.onDeleteGroup != undefined){
                        var _selectedGroup: Group = new Group(rowData.code, rowData.name, rowData.description);
                        _this.onDeleteGroup(_selectedGroup);
                    }
                }
            }

        ];

        var _newGroupButton: Button = new Button({
            label: "New Group",
            onClick: function(event){
               console.log("add group");
                if(_this.onAddGroup != undefined){
                    var _newGroup: Group = Group.newInstance();
                    _this.onAddGroup(_newGroup);
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

        var _toolbar: Toolbar = new Toolbar({items: [_searchTextBox, _searchButton, _newGroupButton]});

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

export = GroupList;
