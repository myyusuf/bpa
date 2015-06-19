/**
 * Created by Yusuf on 5/20/2015.
 */

import Component = require("bpa/base/component/Component");
import UserListOptions = require("bpa/security/component/UserListOptions");
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

import User = require("bpa/security/model/User");

class UserList extends Component{

    onAddUser: OnAddModelListener;
    onEditUser: OnEditModelListener;
    onDeleteUser: OnDeleteModelListener;
    dataGrid: DataGrid;

    constructor(theOptions: UserListOptions) {
        super(theOptions);

        var _this = this;

        this.onAddUser = theOptions.onAddUser;
        this.onEditUser = theOptions.onEditUser;
        this.onDeleteUser = theOptions.onDeleteUser;

        //var _data = [{code: "USER1", name: "User 1"}];

        var _dataSourceOptions: DataSourceOptions = {
            type: "GET",
            cache: false,
            dataType: "json",
            dataFields: [
                { name: 'userId', type: 'string' },
                { name: 'firstName', type: 'string' },
                { name: 'lastName', type: 'string' },
                { name: 'email', type: 'string' },
                { name: 'password', type: 'string' },
                { name: 'groups' }
            ],
            id: 'code',
            //url: "sample/bpa/security/users.json"
            //url: "http://localhost:18787/bpa-security-web-1.0/service/security/users"
            url: SecurityConstant.USERS_URL
        };

        var _searchTextBox = new TextBox({name: "searchCodeOrName"});

        var _dataSource = new DataSource(_dataSourceOptions);
        var _dataAdapter = new DataAdapter(_dataSource, function(data){
            data.codeOrNameStartsWith = _searchTextBox.getValue();
            return data;
        });

        var _columns: Array<GridColumn> = [
            { text: 'User Id', datafield: 'userId', width: '25%' },
            { text: 'First Name', datafield: 'firstName', width: '25%' },
            { text: 'Last Name', datafield: 'lastName', width: '25%' },
            { text: 'Email', datafield: 'email', width: '25%' }
        ];

        var _contextMenuItems: Array<GridContextMenuItem> = [
            {
                "id": "1",
                "text": "Add",
                onClick: function(rowData){
                    console.log("add rowData : " +  rowData);
                    if(_this.onAddUser != undefined){
                        var _newUser: User = User.newInstance();
                        _this.onAddUser(_newUser);
                    }
                }
            },
            {
                "id": "2",
                "text": "Edit",
                onClick: function(rowData){

                    console.log("edit rowData : " +  rowData);
                    if(_this.onEditUser != undefined){
                        var _selectedUser: User = new User(rowData.userId, rowData.firstName, rowData.lastName, rowData.email, rowData.password, rowData.groups);
                        _this.onEditUser(_selectedUser);
                    }
                }
            },
            {
                "id": "3",
                "text": "Delete",
                onClick: function(rowData){
                    console.log("delete rowData : " +  rowData);
                    if(_this.onDeleteUser != undefined){
                        var _selectedUser: User = new User(rowData.userId, rowData.firstName);
                        _this.onDeleteUser(_selectedUser);
                    }
                }
            }

        ];

        var _newUserButton: Button = new Button({
            label: "New User",
            onClick: function(event){
                if(_this.onAddUser != undefined){
                    var _newUser: User = User.newInstance();
                    _this.onAddUser(_newUser);
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

        var _toolbar: Toolbar = new Toolbar({items: [_searchTextBox, _searchButton, _newUserButton]});

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

}

export = UserList;
