package id.co.oriza.bpa.security.interfaces.pm;

import id.co.oriza.bpa.security.domain.model.Role;

public class RolePresentationModel {

	private Role role;

	public RolePresentationModel(Role role) {
		super();
		this.role = role;
	}

	public String getCode() {
		return this.role.code();
	}

	public String getName() {
		return this.role.name();
	}

	public String getDescription() {
		return this.role.description();
	}

}
