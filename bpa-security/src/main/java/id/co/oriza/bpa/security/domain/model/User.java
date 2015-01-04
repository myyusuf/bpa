package id.co.oriza.bpa.security.domain.model;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;

public class User extends ConcurrencySafeEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private String description;
	
	private ContactInformation contactInformation;

	public String username() {
		return username;
	}

	protected void setUsername(String aUsername) {
		this.username = aUsername;
	}

	protected void setPassword(String aPassword) {
		this.password = aPassword;
	}
	
	public User(){
		super();
	}

	public User(String aUsername, String aPassword, String aFirstName,
			String aLastName, String aDescription,
			ContactInformation aContactInformation) {
		super();
		this.setUsername(aUsername);
		this.protectPassword("", aPassword);
		this.setFirstName(aFirstName);
		this.setLastName(aLastName);
		this.setDescription(aDescription);
	}
	
	public void changePassword(String aCurrentPassword, String aChangedPassword) {
        this.assertArgumentNotEmpty(
                aCurrentPassword,
                "Current and new password must be provided.");

        this.assertArgumentEquals(
                this.password(),
                this.asEncryptedValue(aCurrentPassword),
                "Current password not confirmed.");

        this.protectPassword(aCurrentPassword, aChangedPassword);

    }

	public String firstName() {
		return firstName;
	}

	protected void setFirstName(String aFirstName) {
		this.firstName = aFirstName;
	}

	public String lastName() {
		return lastName;
	}

	protected void setLastName(String aLastName) {
		this.lastName = aLastName;
	}

	public String description() {
		return description;
	}

	protected void setDescription(String aDescription) {
		this.description = aDescription;
	}

	public ContactInformation contactInformation() {
		return contactInformation;
	}

	protected void setContactInformation(ContactInformation aContactInformation) {
		this.contactInformation = aContactInformation;
	}
	
	protected void protectPassword(String aCurrentPassword, String aChangedPassword) {
        this.assertPasswordsNotSame(aCurrentPassword, aChangedPassword);

        this.assertPasswordNotWeak(aChangedPassword);

        this.assertUsernamePasswordNotSame(aChangedPassword);

        this.setPassword(this.asEncryptedValue(aChangedPassword));
    }
	
	protected void assertPasswordsNotSame(String aCurrentPassword, String aChangedPassword) {
        this.assertArgumentNotEquals(
                aCurrentPassword,
                aChangedPassword,
                "The password is unchanged.");
    }

    protected void assertPasswordNotWeak(String aPlainTextPassword) {
        this.assertArgumentFalse(
                DomainRegistry.passwordService().isWeak(aPlainTextPassword),
                "The password must be stronger.");
    }

    protected void assertUsernamePasswordNotSame(String aPlainTextPassword) {
        this.assertArgumentNotEquals(
                this.username(),
                aPlainTextPassword,
                "The username and password must not be the same.");
    }

	protected String asEncryptedValue(String aPlainTextPassword) {
        String encryptedValue =
            DomainRegistry
                .encryptionService()
                .encryptedValue(aPlainTextPassword);

        return encryptedValue;
    }

	protected String password() {
		return password;
	}
	
	public void changeContactInformation(ContactInformation aContactInformation) {
		this.setContactInformation(aContactInformation);
	}
	
	public void changeFirstName(String aFirstName) {
		this.setFirstName(aFirstName);
	}

	public void changeLastName(String aLastName) {
		this.setLastName(aLastName);
	}

	public void changeDescription(String aDescription) {
		this.setDescription(aDescription);
	}

}