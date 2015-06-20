/**
 * Created by Yusuf on 5/25/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "bpa/base/model/Model"], function (require, exports, Model) {
    var User = (function (_super) {
        __extends(User, _super);
        function User(theUserId, theFirstName, theLastName, theEmail, thePassword, theGroups) {
            _super.call(this);
            this.userId = theUserId;
            this.firstName = theFirstName;
            this.lastName = theLastName;
            this.email = theEmail;
            this.password = thePassword;
            this.groups = theGroups;
        }
        User.newInstance = function () {
            return new User(null, null, null, null, null, []);
        };
        return User;
    })(Model);
    return User;
});
