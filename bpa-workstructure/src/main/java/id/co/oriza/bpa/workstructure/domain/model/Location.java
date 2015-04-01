package id.co.oriza.bpa.workstructure.domain.model;

import id.co.oriza.bpa.base.domain.model.IdentifiedValueObject;

public class Location extends IdentifiedValueObject {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String code;
	private String address;
	private String description;
	
	protected Location() {
		super();
	}

	public Location(String aCode, String anAddress, String aDescription) {
		this();
		this.setCode(aCode);
		this.setAddress(anAddress);
		this.setDescription(aDescription);
	}

	public String code() {
		return code;
	}

	public String address() {
		return address;
	}
	
	public String description() {
		return description;
	}

	protected void setCode(String aCode) {
		this.assertArgumentNotNull(aCode, "The code is required.");
		this.code = aCode;
	}

	protected void setAddress(String aAddress) {
		this.assertArgumentNotNull(aAddress, "The address is required.");
		this.address = aAddress;
	}
	
	protected void setDescription(String aDescription) {
		this.description = aDescription;
	}
	
	public void changeAddress(String anAddress) {
		this.setAddress(anAddress);
	}
	
	public void changeDescription(String aDescription) {
		this.setDescription(aDescription);
	}

}
