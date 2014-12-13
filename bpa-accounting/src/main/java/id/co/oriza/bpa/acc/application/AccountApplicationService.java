package id.co.oriza.bpa.acc.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import id.co.oriza.bpa.acc.domain.model.Account;
import id.co.oriza.bpa.acc.domain.model.AccountCategory;
import id.co.oriza.bpa.acc.domain.model.AccountRepository;

@Transactional
public class AccountApplicationService {
	
	@Autowired
	private AccountRepository accountRepository;
	
	public Account registerAccount(String aCode, String aName, String aDescription, String aParentAccountCode, AccountCategory aCategory){
		
		Account parentAccount = this.existingAccount(aParentAccountCode);
		Account account = new Account(aCode, aName, aDescription, parentAccount, aCategory);
		
		this.accountRepository().add(account);
		
		return account;
		
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
