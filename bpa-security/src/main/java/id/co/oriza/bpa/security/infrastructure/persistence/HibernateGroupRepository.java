package id.co.oriza.bpa.security.infrastructure.persistence;

import java.util.List;

import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;
import id.co.oriza.bpa.security.domain.model.Group;
import id.co.oriza.bpa.security.domain.model.GroupRepository;

public class HibernateGroupRepository extends AbstractHibernateSession implements GroupRepository{

	@Override
	public List<Group> allGroupsWithUser(String userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Group> all(int start, int limit) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void add(Group group) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public long allSize() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Group existingGroup(String code) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void remove(String code) {
		// TODO Auto-generated method stub
		
	}

}
