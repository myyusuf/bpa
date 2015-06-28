/**
 * Created by Yusuf on 5/20/2015.
 */

import Component = require("bpa/base/component/Component");
import TransactionJournalGridOptions = require("bpa/accounting/component/TransactionJournalGridOptions");
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

//import User = require("bpa/accounting/model/User");
import Journal = require("bpa/accounting/model/Journal");


import TransactionJournalEditWindow = require("bpa/accounting/component/TransactionJournalEditWindow");

class TransactionJournalGrid extends Component implements FormInput{

    name: string;
    journals: Array<Journal>;

    validatorRules: Array<ValidatorRule>;

    dataGrid: DataGrid;

    container: any;

    constructor(theOptions: TransactionJournalGridOptions) {
        super(theOptions);

        var _this = this;

        this.name = theOptions.name;
        this.journals = theOptions.journals;

        var _data = [{code: "GROUP1", name: "Group 1"}];

        var _dataSourceOptions: DataSourceOptions = {
            dataType: "json",
            dataFields: [
                { name: 'account'},
                { name: 'accountCode', type: 'string', map: "account>code"},
                { name: 'currency'},
                { name: 'currencyCode', type: 'string', map: "currency>code"},
                { name: 'amount', type: 'number' },
                { name: 'position' },
            ],
            id: 'journalId',
            localData: this.journals
        };

        var _dataSource = new DataSource(_dataSourceOptions);
        var _dataAdapter = new DataAdapter(_dataSource);

        var _columns: Array<GridColumn> = [
            { text: 'Account', datafield: 'accountCode', width: '25%' },
            { text: 'Amount', datafield: 'amount', width: '25%' },
            { text: 'Currency', datafield: 'currencyCode', width: '25%' },
            { text: 'Position', datafield: 'position', width: '25%' },
        ];

        var _addGroupButton: Button = new Button({
            label: "Add Journal",
            onClick: function(event){
                var _journal: Journal = Journal.newInstance();
                var _transactionJournalEditWindow = new TransactionJournalEditWindow(_journal, function(journal){
                    console.log("Journal : " + journal);
                    _this.journals.push(journal);
                    _this.dataGrid.refreshGrid();
                    _transactionJournalEditWindow.closeWindow();
                    //var _result = $.grep(_this.groups, function(e){ return e.code == group.code; });
                    //if(_result.length == 0){
                    //    _this.groups.push(group);
                    //    _this.dataGrid.refreshGrid();
                    //}

                });
                _transactionJournalEditWindow.renderTo(_this.container);
                _transactionJournalEditWindow.openWindow();
            }
        });

        var _removeGroupButton: Button = new Button({
            label: "Remove",
            onClick: function(event){
                //var _selectedGroup = _this.dataGrid.getSelectedData();
                //var _resultIndex = -1;
                //for(var _i=0;_i<_this.groups.length;_i++){
                //    if(_this.groups[_i].code == _selectedGroup.code){
                //        _resultIndex = _i;
                //    }
                //}
                //
                //_this.groups.splice(_resultIndex, 1);
                //_this.dataGrid.refreshGrid();
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
        return this.journals;
    }

    renderTo(theContainer: any){
        this.dataGrid.renderTo(theContainer);
        this.container = theContainer;
    }

}

export = TransactionJournalGrid;
