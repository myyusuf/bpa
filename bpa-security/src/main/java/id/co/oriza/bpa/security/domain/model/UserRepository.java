package id.co.oriza.bpa.security.domain.model;

import java.util.Collection;

public interface UserRepository {
	
	public Collection<User> allSimilarlyNamedUsers(String aName, int aStart, int aLimit);

}
