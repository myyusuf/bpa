package id.co.oriza.bpa.acc.domain.model;

import java.util.Collection;

public interface AccountRepository {
	
	void add(Account anAccount);
	Collection<Account> allSimilarlyCodedOrNamedAccounts(String aCode, String aName);
	Account accountWithCode(String anAccountCode);
	AccountId nextIdentity();

}
