/**
 * Created by Yusuf on 6/21/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/input/ComboBox", "bpa/accounting/AccountingConstant", "bpa/base/data/DataSource", "bpa/base/data/DataAdapter", "bpa/accounting/model/Account"], function (require, exports, ComboBox, AccountingConstant, DataSource, DataAdapter, Account) {
    var ParentComboBox = (function (_super) {
        __extends(ParentComboBox, _super);
        //_editedAccountCode: string;
        function ParentComboBox(theOptions) {
            //ParentComboBoxOptions is used instead of ComboBoxOptions to override the need to supply dataAdapter
            var _dataAdapter;
            _super.call(this, {
                name: theOptions.name,
                dataAdapter: null,
                displayMember: "name",
                valueMember: "code",
                value: theOptions.value,
                comboBoxValue: theOptions.value != undefined ? theOptions.value.code : null,
                widthInPercentage: theOptions.widthInPercentage,
                height: 20,
                promptText: "Select Parent Account",
                objectToValueCoverter: function (theObject) {
                    if (theObject != undefined && theObject != null) {
                        return theObject.code;
                    }
                    else {
                        return null;
                    }
                },
                valueToObjectConverter: function (theComboBoxValue) {
                    var _value = theComboBoxValue;
                    var _account = Account.newInstance();
                    _account.code = _value;
                    return _account;
                },
                renderer: function (index, label, value) {
                    var _item = _dataAdapter.get().records[index];
                    if (_item != null) {
                        var _label = '';
                        if (_item.code != '') {
                            _label = _item.code + " (" + _item.name + ")";
                        }
                        else {
                            _label = _item.name;
                        }
                        return _label;
                    }
                    return '';
                },
                renderSelectedItem: function (index, item) {
                    var _item = _dataAdapter.get().records[index];
                    if (_item != null) {
                        var _label = '';
                        if (_item.code != '') {
                            _label = _item.code + " (" + _item.name + ")";
                        }
                        else {
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
            var _dataSourceOptions = {
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
            _dataAdapter = new DataAdapter(_dataSource, function (data) {
                data.groupCode = _this._groupCode;
                //data.selfAccountCode = _this._editedAccountCode;
                return data;
            });
            this.dataSource = _dataSource;
            this.dataAdapter = _dataAdapter;
        }
        ParentComboBox.prototype.changeGroupCode = function (theGroupCode) {
            var _this = this;
            this._groupCode = theGroupCode;
            //_this.dataAdapter.get().dataBind();
            //_this.element = _this.element.jqxComboBox({source: _this.dataAdapter});
            this.reloadData();
        };
        return ParentComboBox;
    })(ComboBox);
    return ParentComboBox;
});
