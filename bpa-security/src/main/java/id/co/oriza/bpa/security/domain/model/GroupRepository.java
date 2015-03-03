package id.co.oriza.bpa.security.domain.model;

import java.util.List;

public interface GroupRepository {

	List<Group> all(int start, int limit);

	void add(Group group);

	long allSize();

	Group existingGroup(String code);

	void remove(Group group);

	List<Group> withCodes(List<String> groupCodes);

}
