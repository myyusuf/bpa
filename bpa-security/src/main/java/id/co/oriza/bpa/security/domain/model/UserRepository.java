package id.co.oriza.bpa.security.domain.model;

import java.util.List;

public interface UserRepository {

	List<User> all(int start, int limit);

	long allSize();

	void add(User user);

	void remove(User user);

	User userWithUserId(String userId);

}
