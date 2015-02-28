package id.co.oriza.bpa.security.application;

public class RemoveUserCommand {

	private String userId;

	public RemoveUserCommand(String userId) {
		super();
		this.userId = userId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

}
