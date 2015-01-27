package id.co.oriza.bpa.workflow.domain.model;

import java.io.Serializable;

public class User implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String userId;
	private String firstName;
	private String lastName;
	private String email;
	private String password;

	public User(String userId, String firstName, String lastName, String email,
			String password) {
		super();
		this.setUserId(userId);
		this.setFirstName(firstName);
		this.setLastName(lastName);
		this.setEmail(email);
		this.setPassword(password);
	}

	public String userId() {
		return userId;
	}

	protected void setUserId(String userId) {
		this.userId = userId;
	}

	public String firstName() {
		return firstName;
	}

	protected void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String lastName() {
		return lastName;
	}

	protected void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String email() {
		return email;
	}

	protected void setEmail(String email) {
		this.email = email;
	}

	public String password() {
		return password;
	}

	protected void setPassword(String password) {
		this.password = password;
	}
}
