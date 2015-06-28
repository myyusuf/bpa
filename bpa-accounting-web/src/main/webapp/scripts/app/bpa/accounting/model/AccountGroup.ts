/**
 * Created by Yusuf on 5/25/2015.
 */

import Model = require("bpa/base/model/Model");
import DefaultBalance = require("bpa/accounting/model/DefaultBalance");

class AccountGroup extends Model{

    code: string;
    name: string;
    description: string;
    defaultBalance: DefaultBalance;

    constructor(theCode: string, theName: string, theDescription: string, theDefaultBalance: DefaultBalance){
        super();

        this.code = theCode;
        this.name = theName;
        this.description = theDescription;
        this.defaultBalance = theDefaultBalance;
    }

    static newInstance(): AccountGroup{
        return new AccountGroup(null,  null, null, null);
    }
}

export = AccountGroup;
