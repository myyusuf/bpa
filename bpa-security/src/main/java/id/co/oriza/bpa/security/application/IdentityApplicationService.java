package id.co.oriza.bpa.security.application;

import id.co.oriza.bpa.security.domain.model.Group;
import id.co.oriza.bpa.security.domain.model.GroupRepository;
import id.co.oriza.bpa.security.domain.model.User;
import id.co.oriza.bpa.security.domain.model.UserRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
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
		
		List<Group> groups = this.groupRepository().withCodes(aCommand.getGroupCodes());
		user.addGroups(new HashSet<Group>(groups));
		this.userRepository().add(user);
		
	}
	
	public void changeUserInfo(ChangeUserInfoCommand aCommand) {
		User user = this.userRepository().userWithUserId(aCommand.getUserId());
		user.changeFirstName(aCommand.getFirstName());
		user.changeLastName(aCommand.getLastName());
		user.changeEmail(aCommand.getEmail());
		
		List<Group> groups = this.groupRepository().withCodes(aCommand.getGroupCodes());
		user.groups().clear();
		user.addGroups(new HashSet<Group>(groups));
		
	}
	
	public void removeUser(RemoveUserCommand aCommand) {
		User user = this.userRepository().userWithUserId(aCommand.getUserId());
		this.userRepository().remove(user);
	}
	
	public List<Group> allUserGroups(final String userId) {
		User user = this.userRepository().userWithUserId(userId);
		List<Group> result = new ArrayList<Group>(0);
		result.addAll(user.groups());
		return result;
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

	public void changeGroupInfo(ChangeGroupInfoCommand aCommand) {
		Group group = this.groupRepository().existingGroup(aCommand.getCode());
		group.changeName(aCommand.getName());
		group.changeDescription(aCommand.getDescription());
	}

	public void removeGroup(RemoveGroupCommand aCommand) {
		Group group = this.groupRepository().existingGroup(aCommand.getCode());
		this.groupRepository().remove(group);
	}

	public UserRepository userRepository() {
		return userRepository;
	}

	public GroupRepository groupRepository() {
		return groupRepository;
	}
	

}
