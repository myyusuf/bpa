package id.co.oriza.bpa.workstructure.domain.model;

import id.co.oriza.bpa.base.domain.model.IdentifiedValueObject;

public class Position extends IdentifiedValueObject {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String code;
	private String name;
	private String description;
	
	protected Position() {
		super();
	}

	public Position(String aCode, String aName, String aDescription) {
		this();
		this.setCode(aCode);
		this.setName(aName);
		this.setDescription(aDescription);
	}

	public String code() {
		return code;
	}

	public String name() {
		return name;
	}
	
	public String description() {
		return description;
	}

	protected void setCode(String aCode) {
		this.assertArgumentNotNull(aCode, "The code is required.");
		this.code = aCode;
	}

	protected void setName(String aName) {
		this.assertArgumentNotNull(aName, "The name is required.");
		this.name = aName;
	}
	
	protected void setDescription(String aDescription) {
		this.description = aDescription;
	}
	
	public void changeName(String aName) {
		this.setName(aName);
	}
	
	public void changeDescription(String aDescription) {
		this.setDescription(aDescription);
	}

}
