package id.co.oriza.bpa.security.application;

import java.util.List;

public class NewUserCommand {

	private String username;
	private String firstName;
	private String lastName;
	private String description;
	private List<String> roleCodes;

	public NewUserCommand(String username, String firstName, String lastName,
			String description, List<String> roleCodes) {
		super();
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.description = description;
		this.roleCodes = roleCodes;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<String> getRoleCodes() {
		return roleCodes;
	}

	public void setRoleCodes(List<String> roleCodes) {
		this.roleCodes = roleCodes;
	}

}
