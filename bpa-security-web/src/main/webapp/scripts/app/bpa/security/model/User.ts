/**
 * Created by Yusuf on 5/25/2015.
 */

import Model = require("bpa/base/model/Model");

import Group = require("bpa/security/model/Group");

class User extends Model{

    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    groups: Array<Group>;

    constructor(theUserId: string, theFirstName: string, theLastName: string, theEmail: string, thePassword: string, theGroups: Array<Group>){
        super();

        this.userId = theUserId;
        this.firstName = theFirstName;
        this.lastName = theLastName;
        this.email = theEmail;
        this.password = thePassword;
        this.groups = theGroups;
    }

    static newInstance(): User{
        return new User(null,  null, null, null, null, []);
    }
}

export = User;
