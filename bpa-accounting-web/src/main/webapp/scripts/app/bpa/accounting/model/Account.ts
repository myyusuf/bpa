/**
 * Created by Yusuf on 5/25/2015.
 */

import Model = require("bpa/base/model/Model");
import AccountGroup = require("bpa/accounting/model/AccountGroup");
import DefaultBalance = require("bpa/accounting/model/DefaultBalance");

class Account extends Model{

    code: string;
    name: string;
    description: string;
    group: AccountGroup;
    parent: Account;
    defaultBalance: DefaultBalance;

    constructor(theCode: string, theName: string, theDescription: string, theGroup: AccountGroup, theParent: Account, theDefaultBalance: DefaultBalance){
        super();

        this.code = theCode;
        this.name = theName;
        this.description = theDescription;
        this.group = theGroup;
        this.parent = theParent;
        this.defaultBalance = theDefaultBalance;
    }

    static newInstance(): Account{
        return new Account(null,  null, null, null, null, null);
    }
}

export = Account;
