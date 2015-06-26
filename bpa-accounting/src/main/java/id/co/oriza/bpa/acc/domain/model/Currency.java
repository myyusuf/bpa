package id.co.oriza.bpa.acc.domain.model;

import id.co.oriza.bpa.base.domain.model.Entity;

public class Currency extends Entity {

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

	public String name() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	protected void setCode(String aCode) {
		this.assertArgumentNotEmpty(aCode, "The Code is required.");
		this.code = aCode;
	}

	protected void setName(String aName) {
		this.assertArgumentNotEmpty(aName, "The Name is required.");
		this.name = aName;
	}

	protected void setDescription(String aDescription) {
		this.description = aDescription;
	}

}
