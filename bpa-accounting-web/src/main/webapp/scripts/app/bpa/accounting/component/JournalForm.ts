/**
 * Created by Yusuf on 5/20/2015.
 */

import Form = require("bpa/base/component/input/Form");
import FormOptions = require("bpa/base/component/input/FormOptions");
import JournalFormOptions = require("bpa/accounting/component/JournalFormOptions");
import TextBox = require("bpa/base/component/input/TextBox");
import CheckBox = require("bpa/base/component/input/CheckBox");
import NumberInput = require("bpa/base/component/input/NumberInput");
import ToggleButton = require("bpa/base/component/ToggleButton");
import TextArea = require("bpa/base/component/input/TextArea");
import Label = require("bpa/base/component/Label");
import TableLayout = require("bpa/base/component/layout/TableLayout");
import Journal = require("bpa/accounting/model/Journal");

import SimplePanel = require("bpa/base/component/container/SimplePanel");

import AccountComboBox = require("bpa/accounting/component/AccountComboBox");
import CurrencyComboBox = require("bpa/accounting/component/CurrencyComboBox");


class JournalForm extends Form{

    journal: Journal;
    onValidationSuccess: any;

    _codeTextBox: TextBox;

    constructor(theOptions: JournalFormOptions){

        var _this = this;

        _this.journal = theOptions.journal;
        _this.onValidationSuccess = theOptions.onValidationSuccess;

        var _accountLabel: Label = new Label({label: "Account"});
        var _accountComboBox: AccountComboBox =
            new AccountComboBox({
                name: "account",
                widthInPercentage: 90,
                isRequired: true
            });

        var _amountLabel: Label = new Label({label: "Amount"});
        var _amountNumberInput: NumberInput = new NumberInput({name: 'amount', showSpinButtons: true, maxLength: 150, width: 190});

        _this.journal.position = true;
        var _positionToggleButton: ToggleButton = new ToggleButton({activeLabel: ' + ', inactiveLabel: ' - ',
        onClick: function(toggled){
            _this.journal.position = toggled;
        }});

        var _currencyLabel: Label = new Label({label: "Currency"});
        var _currencyComboBox: CurrencyComboBox =
            new CurrencyComboBox({
                name: "currency",
                widthInPercentage: 90,
                isRequired: true
            });

        var _descriptionLabel: Label = new Label({label: "Description"});
        var _descriptionTextArea: TextArea = new TextArea({name: 'description', value: this.journal.description, height: 100, widthInPercentage: 90});

        var _kursLabel: Label = new Label({label: "Kurs"});
        var _kursCheckBox: CheckBox =
            new CheckBox({
                name: "isKursAuto",
                label: "Auto",
                width: 50,
                isRequired: true
            });
        var _kursNumberInput: NumberInput = new NumberInput({name: 'kurs', showSpinButtons: true, maxLength: 150, width: 192});

        var _tableLayout: TableLayout = new TableLayout({
            classStyling: "edit-table",
            rows:[

                {
                    columns:[
                        {content: _accountLabel, width: 130},
                        {content: _accountComboBox, colspan: 2}
                    ]
                },
                {
                    columns:[
                        {content: _amountLabel, width: 130},
                        {content: _positionToggleButton, width: 10},
                        {content: _amountNumberInput}
                    ]
                },
                {
                    columns:[
                        {content: _currencyLabel, width: 130},
                        {content: _currencyComboBox, colspan: 2}
                    ]
                },
                {
                    columns:[
                        {content: _kursLabel, width: 130},
                        {content: _kursCheckBox},
                        {content: _kursNumberInput}
                    ]
                },
                {
                    columns:[
                        {content: _descriptionLabel, width: 130},
                        {content: _descriptionTextArea, colspan: 2}
                    ]
                }
            ]
        });

        var _formOptions: FormOptions = {
            items: [_accountComboBox, _amountNumberInput, _currencyComboBox, _kursCheckBox, _descriptionTextArea],
            layout: _tableLayout,
            onValidationSuccess: _this.onValidationSuccess
        }

        super(_formOptions);

        //_this._codeTextBox = _codeTextBox;
    }

    getValue(): any{
        var _obj = super.getValue();
        _obj["position"] = this.journal.position;
        return _obj;
    }

    editMode(){
        //this._codeTextBox.disable();
    }

    newMode(){
        //this._codeTextBox.enable();
    }

}

export = JournalForm;
