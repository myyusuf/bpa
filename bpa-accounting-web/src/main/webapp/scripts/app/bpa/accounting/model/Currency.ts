/**
 * Created by Yusuf on 5/25/2015.
 */

import Model = require("bpa/base/model/Model");

class Currency extends Model{

    code: string;
    name: string;
    description: string;

    constructor(theCode: string, theName: string, theDescription: string){
        super();

        this.code = theCode;
        this.name = theName;
        this.description = theDescription;
    }

    static newInstance(): Currency{
        return new Currency(null,  null, null);
    }
}

export = Currency;
