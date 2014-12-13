package id.co.oriza.bpa.acc.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import id.co.oriza.bpa.acc.domain.model.Account;
import id.co.oriza.bpa.acc.domain.model.AccountGroup;
import id.co.oriza.bpa.acc.domain.model.AccountGroupRepository;
import id.co.oriza.bpa.acc.domain.model.AccountRepository;

@Transactional
public class AccountApplicationService {
	
	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private AccountGroupRepository accountGroupRepoitory;
	
	public Account newAccountWith(NewAccountCommand aCommand){
		
		AccountGroup accountGroup = this.existingAccountGroup(aCommand.getAccountGroupCode());
		Account parentAccount = this.existingAccount(aCommand.getParentAccountCode());
		Account account = new Account(aCommand.getCode(), aCommand.getName(), aCommand.getDescription(), parentAccount, accountGroup);
		
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
		return this.accountGroupRepoitory;
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
