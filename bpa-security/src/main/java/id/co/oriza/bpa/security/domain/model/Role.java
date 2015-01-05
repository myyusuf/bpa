package id.co.oriza.bpa.security.domain.model;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;

public class Role extends ConcurrencySafeEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String code;
	private String name;
	private String description;

	public String code() {
		return code;
	}

	protected void setCode(String aCode) {
		this.code = aCode;
	}

	public String name() {
		return name;
	}

	protected void setName(String aName) {
		this.name = aName;
	}

	public Role(String aCode, String aName, String aDescription) {
		this();
		this.setCode(aCode);
		this.setName(aName);
		this.setDescription(aDescription);
	}
	
	public Role() {
		super();
	}

	public String description() {
		return description;
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
