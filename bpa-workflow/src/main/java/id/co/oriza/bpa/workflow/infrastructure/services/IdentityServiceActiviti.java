package id.co.oriza.bpa.workflow.infrastructure.services;

import java.util.ArrayList;
import java.util.List;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.identity.GroupQuery;
import org.activiti.engine.identity.UserQuery;
import org.springframework.beans.factory.annotation.Autowired;

import id.co.oriza.bpa.workflow.application.IdentityService;
import id.co.oriza.bpa.workflow.domain.model.Group;
import id.co.oriza.bpa.workflow.domain.model.User;

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
	
	private org.activiti.engine.IdentityService activitiIdentityService(){
		return this.processEngine.getIdentityService();
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

}
