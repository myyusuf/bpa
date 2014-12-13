package id.co.oriza.bpa.acc.domain.model;

import java.util.Collection;

public interface AccountRepository {
	
	public void add(Account anAccount);
	public Collection<Account> allSimilarlyCodeOrNameAccounts(String aCode, String aName);
	public Account accountWithCode(String anAccountCode);

}
