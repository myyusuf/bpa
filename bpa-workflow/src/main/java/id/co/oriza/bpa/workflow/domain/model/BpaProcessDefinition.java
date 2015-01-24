package id.co.oriza.bpa.workflow.domain.model;

import java.io.Serializable;

public class BpaProcessDefinition implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String id;
	private String key;
	private String name;
	private String resourceName;
	private String deploymentId;
	
	protected BpaProcessDefinition(){
		super();
	}

	public BpaProcessDefinition(String id, String key, String name,
			String resourceName, String deploymentId) {
		this();
		this.id = id;
		this.key = key;
		this.name = name;
		this.resourceName = resourceName;
		this.deploymentId = deploymentId;
	}


	public String id() {
		return id;
	}

	public String key() {
		return key;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String name() {
		return name;
	}

	public String resourceName() {
		return resourceName;
	}

	public String deploymentId() {
		return deploymentId;
	}

}
