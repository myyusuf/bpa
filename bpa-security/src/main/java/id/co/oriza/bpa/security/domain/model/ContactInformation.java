package id.co.oriza.bpa.security.domain.model;

import id.co.oriza.bpa.base.domain.model.AssertionConcern;

import java.io.Serializable;

public class ContactInformation extends AssertionConcern implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String email;
	private String primaryTelephone;
	private String secondaryTelephone;
	private String streetAddress;
	
	public ContactInformation(String anEmail, String aPrimaryTelephone,
			String aSecondaryTelephone, String aStreetAddress) {
		super();
		this.setEmail(anEmail);
		this.setPrimaryTelephone(aPrimaryTelephone);
		this.setSecondaryTelephone(aSecondaryTelephone);
		this.setStreetAddress(aStreetAddress);
	}

	public void setEmail(String anEmail) {
		this.email = anEmail;
	}

	public void setPrimaryTelephone(String aPrimaryTelephone) {
		this.primaryTelephone = aPrimaryTelephone;
	}

	public void setSecondaryTelephone(String aSecondaryTelephone) {
		this.secondaryTelephone = aSecondaryTelephone;
	}

	public void setStreetAddress(String aStreetAddress) {
		this.streetAddress = aStreetAddress;
	}
	
	

}
