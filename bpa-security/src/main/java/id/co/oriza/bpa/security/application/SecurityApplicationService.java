package id.co.oriza.bpa.security.application;

import id.co.oriza.bpa.security.domain.model.Role;
import id.co.oriza.bpa.security.domain.model.RoleRepository;
import id.co.oriza.bpa.security.domain.model.User;
import id.co.oriza.bpa.security.domain.model.UserRepository;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class SecurityApplicationService {
	
final Logger logger = LoggerFactory.getLogger(SecurityApplicationService.class);
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Transactional(readOnly=true)
	public Collection<User> allSimilarlyNamedUsers(String aName, int aStart, int aLimit){
		Collection<User> users = this.userRepository().allSimilarlyNamedUsers(aName, aStart, aLimit);
		return users;
	}
	
	@Transactional(readOnly=true)
	public long allSimilarlyNamedUsersSize(String aName){
		long usersSize = this.userRepository().allSimilarlyNamedUsersSize(aName);
		return usersSize;
	}
	
	@Transactional
	public User newUserWith(NewUserCommand aCommand){
		
		String randomPassword = "admin123!";
		List<String> roleCodes = aCommand.getRoleCodes();
		
		Set<Role> roles = new HashSet<Role>();
		if(roleCodes != null){
			for (String roleCode : roleCodes) {
				Role role = this.roleRepository().roleWithCode(roleCode);
				roles.add(role);
			}
		}
		
		User user = new User(aCommand.getUsername(), randomPassword, aCommand.getFirstName(), aCommand.getLastName(), 
				aCommand.getDescription(), null, roles);
		this.userRepository().add(user);
		
		return user;
	}
	
	@Transactional
	public void changeUserInfo(ChangeUserInfoCommand aCommand){
		User user = this.existingUser(aCommand.getUsername());
		user.changeFirstName(aCommand.getFirstName());
		user.changeLastName(aCommand.getLastName());
		user.changeDescription(aCommand.getDescription());
		
		List<String> roleCodes = aCommand.getRoleCodes();
		Set<Role> roles = new HashSet<Role>();
		if(roleCodes != null){
			for (String roleCode : roleCodes) {
				Role role = this.roleRepository().roleWithCode(roleCode);
				roles.add(role);
			}
		}
		
		user.changeRoles(roles);
	}
	
	@Transactional
	public void removeUser(RemoveUserCommand aCommand){
		User user = this.existingUser(aCommand.getUsername());
		this.userRepository().remove(user);
	}
	
	@Transactional(readOnly=true)
	public Collection<Role> allSimilarlyNamedRoles(String aName, int aStart, int aLimit){
		Collection<Role> roles = this.roleRepository().allSimilarlyNamedRoles(aName, aStart, aLimit);
		return roles;
	}
	
	@Transactional(readOnly=true)
	public long allSimilarlyNamedRolesSize(String aName){
		long rolesSize = this.roleRepository().allSimilarlyNamedRolesSize(aName);
		return rolesSize;
	}
	
	@Transactional
	public Role newRoleWith(NewRoleCommand aCommand){
		
		Role role = new Role(aCommand.getCode(), aCommand.getName(), aCommand.getDescription());
		this.roleRepository().add(role);
		
		return role;
	}
	
	@Transactional
	public void changeRoleInfo(ChangeRoleInfoCommand aCommand){
		Role role = this.existingRole(aCommand.getCode());
		role.changeName(aCommand.getName());
		role.changeDescription(aCommand.getDescription());
	}
	
	@Transactional
	public void removeRole(RemoveRoleCommand aCommand){
		Role role = this.existingRole(aCommand.getCode());
		this.roleRepository().remove(role);
	}
	
	private User existingUser(String aUsername) {
		User user = this.user(aUsername);
		
		if(user == null){
			throw new IllegalArgumentException("User does not exist for : " + aUsername);
		}
		return user;
	}
	
	private Role existingRole(String aCode) {
		Role role = this.role(aCode);
		
		if(role == null){
			throw new IllegalArgumentException("Role does not exist for : " + aCode);
		}
		return role;
	}

	private User user(String aUsername) {
		User user = this.userRepository().userWithUsername(aUsername);
		return user;
	}
	
	private Role role(String aCode) {
		Role role = this.roleRepository().roleWithCode(aCode);
		return role;
	}

	public UserRepository userRepository() {
		return userRepository;
	}

	public RoleRepository roleRepository() {
		return roleRepository;
	}

}
