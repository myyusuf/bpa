package id.co.oriza.bpa.acc.application;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import id.co.oriza.bpa.acc.domain.model.Account;
import id.co.oriza.bpa.acc.domain.model.AccountGroup;
import id.co.oriza.bpa.acc.domain.model.AccountGroupRepository;
import id.co.oriza.bpa.acc.domain.model.AccountId;
import id.co.oriza.bpa.acc.domain.model.AccountRepository;

@Transactional
public class AccountApplicationService {
	
	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private AccountGroupRepository accountGroupRepository;
	
	public Collection<AccountGroup> allSimilarlyCodedOrNamedAccountGroups(String aCode, String aName, int aStart, int aLimit){
		Collection<AccountGroup> accountGroups = this.accountGroupRepository().allSimilarlyCodedOrNamedAccountGroups(aCode, aName, aStart, aLimit);
		return accountGroups;
	}
	
	public Collection<Account> allSimilarlyCodedOrNamedAccounts(String aCode, String aName, int aStart, int aLimit){
		Collection<Account> accounts = this.accountRepository().allSimilarlyCodedOrNamedAccounts(aCode, aName, aStart, aLimit);
		return accounts;
	}
	
	public int allSimilarlyCodedOrNamedAccountsSize(String aCode, String aName){
		int accountsSize = this.accountRepository().allSimilarlyCodedOrNamedAccountsSize(aCode, aName);
		return accountsSize;
	}
	
	public Account newAccountWith(NewAccountCommand aCommand){
		
		AccountGroup accountGroup = this.existingAccountGroup(aCommand.getAccountGroupCode());
		Account parentAccount = this.existingAccount(aCommand.getParentAccountCode());
		
		AccountId accountId = this.accountRepository().nextIdentity();
		Account account = new Account(accountId, aCommand.getCode(), aCommand.getName(), aCommand.getDescription(), parentAccount, accountGroup);
		
		this.accountRepository().add(account);
		
		return account;
		
	}

	private AccountGroup existingAccountGroup(String anAccountGroupCode) {
		AccountGroup accountGroup = this.accountGroup(anAccountGroupCode);
		if(accountGroup == null){
			throw new IllegalArgumentException("AccountGroup does not exist for : " + anAccountGroupCode);
		}
		return accountGroup;
	}

	private AccountGroup accountGroup(String anAccountGroupCode) {
		AccountGroup accountGroup = this.accountGroupRepository().accountGroupWithCode(anAccountGroupCode);
		return accountGroup;
	}

	private AccountGroupRepository accountGroupRepository() {
		return this.accountGroupRepository;
	}

	private Account existingAccount(String anAccountCode) {
		Account account = this.account(anAccountCode);
		
		if(account == null){
			throw new IllegalArgumentException("Account does not exist for : " + anAccountCode);
		}
		return account;
	}

	private Account account(String anAccountCode) {
		Account account = this.accountRepository().accountWithCode(anAccountCode);
		return account;
	}

	public AccountRepository accountRepository() {
		return accountRepository;
	}

}
