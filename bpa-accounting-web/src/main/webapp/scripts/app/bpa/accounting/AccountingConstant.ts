/**
 * Created by Yusuf on 6/15/2015.
 */

class AccountingConstant{
    public static get DEFAULTBALANCES_URL(): string {return "http://localhost:18787/bpa-accounting-web-1.0/service/accounting/defaultbalances";}
    public static get CURRENCIES_URL(): string {return "http://localhost:18787/bpa-accounting-web-1.0/service/accounting/currencies";}
    public static get ACCOUNTGROUPS_URL(): string {return "http://localhost:18787/bpa-accounting-web-1.0/service/accounting/accountgroups";}
    public static get ACCOUNTPARENTS_URL(): string {return "http://localhost:18787/bpa-accounting-web-1.0/service/accounting/accounts/parents";}
    public static get ACCOUNTS_URL(): string {return "http://localhost:18787/bpa-accounting-web-1.0/service/accounting/accounts";}
    public static get JOURNALS_URL(): string {return "sample/bpa/accounting/journals.json";}
    //public static get TRANSACTIONS_URL(): string {return "sample/bpa/accounting/transactions.json";}
    public static get TRANSACTIONS_URL(): string {return "http://localhost:18787/bpa-accounting-web-1.0/service/accounting/transactions";}
}

export = AccountingConstant;
