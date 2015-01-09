package id.co.oriza.bpa.workflow.domain.model;

import java.io.Serializable;

public class ProcessDefinition implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String id;
	private String key;

	public ProcessDefinition(String id, String key) {
		super();
		this.id = id;
		this.key = key;
	}

	public String getId() {
		return id;
	}

	public String getKey() {
		return key;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
