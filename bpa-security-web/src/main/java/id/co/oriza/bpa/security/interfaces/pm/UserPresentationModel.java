package id.co.oriza.bpa.security.interfaces.pm;

import id.co.oriza.bpa.security.domain.model.Role;
import id.co.oriza.bpa.security.domain.model.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class UserPresentationModel {

	private User user;

	public UserPresentationModel(User user) {
		super();
		this.user = user;
	}

	public String getUsername() {
		return this.user.username();
	}

	public String getFirstName() {
		return this.user.firstName();
	}

	public String getLastName() {
		return this.user.lastName();
	}

	public String getDescription() {
		return this.user.description();
	}
	
	public List<Map<String, String>> getRoles(){
		List<Map<String, String>> rolesMap = new ArrayList<Map<String,String>>(0);
		Set<Role> roles = this.user.roles();
		for (Role role : roles) {
			Map<String, String> roleMap = new HashMap<String, String>();
			roleMap.put("code", role.code());
			roleMap.put("name", role.name());
			rolesMap.add(roleMap);
		}
		
		return rolesMap;
		
	}

}
