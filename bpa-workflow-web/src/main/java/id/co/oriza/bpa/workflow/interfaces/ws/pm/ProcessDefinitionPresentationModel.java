package id.co.oriza.bpa.workflow.interfaces.ws.pm;

import id.co.oriza.bpa.workflow.domain.model.ProcessDefinition;

public class ProcessDefinitionPresentationModel {
	
	private ProcessDefinition processDefinition;
	
	public ProcessDefinitionPresentationModel(ProcessDefinition processDefinition){
		this.processDefinition = processDefinition;
	}
	
	public String getId() {
		return processDefinition.getId();
	}

	public String getKey() {
		return processDefinition.getKey();
	}

}
