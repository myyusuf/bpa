package id.co.oriza.bpa.security.domain.model;

import java.util.Collection;

public interface RoleRepository {
	
	void add(Role role);
	public Collection<Role> allSimilarlyNamedRoles(String aName, int aStart, int aLimit);
	Role roleWithCode(String aRolename);
	void remove(Role aRole);
	long allSimilarlyNamedRolesSize(String aName);

}
