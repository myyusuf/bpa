/**
 * Created by Yusuf on 5/25/2015.
 */

import Model = require("bpa/base/model/Model");

class DefaultBalance extends Model{

    code: string;
    name: string;

    constructor(theCode: string, theName: string){
        super();

        this.code = theCode;
        this.name = theName;
    }

    static newInstance(): DefaultBalance{
        return new DefaultBalance(null,  null);
    }
}

export = DefaultBalance;
