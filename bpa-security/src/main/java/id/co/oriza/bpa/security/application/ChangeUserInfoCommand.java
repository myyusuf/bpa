package id.co.oriza.bpa.security.application;

public class ChangeUserInfoCommand {

	private String username;
	private String firstName;
	private String lastName;
	private String description;

	public ChangeUserInfoCommand(String username, String firstName,
			String lastName, String description) {
		super();
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.description = description;
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
