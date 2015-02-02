package id.co.oriza.bpa.workflow.interfaces.ws.pm;

import id.co.oriza.bpa.workflow.domain.model.User;

public class UserPresentationModel {

	private User user;

	public UserPresentationModel(User user) {
		super();
		this.user = user;
	}

	public String getId() {
		return user.id();
	}

	public String getFirstName() {
		return user.firstName();
	}

	public String getLastName() {
		return user.lastName();
	}

	public String getEmail() {
		return user.email();
	}

	public String getPassword() {
		return user.password();
	}


}
