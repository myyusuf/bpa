package id.co.oriza.bpa.workflow.interfaces.ws.pm;

import id.co.oriza.bpa.workflow.domain.model.BpaProcessDefinition;

public class ProcessDefinitionPresentationModel {
	
	private BpaProcessDefinition processDefinition;
	
	public ProcessDefinitionPresentationModel(BpaProcessDefinition processDefinition){
		this.processDefinition = processDefinition;
	}
	
	public String getId() {
		return processDefinition.getId();
	}

	public String getKey() {
		return processDefinition.getKey();
	}

}
