package id.co.oriza.bpa.workflow.interfaces.ws.pm;

import id.co.oriza.bpa.workflow.domain.model.Task;

public class ProcessInstanceTaskModel {
	
	private Task task;
	
	public ProcessInstanceTaskModel(Task task){
		this.task = task;
	}
	
	public String getId() {
		return task.id();
	}
	public String getName() {
		return task.name();
	}
	public String getProcessDefinitionId() {
		return task.processDefinitionId();
	}
	public String getProcessInstanceId() {
		return task.processInstanceId();
	}
}
