package id.co.oriza.bpa.security.application;

import id.co.oriza.bpa.security.domain.model.Group;
import id.co.oriza.bpa.security.domain.model.User;

import java.util.List;

public interface IdentityService {
	
	List<User> allUsers(int start, int limit);
	long allUsersSize();
	void newUserWith(NewUserCommand aCommand);
	void changeUserInfo(ChangeUserInfoCommand aCommand);
	void removeUser(RemoveUserCommand aCommand);
	List<Group> allUserGroups(String id);
	
	List<Group> allGroups(int start, int limit);
	long allGroupsSize();
	void newGroupWith(NewGroupCommand aCommand);
	void changeGroupName(ChangeGroupNameCommand aCommand);
	void removeGroup(RemoveGroupCommand aCommand);
	

}
