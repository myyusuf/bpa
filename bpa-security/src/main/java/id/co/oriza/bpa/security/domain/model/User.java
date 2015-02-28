package id.co.oriza.bpa.security.domain.model;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;

import java.util.HashSet;
import java.util.Set;

public class User extends ConcurrencySafeEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String userId;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	
	private Set<Group> groups;

	public User(String userId, String firstName, String lastName, String email,
			String password) {
		this();
		this.setUserId(userId);
		this.setFirstName(firstName);
		this.setLastName(lastName);
		this.setEmail(email);
		this.setPassword(password);
	}

	protected User() {
		super();
		this.setGroups(new HashSet<Group>(0));
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
	
	public String userId() {
		return userId;
	}

	protected void setUserId(String userId) {
		this.userId = userId;
	}
	
	public void addGroup(Group aGroup){
		this.assertArgumentNotNull(aGroup, "Group must not be null");
		if(this.groups().add(aGroup)){
			//Domain Event
		}
	}
	
	public void addGroups(Set<Group> aGroups){
		this.assertArgumentNotNull(aGroups, "Groups must not be null");
		if(this.groups().addAll(aGroups)){
			//Domain Event
		}
	}

	public Set<Group> groups() {
		return groups;
	}

	protected void setGroups(Set<Group> groups) {
		this.groups = groups;
	}

}
