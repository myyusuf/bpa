/**
 * Created by Yusuf on 6/21/2015.
 */

import Component = require("bpa/base/component/Component");
import ComboBox = require("bpa/base/component/input/ComboBox");
import AccountingConstant = require("bpa/accounting/AccountingConstant");

import DataSourceOptions = require("bpa/base/data/DataSourceOptions");
import DataSource = require("bpa/base/data/DataSource");
import DataAdapter = require("bpa/base/data/DataAdapter");

import FormInput = require("bpa/base/component/input/FormInput");

import AccountComboBoxOptions = require("bpa/accounting/component/AccountComboBoxOptions");
import ValidatorRule = require("bpa/base/component/input/ValidatorRule");

import Account = require("bpa/accounting/model/Account");

class AccountComboBox extends ComboBox{

    dataSource: DataSource;

    constructor(theOptions: AccountComboBoxOptions){

        var _dataAdapter: DataAdapter;

        super({
            name: theOptions.name,
            dataAdapter: null,
            displayMember: "code",
            valueMember: "code",
            value: theOptions.value,
            widthInPercentage: theOptions.widthInPercentage,
            height: 20,
            autoComplete: true,
            promptText: "Select Account",
            objectToValueCoverter: function(theObject: any){
                if(theObject != undefined && theObject != null){
                    return theObject.code;
                }else{
                    return null;
                }
            },
            valueToObjectConverter: function(theComboBoxValue: string){
                var _value: string = theComboBoxValue;
                var _account: Account = Account.newInstance();
                _account.code = _value;
                return _account;
            },
            renderer: function (index, label, value) {
                var _item = _dataAdapter.get().records[index];
                if (_item != null) {
                    var _label = '';
                    if(_item.code != ''){
                        _label = _item.code + " (" + _item.name + ")";
                    }else{
                        _label = _item.name;
                    }
                    return _label;
                }

                return '';
            },

            renderSelectedItem: function(index, item){
                var _item = _this._searchItem(item.value);//_dataAdapter.get().records[index];
                if (_item != null) {

                    var _label = '';
                    if(_item.code != ''){
                        _label = _item.code + " (" + _item.name + ")";
                    }else{
                        _label = _item.name;
                    }
                    return _label;

                }

                return '';
            },
            isRequired: theOptions.isRequired
        });

        var _this = this;

        var _dataSourceOptions: DataSourceOptions = {
            type: "GET",
            cache: false,
            dataType: "json",
            dataFields: [
                { name: 'code', type: 'string' },
                { name: 'name', type: 'string' }
            ],
            id: 'code',
            url: AccountingConstant.ACCOUNTS_URL
        };

        var _dataSource = new DataSource(_dataSourceOptions);
        _dataAdapter = new DataAdapter(_dataSource);

        this.dataSource = _dataSource;
        this.dataAdapter = _dataAdapter;

    }

    _searchItem(code: string) : any{
        var _records = this.dataAdapter.get().records;
        for(var _i=0; _i<_records.length; _i++){
            var _record = _records[_i];
            if(_record.code == code){
                return _record;
            }
        }

        return null;
    }

}

export = AccountComboBox;
