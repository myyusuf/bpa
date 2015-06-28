/**
 * Created by Yusuf on 5/25/2015.
 */

import Model = require("bpa/base/model/Model");
import Journal = require("bpa/accounting/model/Journal");

class Transaction extends Model{

    transactionId: string;
    transactionNumber: string;
    description: string;
    createdTime: Date;
    journals: Array<Journal>;

    constructor(theTransactionId: string, theTransactionNumber: string, theDescription: string, theCreatedTime: Date, theJournals: Array<Journal>){
        super();

        this.transactionId = theTransactionId;
        this.transactionNumber = theTransactionNumber;
        this.description = theDescription;
        this.createdTime = theCreatedTime;
        this.journals = theJournals;
    }

    static newInstance(): Transaction{
        return new Transaction(null,  null, null, null, []);
    }
}

export = Transaction;
