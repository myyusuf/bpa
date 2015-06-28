/**
 * Created by Yusuf on 5/20/2015.
 */

import Form = require("bpa/base/component/input/Form");
import FormOptions = require("bpa/base/component/input/FormOptions");
import AccountFormOptions = require("bpa/accounting/component/AccountFormOptions");
import TextBox = require("bpa/base/component/input/TextBox");
import TextArea = require("bpa/base/component/input/TextArea");
import Label = require("bpa/base/component/Label");
import TableLayout = require("bpa/base/component/layout/TableLayout");
import Account = require("bpa/accounting/model/Account");

import SimplePanel = require("bpa/base/component/container/SimplePanel");

import AccountGroupComboBox = require("bpa/accounting/component/AccountGroupComboBox");
import DefaultBalanceComboBox = require("bpa/accounting/component/DefaultBalanceComboBox");
import ParentComboBox = require("bpa/accounting/component/ParentComboBox");

class AccountForm extends Form{

    account: Account;
    onValidationSuccess: any;

    _codeTextBox: TextBox;

    constructor(theOptions: AccountFormOptions){

        var _this = this;

        _this.account = theOptions.account;
        _this.onValidationSuccess = theOptions.onValidationSuccess;

        var _parentComboBox: ParentComboBox = null;

        var _accountGroupLabel: Label = new Label({label: "Account Group"});
        var _accountGroupComboBox: AccountGroupComboBox =
            new AccountGroupComboBox({
                name: "group",
                value: _this.account.group,
                widthInPercentage: 90,
                isRequired: true,
                onChange: function(value: any){
                    _parentComboBox.changeGroupCode(value);
                }
            });

        var _parentLabel: Label = new Label({label: "Parent"});
        _parentComboBox =
            new ParentComboBox({
                groupCode: "10000000",
                name: "parent",
                value: _this.account.parent,
                widthInPercentage: 90,
                isRequired: true
            });

        var _codeLabel: Label = new Label({label: "Code"});
        var _codeTextBox: TextBox = new TextBox({name: 'code', value: this.account.code, isRequired: true, minLength: 3, maxLength: 20, widthInPercentage: 90});

        var _nameLabel: Label = new Label({label: "Name"});
        var _nameTextBox: TextBox = new TextBox({name: 'name', value: this.account.name, isRequired: true, minLength: 3, maxLength: 20, widthInPercentage: 90});

        var _defaultBalanceLabel: Label = new Label({label: "Account Group"});
        var _defaultBalanceComboBox: DefaultBalanceComboBox =
            new DefaultBalanceComboBox({
                name: "defaultBalance",
                value: this.account.defaultBalance,
                widthInPercentage: 90,
                isRequired: true
            });

        var _descriptionLabel: Label = new Label({label: "Description"});
        var _descriptionTextArea: TextArea = new TextArea({name: 'description', value: this.account.description, height: 100, widthInPercentage: 90});


        var _tableLayout: TableLayout = new TableLayout({
            classStyling: "edit-table",
            rows:[
                {
                    columns:[
                        {content: _accountGroupLabel, width: 130},
                        {content: _accountGroupComboBox}
                    ]
                },
                {
                    columns:[
                        {content: _parentLabel, width: 130},
                        {content: _parentComboBox}
                    ]
                },
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
            items: [_accountGroupComboBox, _parentComboBox, _codeTextBox, _nameTextBox, _defaultBalanceComboBox, _descriptionTextArea],
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

export = AccountForm;
