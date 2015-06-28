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

import CurrencyComboBoxOptions = require("bpa/accounting/component/CurrencyComboBoxOptions");
import ValidatorRule = require("bpa/base/component/input/ValidatorRule");

import Currency = require("bpa/accounting/model/Currency");

class CurrencyComboBox extends ComboBox{

    constructor(theOptions: CurrencyComboBoxOptions){

        //CurrencyComboBoxOptions is used instead of ComboBoxOptions to override the need to supply dataAdapter
        var _dataAdapter: DataAdapter;

        super({
            name: theOptions.name,
            dataAdapter: null,
            displayMember: "name",
            valueMember: "code",
            value: theOptions.value,
            widthInPercentage: theOptions.widthInPercentage,
            height: 20,
            promptText: "Select Currency",
            objectToValueCoverter: function(theObject: any){
                if(theObject != undefined && theObject != null){
                    return theObject.code;
                }else{
                    return null;
                }
            },
            valueToObjectConverter: function(theComboBoxValue: string){
                var _value: string = theComboBoxValue;
                var _currency: Currency = Currency.newInstance();
                _currency.code = _value;
                return _currency;
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
            url: AccountingConstant.CURRENCIES_URL
        };

        var _dataSource = new DataSource(_dataSourceOptions);
        _dataAdapter = new DataAdapter(_dataSource);

        this.dataAdapter = _dataAdapter;

    }

}

export = CurrencyComboBox;
