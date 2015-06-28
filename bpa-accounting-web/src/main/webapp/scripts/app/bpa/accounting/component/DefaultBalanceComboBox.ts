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

import DefaultBalanceComboBoxOptions = require("bpa/accounting/component/DefaultBalanceComboBoxOptions");
import ValidatorRule = require("bpa/base/component/input/ValidatorRule");

import DefaultBalance = require("bpa/accounting/model/DefaultBalance");

class DefaultBalanceComboBox extends ComboBox{

    constructor(theOptions: DefaultBalanceComboBoxOptions){

        //DefaultBalanceComboBoxOptions is used instead of ComboBoxOptions to override the need to supply dataAdapter
        var _dataAdapter: DataAdapter;

        super({
            name: theOptions.name,
            dataAdapter: null,
            displayMember: "name",
            valueMember: "code",
            value: theOptions.value,
            widthInPercentage: theOptions.widthInPercentage,
            height: 20,
            promptText: "Select Default Balance",
            objectToValueCoverter: function(theObject: any){
                if(theObject != undefined && theObject != null){
                    return theObject.code;
                }else{
                    return null;
                }
            },
            valueToObjectConverter: function(theComboBoxValue: string){
                var _value: string = theComboBoxValue;
                var _defaultBalance: DefaultBalance = DefaultBalance.newInstance();
                _defaultBalance.code = _value;
                return _defaultBalance;
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
            url: AccountingConstant.DEFAULTBALANCES_URL
        };

        var _dataSource = new DataSource(_dataSourceOptions);
        _dataAdapter = new DataAdapter(_dataSource);

        this.dataAdapter = _dataAdapter;

    }

}

export = DefaultBalanceComboBox;
