package id.co.oriza.bpa.workflow.application;

import java.util.List;

public class ChangeUserInfoCommand {

	private String id;
	private String password;
	private String firstName;
	private String lastName;
	private String email;
	private List<String> groupIds;

	public ChangeUserInfoCommand(String id, String password, String firstName,
			String lastName, String email, List<String> groupIds) {
		super();
		this.id = id;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.groupIds = groupIds;
	}

	public String getId() {
		return id;
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

	public void setId(String id) {
		this.id = id;
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

	public List<String> getGroupIds() {
		return groupIds;
	}

	public void setGroupIds(List<String> groupIds) {
		this.groupIds = groupIds;
	}

}
