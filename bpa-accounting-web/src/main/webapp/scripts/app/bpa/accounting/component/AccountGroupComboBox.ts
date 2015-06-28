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

import AccountGroupComboBoxOptions = require("bpa/accounting/component/AccountGroupComboBoxOptions");
import ValidatorRule = require("bpa/base/component/input/ValidatorRule");

import AccountGroup = require("bpa/accounting/model/AccountGroup");

class AccountGroupComboBox extends ComboBox{

    constructor(theOptions: AccountGroupComboBoxOptions){

        //AccountGroupComboBoxOptions is used instead of ComboBoxOptions to override the need to supply dataAdapter
        var _dataAdapter: DataAdapter;

        super({
            name: theOptions.name,
            dataAdapter: null,
            displayMember: "name",
            valueMember: "code",
            value: theOptions.value,
            widthInPercentage: theOptions.widthInPercentage,
            height: 20,
            promptText: "Select Account Group",
            objectToValueCoverter: function(theObject: any){
                if(theObject != undefined && theObject != null){
                    return theObject.code;
                }else{
                    return null;
                }
            },
            valueToObjectConverter: function(theComboBoxValue: string){
                var _value: string = theComboBoxValue;
                var _accountGroup: AccountGroup = AccountGroup.newInstance();
                _accountGroup.code = _value;
                return _accountGroup;
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
            isRequired: theOptions.isRequired,
            onChange: theOptions.onChange
        });

        var _dataSourceOptions: DataSourceOptions = {
            type: "GET",
            cache: false,
            dataType: "json",
            dataFields: [
                { name: 'code', type: 'string' },
                { name: 'name', type: 'string' }
            ],
            id: 'code',
            url: AccountingConstant.ACCOUNTGROUPS_URL
        };

        var _dataSource = new DataSource(_dataSourceOptions);
        _dataAdapter = new DataAdapter(_dataSource);

        this.dataAdapter = _dataAdapter;

    }

}

export = AccountGroupComboBox;
