package id.co.oriza.bpa.security.domain.model;

import id.co.oriza.bpa.base.domain.model.AssertionConcern;

import java.io.Serializable;

public class ContactInformation extends AssertionConcern implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String emailAddress;
	private String primaryTelephone;
	private String secondaryTelephone;
	private String streetAddress;
	
	public ContactInformation() {
		super();
	}
	
	public ContactInformation(String anEmailAddress, String aPrimaryTelephone,
			String aSecondaryTelephone, String aStreetAddress) {
		super();
		this.setEmailAddress(anEmailAddress);
		this.setPrimaryTelephone(aPrimaryTelephone);
		this.setSecondaryTelephone(aSecondaryTelephone);
		this.setStreetAddress(aStreetAddress);
	}
	
	public ContactInformation changeEmailAddress(String anEmailAddress){
		return new ContactInformation(anEmailAddress, this.primaryTelephone(), this.secondaryTelephone(), this.streetAddress());
	}
	
	public ContactInformation changeStrretAddress(String aStreetAddress){
		return new ContactInformation(this.emailAddress(), this.primaryTelephone(), this.secondaryTelephone(), aStreetAddress);
	}

	private void setEmailAddress(String anEmailAddress) {
		this.emailAddress = anEmailAddress;
	}

	private void setPrimaryTelephone(String aPrimaryTelephone) {
		this.primaryTelephone = aPrimaryTelephone;
	}

	private void setSecondaryTelephone(String aSecondaryTelephone) {
		this.secondaryTelephone = aSecondaryTelephone;
	}

	private void setStreetAddress(String aStreetAddress) {
		this.streetAddress = aStreetAddress;
	}

	public String emailAddress() {
		return emailAddress;
	}

	public String primaryTelephone() {
		return primaryTelephone;
	}

	public String secondaryTelephone() {
		return secondaryTelephone;
	}

	public String streetAddress() {
		return streetAddress;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((emailAddress == null) ? 0 : emailAddress.hashCode());
		result = prime
				* result
				+ ((primaryTelephone == null) ? 0 : primaryTelephone.hashCode());
		result = prime
				* result
				+ ((secondaryTelephone == null) ? 0 : secondaryTelephone
						.hashCode());
		result = prime * result
				+ ((streetAddress == null) ? 0 : streetAddress.hashCode());
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
		ContactInformation other = (ContactInformation) obj;
		if (emailAddress == null) {
			if (other.emailAddress != null)
				return false;
		} else if (!emailAddress.equals(other.emailAddress))
			return false;
		if (primaryTelephone == null) {
			if (other.primaryTelephone != null)
				return false;
		} else if (!primaryTelephone.equals(other.primaryTelephone))
			return false;
		if (secondaryTelephone == null) {
			if (other.secondaryTelephone != null)
				return false;
		} else if (!secondaryTelephone.equals(other.secondaryTelephone))
			return false;
		if (streetAddress == null) {
			if (other.streetAddress != null)
				return false;
		} else if (!streetAddress.equals(other.streetAddress))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ContactInformation [emailAddress=" + emailAddress
				+ ", primaryTelephone=" + primaryTelephone
				+ ", secondaryTelephone=" + secondaryTelephone
				+ ", streetAddress=" + streetAddress + "]";
	}

	
	
}
