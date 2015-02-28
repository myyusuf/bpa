package id.co.oriza.bpa.security.domain.model;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;

public class Group extends ConcurrencySafeEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String code;
	private String name;
	private String description;

	protected Group() {
		super();
	}

	public Group(String code, String name, String description) {
		this();
		this.setCode(code);
		this.setName(name);
		this.setDescription(description);
	}

	protected void setName(String name) {
		this.assertArgumentNotEmpty(name, "Name is required");
		this.name = name;
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

	protected void setCode(String code) {
		this.code = code;
	}

	protected void setDescription(String description) {
		this.description = description;
	}
	
	public void changeName(String aName){
		this.setName(aName);
	}

}
