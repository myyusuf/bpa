/**
 * Created by Yusuf on 5/20/2015.
 */

import Form = require("bpa/base/component/input/Form");
import FormOptions = require("bpa/base/component/input/FormOptions");
import AccountGroupFormOptions = require("bpa/accounting/component/AccountGroupFormOptions");
import TextBox = require("bpa/base/component/input/TextBox");
import TextArea = require("bpa/base/component/input/TextArea");
import Label = require("bpa/base/component/Label");
import TableLayout = require("bpa/base/component/layout/TableLayout");
import AccountGroup = require("bpa/accounting/model/AccountGroup");

import SimplePanel = require("bpa/base/component/container/SimplePanel");

import DefaultBalanceComboBox = require("bpa/accounting/component/DefaultBalanceComboBox");

class AccountGroupForm extends Form{

    accountGroup: AccountGroup;
    onValidationSuccess: any;

    _codeTextBox: TextBox;

    constructor(theOptions: AccountGroupFormOptions){

        var _this = this;

        _this.accountGroup = theOptions.accountGroup;
        _this.onValidationSuccess = theOptions.onValidationSuccess;


        var _codeLabel: Label = new Label({label: "Code"});
        var _codeTextBox: TextBox = new TextBox({name: 'code', value: this.accountGroup.code, isRequired: true, minLength: 3, maxLength: 20, widthInPercentage: 90});

        var _nameLabel: Label = new Label({label: "Name"});
        var _nameTextBox: TextBox = new TextBox({name: 'name', value: this.accountGroup.name, isRequired: true, minLength: 3, maxLength: 20, widthInPercentage: 90});

        var _defaultBalanceLabel: Label = new Label({label: "Default Balance"});
        var _defaultBalanceComboBox: DefaultBalanceComboBox =
            new DefaultBalanceComboBox({
                name: "defaultBalance",
                value: this.accountGroup.defaultBalance,
                widthInPercentage: 90,
                isRequired: true
            });

        var _descriptionLabel: Label = new Label({label: "Description"});
        var _descriptionTextArea: TextArea = new TextArea({name: 'description', value: this.accountGroup.description, height: 100, widthInPercentage: 90});


        var _tableLayout: TableLayout = new TableLayout({
            classStyling: "edit-table",
            rows:[
                {
                    columns:[
                        {content: _codeLabel, width: 130},
                        {content: _codeTextBox}
                    ]
                },
                {
                    columns:[
                        {content: _nameLabel, width: 130},
                        {content: _nameTextBox}
                    ]
                },
                {
                    columns:[
                        {content: _defaultBalanceLabel, width: 130},
                        {content: _defaultBalanceComboBox}
                    ]
                },
                {
                    columns:[
                        {content: _descriptionLabel, width: 130},
                        {content: _descriptionTextArea}
                    ]
                }
            ]
        });

        var _formOptions: FormOptions = {
            items: [_codeTextBox, _nameTextBox, _defaultBalanceComboBox, _descriptionTextArea],
            layout: _tableLayout,
            onValidationSuccess: _this.onValidationSuccess
        }

        super(_formOptions);

        //_this._codeTextBox = _codeTextBox;
    }

    editMode(){
        //this._codeTextBox.disable();
    }

    newMode(){
        //this._codeTextBox.enable();
    }

}

export = AccountGroupForm;
