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

import ParentComboBoxOptions = require("bpa/accounting/component/ParentComboBoxOptions");
import ValidatorRule = require("bpa/base/component/input/ValidatorRule");

import Account = require("bpa/accounting/model/Account");

class ParentComboBox extends ComboBox{

    dataSource: DataSource;
    _groupCode: string;
    //_editedAccountCode: string;


    constructor(theOptions: ParentComboBoxOptions){

        //ParentComboBoxOptions is used instead of ComboBoxOptions to override the need to supply dataAdapter

        var _dataAdapter: DataAdapter;

        super({
            name: theOptions.name,
            dataAdapter: null,
            displayMember: "name",
            valueMember: "code",
            value: theOptions.value,
            comboBoxValue: theOptions.value != undefined ? theOptions.value.code : null,
            widthInPercentage: theOptions.widthInPercentage,
            height: 20,
            promptText: "Select Parent Account",
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
            isRequired: theOptions.isRequired
        });

        var _this = this;

        _this._groupCode = theOptions.groupCode;
        //_this._editedAccountCode = theOptions.editedAccountCode;

        var _dataSourceOptions: DataSourceOptions = {
            type: "GET",
            cache: false,
            dataType: "json",
            dataFields: [
                { name: 'code', type: 'string' },
                { name: 'name', type: 'string' }
            ],
            id: 'code',
            url: AccountingConstant.ACCOUNTPARENTS_URL
        };

        var _dataSource = new DataSource(_dataSourceOptions);
        _dataAdapter = new DataAdapter(_dataSource, function(data: any){
            data.groupCode = _this._groupCode;
            //data.selfAccountCode = _this._editedAccountCode;
            return data;
        });

        this.dataSource = _dataSource;
        this.dataAdapter = _dataAdapter;

    }

    changeGroupCode(theGroupCode: string){

        var _this = this;
        this._groupCode = theGroupCode;

        //_this.dataAdapter.get().dataBind();
        //_this.element = _this.element.jqxComboBox({source: _this.dataAdapter});
        this.reloadData();
    }

}

export = ParentComboBox;
