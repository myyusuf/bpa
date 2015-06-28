/**
 * Created by Yusuf on 5/25/2015.
 */

import Model = require("bpa/base/model/Model");

class MovementType extends Model{

    code: string;
    name: string;

    constructor(theCode: string, theName: string){
        super();

        this.code = theCode;
        this.name = theName;
    }

    static newInstance(): MovementType{
        return new MovementType(null,  null);
    }
}

export = MovementType;
