package id.co.oriza.bpa.workflow.domain.model;

import id.co.oriza.bpa.base.domain.model.AssertionConcern;

import java.io.Serializable;

public class TaskVariable extends AssertionConcern implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String name;
	private Object value;

	protected TaskVariable() {
		super();
	}

	public TaskVariable(String name, Object value) {
		this();
		this.setName(name);
		this.setValue(value);
	}

	public String name() {
		return name;
	}

	public Object value() {
		return value;
	}

	protected void setName(String name) {
		this.name = name;
	}

	protected void setValue(Object value) {
		this.value = value;
	}

}
