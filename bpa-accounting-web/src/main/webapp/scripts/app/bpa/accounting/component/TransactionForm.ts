/**
 * Created by Yusuf on 5/20/2015.
 */

import Form = require("bpa/base/component/input/Form");
import FormOptions = require("bpa/base/component/input/FormOptions");
import TransactionFormOptions = require("bpa/accounting/component/TransactionFormOptions");
import TextBox = require("bpa/base/component/input/TextBox");
import NumberInput = require("bpa/base/component/input/NumberInput");
import Label = require("bpa/base/component/Label");
import TableLayout = require("bpa/base/component/layout/TableLayout");
import Transaction = require("bpa/accounting/model/Transaction");

import SimplePanel = require("bpa/base/component/container/SimplePanel");

import AccountComboBox = require("bpa/accounting/component/AccountComboBox");
import TransactionJournalGrid = require("bpa/accounting/component/TransactionJournalGrid");


class TransactionForm extends Form{

    transaction: Transaction;
    onValidationSuccess: any;

    //_codeTextBox: TextBox;

    constructor(theOptions: TransactionFormOptions){

        var _this = this;

        this.transaction = theOptions.transaction;
        this.onValidationSuccess = theOptions.onValidationSuccess;


        var _transactionNumberLabel: Label = new Label({label: "Transaction Number"});
        var _transactionNumberTextBox: TextBox = new TextBox({name: 'transactionNumber', value: this.transaction.transactionNumber, isRequired: true, minLength: 3, maxLength: 20, widthInPercentage: 90});
        var _descriptionLabel: Label = new Label({label: "Description"});
        var _descriptionTextBox: TextBox = new TextBox({name: 'description', value: this.transaction.description, maxLength: 150, widthInPercentage: 90});
        var _createdTimeLabel: Label = new Label({label: "Created"});
        var _createdTimeTextBox: TextBox = new TextBox({name: 'createdTime', value: this.transaction.createdTime, isRequired: true, minLength: 3, maxLength: 20, widthInPercentage: 90});

        //var _accountLabel: Label = new Label({label: "Account"});
        //var _accountComboBox: AccountComboBox =
        //    new AccountComboBox({
        //        name: "account",
        //        widthInPercentage: 90,
        //        isRequired: true
        //    });
        //
        //var _amountLabel: Label = new Label({label: "Amount"});
        //var _amountNumberInput: NumberInput = new NumberInput({name: 'amount', showSpinButtons: true, maxLength: 150, width: 150});

        var _journalsLabel: Label = new Label({label: "Journals"});
        var _transactionJournalGrid: TransactionJournalGrid = new TransactionJournalGrid({name: 'journals', journals: []});

        var _simplePanel = new SimplePanel({content: _transactionJournalGrid});

        var _tableLayout: TableLayout = new TableLayout({
            classStyling: "edit-table",
            rows:[
                {
                    columns:[
                        {content: _transactionNumberLabel},
                        {content: _transactionNumberTextBox}
                    ]
                },
                {
                    columns:[
                        {content: _descriptionLabel},
                        {content: _descriptionTextBox}
                    ]
                },
                {
                    columns:[
                        {content: _createdTimeLabel},
                        {content: _createdTimeTextBox}
                    ]
                },
                {
                    columns:[
                        //{content: _journalsLabel},
                        {colspan: 2, content: _simplePanel}
                    ]
                },
                //{
                //    columns:[
                //        {content: _accountLabel},
                //        {content: _accountComboBox}
                //    ]
                //},
                //{
                //    columns:[
                //        {content: _amountLabel},
                //        {content: _amountNumberInput}
                //    ]
                //},
            ]
        });

        var _formOptions: FormOptions = {
            items: [_transactionNumberTextBox, _descriptionTextBox, _createdTimeTextBox, _transactionJournalGrid],
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

export = TransactionForm;
