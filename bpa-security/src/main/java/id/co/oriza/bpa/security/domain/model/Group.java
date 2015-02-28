package id.co.oriza.bpa.security.domain.model;

import id.co.oriza.bpa.base.domain.model.AssertionConcern;

import java.io.Serializable;

public class Group extends AssertionConcern implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String id;
	private String name;

	protected Group() {
		super();
	}

	public Group(String id, String name) {
		this();
		this.setId(id);
		this.setName(name);
	}

	public String id() {
		return id;
	}

	protected void setId(String id) {
		this.assertArgumentNotEmpty(id, "Id is required");
		this.id = id;
	}

	public String name() {
		return name;
	}

	protected void setName(String name) {
		this.assertArgumentNotEmpty(name, "Name is required");
		this.name = name;
	}

}
