/**
 * Created by Yusuf on 6/15/2015.
 */

class SecurityConstant{
    public static get GROUPS_URL(): string {return "http://localhost:18787/bpa-security-web-1.0/service/security/groupsx";}
    public static get USERS_URL(): string {return "http://localhost:18787/bpa-security-web-1.0/service/security/users";}
    //public static get GROUPS_URL(): string {return "sample/bpa/security/groups.json";}
}

export = SecurityConstant;
