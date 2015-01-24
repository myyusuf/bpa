package id.co.oriza.bpa.workflow.domain.model;

import java.io.Serializable;

public class BpaProcessDefinition implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String id;
	private String key;
	
	protected BpaProcessDefinition(){
		super();
	}

	public BpaProcessDefinition(String id, String key) {
		this();
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
