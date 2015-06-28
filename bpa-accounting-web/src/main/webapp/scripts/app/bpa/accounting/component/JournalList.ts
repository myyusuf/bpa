/**
 * Created by Yusuf on 6/21/2015.
 */

import Component = require("bpa/base/component/Component");
import JournalListOptions = require("bpa/accounting/component/JournalListOptions");
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
import AccountingConstant = require("bpa/accounting/AccountingConstant");

import Toolbar = require("bpa/base/component/Toolbar");
import Button = require("bpa/base/component/Button");
import ImageButton = require("bpa/base/component/ImageButton");
import TextBox = require("bpa/base/component/input/TextBox");

import Journal = require("bpa/accounting/model/Journal");

class JournalList extends Component{

    onAddJournal: OnAddModelListener;
    onEditJournal: OnEditModelListener;
    onDeleteJournal: OnDeleteModelListener;
    dataGrid: DataGrid;

    constructor(theOptions: JournalListOptions) {
        super(theOptions);

        var _this = this;

        this.onAddJournal = theOptions.onAddJournal;
        this.onEditJournal = theOptions.onEditJournal;
        this.onDeleteJournal = theOptions.onDeleteJournal;

        var _dataSourceOptions: DataSourceOptions = {
            type: "GET",
            cache: false,
            dataType: "json",
            dataFields: [
                { name: 'journalId', type: 'string' },
                { name: 'amount', type: 'number' },
                { name: 'description', type: 'string' },
            ],
            id: 'code',
            url: AccountingConstant.JOURNALS_URL
        };

        var _searchTextBox = new TextBox({name: "searchCodeOrName"});

        var _dataSource = new DataSource(_dataSourceOptions);
        var _dataAdapter = new DataAdapter(_dataSource, function(data){
            data.codeOrNameStartsWith = _searchTextBox.getValue();
            return data;
        });

        var _columns: Array<GridColumn> = [
            { text: 'Journal Id', datafield: 'journalId', width: '33.3%' },
            { text: 'Amount', datafield: 'amount', width: '33.3%' },
            { text: 'Description', datafield: 'description', width: '33.3%' },
        ];

        var _contextMenuItems: Array<GridContextMenuItem> = [
            {
                "id": "1",
                "text": "Add",
                onClick: function(rowData){
                    console.log("add rowData : " +  rowData);
                    if(_this.onAddJournal != undefined){
                        var _newJournal: Journal = Journal.newInstance();
                        _this.onAddJournal(_newJournal);
                    }
                }
            },
            {
                "id": "2",
                "text": "Edit",
                onClick: function(rowData){

                    console.log("edit rowData : " +  rowData);
                    //if(_this.onEditJournal != undefined){
                    //    var _selectedJournal: Journal = new Journal(rowData.code, rowData.name, rowData.description);
                    //    _this.onEditJournal(_selectedJournal);
                    //}
                }
            },
            {
                "id": "3",
                "text": "Delete",
                onClick: function(rowData){
                    console.log("delete rowData : " +  rowData);
                    //if(_this.onDeleteJournal != undefined){
                    //    var _selectedJournal: Journal = new Journal(rowData.code, rowData.name, rowData.description);
                    //    _this.onDeleteJournal(_selectedJournal);
                    //}
                }
            }

        ];

        var _newJournalButton: Button = new Button({
            label: "New Journal",
            onClick: function(event){
                console.log("add journal");
                if(_this.onAddJournal != undefined){
                    var _newJournal: Journal = Journal.newInstance();
                    _this.onAddJournal(_newJournal);
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

        var _toolbar: Toolbar = new Toolbar({items: [_searchTextBox, _searchButton, _newJournalButton]});

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

export = JournalList;
