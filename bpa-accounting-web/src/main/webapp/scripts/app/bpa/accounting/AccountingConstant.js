/**
 * Created by Yusuf on 6/15/2015.
 */
define(["require", "exports"], function (require, exports) {
    var AccountingConstant = (function () {
        function AccountingConstant() {
        }
        Object.defineProperty(AccountingConstant, "DEFAULTBALANCES_URL", {
            get: function () {
                return "http://localhost:18787/bpa-accounting-web-1.0/service/accounting/defaultbalances";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountingConstant, "CURRENCIES_URL", {
            get: function () {
                return "http://localhost:18787/bpa-accounting-web-1.0/service/accounting/currencies";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountingConstant, "ACCOUNTGROUPS_URL", {
            get: function () {
                return "http://localhost:18787/bpa-accounting-web-1.0/service/accounting/accountgroups";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountingConstant, "ACCOUNTPARENTS_URL", {
            get: function () {
                return "http://localhost:18787/bpa-accounting-web-1.0/service/accounting/accounts/parents";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountingConstant, "ACCOUNTS_URL", {
            get: function () {
                return "http://localhost:18787/bpa-accounting-web-1.0/service/accounting/accounts";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountingConstant, "JOURNALS_URL", {
            get: function () {
                return "sample/bpa/accounting/journals.json";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountingConstant, "TRANSACTIONS_URL", {
            //public static get TRANSACTIONS_URL(): string {return "sample/bpa/accounting/transactions.json";}
            get: function () {
                return "http://localhost:18787/bpa-accounting-web-1.0/service/accounting/transactions";
            },
            enumerable: true,
            configurable: true
        });
        return AccountingConstant;
    })();
    return AccountingConstant;
});
