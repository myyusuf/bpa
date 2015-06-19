/**
 * Created by Yusuf on 5/25/2015.
 */

import Model = require("bpa/base/model/Model");

class User extends Model{

    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(theUserId: string, theFirstName: string, theLastName: string, theEmail: string, thePassword: string){
        super();

        this.userId = theUserId;
        this.firstName = theFirstName;
        this.lastName = theLastName;
        this.email = theEmail;
        this.password = thePassword;
    }

    static newInstance(): User{
        return new User(null,  null, null, null, null);
    }
}

export = User;
