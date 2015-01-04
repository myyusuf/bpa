package id.co.oriza.bpa.security.application;

public class RemoveUserCommand {

	private String username;

	public RemoveUserCommand(String username) {
		super();
		this.username = username;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
