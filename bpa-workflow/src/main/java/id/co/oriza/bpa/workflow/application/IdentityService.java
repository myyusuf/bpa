package id.co.oriza.bpa.workflow.application;

import id.co.oriza.bpa.workflow.domain.model.Group;
import id.co.oriza.bpa.workflow.domain.model.User;

import java.util.List;

public interface IdentityService {
	
	List<User> allUsers(int start, int limit);
	List<Group> allGroups(int start, int limit);
	long allGroupsSize();
	Group newGroupWith(NewGroupCommand aCommand);
	void changeGroupName(ChangeGroupNameCommand aCommand);
	void removeGroup(RemoveGroupCommand aCommand);

}
