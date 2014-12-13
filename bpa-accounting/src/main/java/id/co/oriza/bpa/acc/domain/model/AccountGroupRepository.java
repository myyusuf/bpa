package id.co.oriza.bpa.acc.domain.model;

import java.util.Collection;

public interface AccountGroupRepository {
	
	public void add(AccountGroup anAccountGroup);
	public Collection<AccountGroup> allSimilarlyCodeOrNameAccountGroups(String aCode, String aName);
	public AccountGroup accountGroupWithCode(String aCode);

}
