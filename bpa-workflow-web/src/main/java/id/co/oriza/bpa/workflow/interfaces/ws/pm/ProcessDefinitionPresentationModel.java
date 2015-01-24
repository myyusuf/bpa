package id.co.oriza.bpa.workflow.interfaces.ws.pm;

import id.co.oriza.bpa.workflow.domain.model.BpaProcessDefinition;

public class ProcessDefinitionPresentationModel {
	
	private BpaProcessDefinition processDefinition;
	
	public ProcessDefinitionPresentationModel(BpaProcessDefinition processDefinition){
		this.processDefinition = processDefinition;
	}
	
	public String getId() {
		return processDefinition.id();
	}

	public String getKey() {
		return processDefinition.key();
	}
	
	public String getName() {
		return processDefinition.name();
	}
	
	public String getDeploymentId() {
		return processDefinition.deploymentId();
	}
	
	public String getResourceName() {
		return processDefinition.resourceName();
	}

}
