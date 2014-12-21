package id.co.oriza.bpa.acc.domain.model;

import java.util.Collection;

public interface AccountGroupRepository {
	
	public void add(AccountGroup anAccountGroup);
	public Collection<AccountGroup> allSimilarlyCodedOrNamedAccountGroups(String aCode, String aName, int aStart, int aLimit);
	public AccountGroup accountGroupWithCode(String aCode);

}
