package id.co.oriza.bpa.security.application;

import java.util.List;

public class ChangeUserInfoCommand {

	private String userId;
	private String password;
	private String firstName;
	private String lastName;
	private String email;
	private List<String> groupCodes;

	public ChangeUserInfoCommand(String userId, String password, String firstName,
			String lastName, String email, List<String> groupCodes) {
		super();
		this.userId = userId;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.groupCodes = groupCodes;
	}

	public String getUserId() {
		return userId;
	}

	public String getPassword() {
		return password;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<String> getGroupCodes() {
		return groupCodes;
	}

	public void setGroupCodes(List<String> groupCodes) {
		this.groupCodes = groupCodes;
	}

}
