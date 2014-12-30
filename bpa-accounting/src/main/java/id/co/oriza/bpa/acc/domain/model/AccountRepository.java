package id.co.oriza.bpa.acc.domain.model;

import java.util.Collection;

public interface AccountRepository {
	
	void add(Account anAccount);
	Collection<Account> allSimilarlyCodedOrNamedAccounts(String aCode, String aName, int aStart, int aLimit);
	Account accountWithCode(String anAccountCode);
	AccountId nextIdentity();
	int allSimilarlyCodedOrNamedAccountsSize(String aCode, String aName);
	void remove(Account account);
	Collection<Account> allAccountParents(String groupCode, String selfCode);

}
