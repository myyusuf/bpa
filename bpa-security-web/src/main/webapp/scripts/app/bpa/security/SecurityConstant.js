/**
 * Created by Yusuf on 6/15/2015.
 */
define(["require", "exports"], function (require, exports) {
    var SecurityConstant = (function () {
        function SecurityConstant() {
        }
        Object.defineProperty(SecurityConstant, "GROUPS_URL", {
            get: function () {
                return "http://localhost:18787/bpa-security-web-1.0/service/security/groups";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SecurityConstant, "USERS_URL", {
            get: function () {
                return "http://localhost:18787/bpa-security-web-1.0/service/security/users";
            },
            enumerable: true,
            configurable: true
        });
        return SecurityConstant;
    })();
    return SecurityConstant;
});
