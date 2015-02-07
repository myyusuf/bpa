package id.co.oriza.bpa.workflow.infrastructure.services;

import id.co.oriza.bpa.workflow.application.ChangeGroupNameCommand;
import id.co.oriza.bpa.workflow.application.ChangeUserInfoCommand;
import id.co.oriza.bpa.workflow.application.IdentityService;
import id.co.oriza.bpa.workflow.application.NewGroupCommand;
import id.co.oriza.bpa.workflow.application.NewUserCommand;
import id.co.oriza.bpa.workflow.application.RemoveGroupCommand;
import id.co.oriza.bpa.workflow.application.RemoveUserCommand;
import id.co.oriza.bpa.workflow.domain.model.Group;
import id.co.oriza.bpa.workflow.domain.model.User;

import java.util.ArrayList;
import java.util.List;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.identity.GroupQuery;
import org.activiti.engine.identity.UserQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

public class IdentityServiceActiviti implements IdentityService{
	
	@Autowired
	private ProcessEngine processEngine;

	@Override
	public List<User> allUsers(int start, int limit) {
		UserQuery userQuery = this.activitiIdentityService().createUserQuery();
		List<org.activiti.engine.identity.User> activitiUsers = userQuery.listPage(start, limit);
		List<User> users = new ArrayList<User>();
		for (org.activiti.engine.identity.User activitiUser : activitiUsers) {
			String id = activitiUser.getId();
			String firstName = activitiUser.getFirstName();
			String lastName = activitiUser.getLastName();
			String email = activitiUser.getEmail();
			String password = activitiUser.getPassword();
			User user = new User(id, firstName, lastName, email, password);
			
			GroupQuery groupQuery = this.activitiIdentityService().createGroupQuery();
			List<org.activiti.engine.identity.Group> activitiGroups = groupQuery.groupMember(id).list();
			for (org.activiti.engine.identity.Group activitiGroup : activitiGroups) {
				String groupId = activitiGroup.getId();
				String groupName = activitiGroup.getName();
				user.addGroup(new Group(groupId, groupName));
			}
			
			users.add(user);
		}
		return users;
	}
	
	@Override
	public long allUsersSize() {
		 UserQuery userQuery = this.activitiIdentityService().createUserQuery();
		return userQuery.count();
	}
	
	@Override
	public void newUserWith(NewUserCommand aCommand) {
		org.activiti.engine.identity.User newActivitiUser = this.activitiIdentityService().newUser(aCommand.getId());
		newActivitiUser.setPassword(aCommand.getPassword());
		newActivitiUser.setFirstName(aCommand.getFirstName());
		newActivitiUser.setLastName(aCommand.getLastName());
		newActivitiUser.setEmail(aCommand.getEmail());
		
		this.activitiIdentityService().saveUser(newActivitiUser);
	}
	
	@Override
	public void changeUserInfo(ChangeUserInfoCommand aCommand) {
		UserQuery userQuery = this.activitiIdentityService().createUserQuery();
		org.activiti.engine.identity.User activitiUser = userQuery.userId(aCommand.getId()).singleResult();
		activitiUser.setPassword(aCommand.getPassword());
		activitiUser.setFirstName(aCommand.getFirstName());
		activitiUser.setLastName(aCommand.getLastName());
		activitiUser.setEmail(aCommand.getEmail());
		
		this.activitiIdentityService().saveUser(activitiUser);
	}
	
	@Override
	public void removeUser(RemoveUserCommand aCommand) {
		this.activitiIdentityService().deleteUser(aCommand.getId());
	}
	
	@Override
	public List<Group> allUserGroups(final String id) {
		GroupQuery groupQuery = this.activitiIdentityService().createGroupQuery();
		List<org.activiti.engine.identity.Group> activitiGroups = groupQuery.groupMember(id).list();
		List<Group> groups = new ArrayList<Group>();
		for (org.activiti.engine.identity.Group activitiGroup : activitiGroups) {
			String groupId = activitiGroup.getId();
			String name = activitiGroup.getName();
			
			Group group = new Group(groupId, name);
			groups.add(group);
		}
		return groups;
	}
	
	@Override
	public List<Group> allGroups(int start, int limit) {
		GroupQuery groupQuery = this.activitiIdentityService().createGroupQuery();
		List<org.activiti.engine.identity.Group> activitiGroups = groupQuery.listPage(start, limit);
		List<Group> groups = new ArrayList<Group>();
		for (org.activiti.engine.identity.Group activitiGroup : activitiGroups) {
			String id = activitiGroup.getId();
			String name = activitiGroup.getName();
			
			Group group = new Group(id, name);
			groups.add(group);
		}
		return groups;
	}
	
	@Transactional
	@Override
	public void newGroupWith(NewGroupCommand aCommand){
		
		org.activiti.engine.identity.Group newActivitiGroup = this.activitiIdentityService().newGroup(aCommand.getId());
		newActivitiGroup.setName(aCommand.getName());
		newActivitiGroup.setType("assignment");
		
		this.activitiIdentityService().saveGroup(newActivitiGroup);
	}

	@Override
	public long allGroupsSize() {
		GroupQuery groupQuery = this.activitiIdentityService().createGroupQuery();
		return groupQuery.count();
	}

	@Override
	public void changeGroupName(ChangeGroupNameCommand aCommand) {
		GroupQuery groupQuery = this.activitiIdentityService().createGroupQuery();
		org.activiti.engine.identity.Group activitiGroup = groupQuery.groupId(aCommand.getId()).singleResult();
		activitiGroup.setName(aCommand.getName());
		this.activitiIdentityService().saveGroup(activitiGroup);
	}

	@Override
	public void removeGroup(RemoveGroupCommand aCommand) {
		this.activitiIdentityService().deleteGroup(aCommand.getId());
	}

	private org.activiti.engine.IdentityService activitiIdentityService(){
		return this.processEngine.getIdentityService();
	}

}
