/**
 * Created by Yusuf on 6/21/2015.
 */

import Model = require("bpa/base/model/Model");
import Account = require("bpa/accounting/model/Account");
import Currency = require("bpa/accounting/model/Currency");
import MovementType = require("bpa/accounting/model/MovementType");
import Transaction = require("bpa/accounting/model/Transaction");

class Journal extends Model{

    journalId: string;
    account: Account;
    amount: number;
    currency: Currency;
    kurs: number;
    position: boolean;
    transaction: Transaction;
    description: string;
    createdTime: Date;

    constructor(
        theJournalId: string,
        theAccount: Account,
        theAmount: number,
        theCurrency: Currency,
        theKurs: number,
        thePosition: boolean,
        theTransaction: Transaction,
        theDescription: string,
        theCreatedTime: Date
    ){
        super();

        this.journalId = theJournalId;
        this.account = theAccount;
        this.amount = theAmount;
        this.currency = theCurrency;
        this.kurs = theKurs;
        this.position = thePosition;
        this.transaction = theTransaction;
        this.description = theDescription;
        this.createdTime = theCreatedTime;

    }

    static newInstance(): Journal{
        return new Journal(null,  null, null, null, null, null, null, null, null);
    }
}

export = Journal;
