package id.co.oriza.bpa.itrack.domain.model;

import id.co.oriza.bpa.base.domain.model.AssertionConcern;

import java.io.Serializable;

public class User extends AssertionConcern implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String id;
	private String firstName;
	private String lastName;
	private String email;
	private String password;


	public User(String id, String firstName, String lastName, String email,
			String password) {
		this();
		this.setId(id);
		this.setFirstName(firstName);
		this.setLastName(lastName);
		this.setEmail(email);
		this.setPassword(password);
	}

	protected User() {
		super();
	}

	public String id() {
		return id;
	}

	protected void setId(String id) {
		this.assertArgumentNotEmpty(id, "Id is required");
		this.id = id;
	}

	public String firstName() {
		return firstName;
	}

	protected void setFirstName(String firstName) {
		this.assertArgumentNotEmpty(firstName, "First Name is required");
		this.firstName = firstName;
	}

	public void changeFirstName(String firstName) {
		this.setFirstName(firstName);
	}

	public String lastName() {
		return lastName;
	}

	protected void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void changeLastName(String lastName) {
		this.setLastName(lastName);
	}

	public String email() {
		return email;
	}

	protected void setEmail(String email) {
		this.assertArgumentNotEmpty(email, "Email is required");
		this.email = email;
	}

	public void changeEmail(String email) {
		this.setEmail(email);
	}

	public String password() {
		return password;
	}

	protected void setPassword(String password) {
		this.assertArgumentNotEmpty(password, "Password is required");
		this.password = password;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
