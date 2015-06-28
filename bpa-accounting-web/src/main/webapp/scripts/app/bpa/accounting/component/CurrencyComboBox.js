/**
 * Created by Yusuf on 6/21/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/component/input/ComboBox", "bpa/accounting/AccountingConstant", "bpa/base/data/DataSource", "bpa/base/data/DataAdapter", "bpa/accounting/model/Currency"], function (require, exports, ComboBox, AccountingConstant, DataSource, DataAdapter, Currency) {
    var CurrencyComboBox = (function (_super) {
        __extends(CurrencyComboBox, _super);
        function CurrencyComboBox(theOptions) {
            //CurrencyComboBoxOptions is used instead of ComboBoxOptions to override the need to supply dataAdapter
            var _dataAdapter;
            _super.call(this, {
                name: theOptions.name,
                dataAdapter: null,
                displayMember: "name",
                valueMember: "code",
                value: theOptions.value,
                widthInPercentage: theOptions.widthInPercentage,
                height: 20,
                promptText: "Select Currency",
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
                    var _currency = Currency.newInstance();
                    _currency.code = _value;
                    return _currency;
                },
                isRequired: theOptions.isRequired,
                onChange: theOptions.onChange
            });
            var _dataSourceOptions = {
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
        return CurrencyComboBox;
    })(ComboBox);
    return CurrencyComboBox;
});
