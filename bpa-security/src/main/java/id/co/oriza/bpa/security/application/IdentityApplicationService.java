package id.co.oriza.bpa.security.application;

import id.co.oriza.bpa.security.domain.model.Group;
import id.co.oriza.bpa.security.domain.model.GroupRepository;
import id.co.oriza.bpa.security.domain.model.User;
import id.co.oriza.bpa.security.domain.model.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

public class IdentityApplicationService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private GroupRepository groupRepository;
	
	public List<User> allUsers(int start, int limit) {
		return this.userRepository().all(start, limit);
	}
	
	public long allUsersSize() {
		return this.userRepository().allSize();
	}
	
	public void newUserWith(NewUserCommand aCommand) {
		User user = new User(aCommand.getUserId(), aCommand.getFirstName(), aCommand.getLastName(), aCommand.getEmail(), aCommand.getPassword());
		this.userRepository().add(user);
		
	}
	
	public void changeUserInfo(ChangeUserInfoCommand aCommand) {
		User user = this.userRepository().userWithUserId(aCommand.getUserId());
		user.changeFirstName(aCommand.getFirstName());
		user.changeLastName(aCommand.getLastName());
		user.changeEmail(aCommand.getEmail());
		
	}
	
	public void removeUser(RemoveUserCommand aCommand) {
		User user = this.userRepository().userWithUserId(aCommand.getUserId());
		this.userRepository().remove(user);
	}
	
	public List<Group> allUserGroups(final String userId) {
		List<Group> groups = this.groupRepository().allGroupsWithUser(userId);
		return groups;
	}
	
	public List<Group> allGroups(int start, int limit) {
		return this.groupRepository().all(start, limit);
	}
	
	@Transactional
	public void newGroupWith(NewGroupCommand aCommand){
		Group group = new Group(aCommand.getCode(), aCommand.getName(), aCommand.getDescription());
		this.groupRepository().add(group);
	}

	public long allGroupsSize() {
		return this.groupRepository().allSize();
	}

	public void changeGroupName(ChangeGroupNameCommand aCommand) {
		Group group = this.groupRepository().existingGroup(aCommand.getCode());
		group.changeName(aCommand.getName());
	}

	public void removeGroup(RemoveGroupCommand aCommand) {
		this.groupRepository().remove(aCommand.getCode());
	}

	public UserRepository userRepository() {
		return userRepository;
	}

	public GroupRepository groupRepository() {
		return groupRepository;
	}
	

}
