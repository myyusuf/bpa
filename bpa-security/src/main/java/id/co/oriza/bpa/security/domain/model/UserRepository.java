package id.co.oriza.bpa.security.domain.model;

import java.util.Collection;

public interface UserRepository {
	
	void add(User user);
	public Collection<User> allSimilarlyNamedUsers(String aName, int aStart, int aLimit);
	User userWithUsername(String aUsername);

}
