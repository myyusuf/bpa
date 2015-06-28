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
    var AccountComboBox = (function (_super) {
        __extends(AccountComboBox, _super);
        function AccountComboBox(theOptions) {
            var _dataAdapter;
            _super.call(this, {
                name: theOptions.name,
                dataAdapter: null,
                displayMember: "code",
                valueMember: "code",
                value: theOptions.value,
                widthInPercentage: theOptions.widthInPercentage,
                height: 20,
                autoComplete: true,
                promptText: "Select Account",
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
                    var _item = _this._searchItem(item.value); //_dataAdapter.get().records[index];
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
            var _dataSourceOptions = {
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
        AccountComboBox.prototype._searchItem = function (code) {
            var _records = this.dataAdapter.get().records;
            for (var _i = 0; _i < _records.length; _i++) {
                var _record = _records[_i];
                if (_record.code == code) {
                    return _record;
                }
            }
            return null;
        };
        return AccountComboBox;
    })(ComboBox);
    return AccountComboBox;
});
