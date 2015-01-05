package id.co.oriza.bpa.security.interfaces.pm;

import id.co.oriza.bpa.security.domain.model.User;

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

}
