package id.co.oriza.bpa.workflow.interfaces.ws.pm;

import id.co.oriza.bpa.workflow.domain.model.ProcessInstance;

import java.io.Serializable;
import java.util.Date;

public class ProcessInstanceModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private ProcessInstance processInstance;

	public ProcessInstanceModel(ProcessInstance processInstance) {
		super();
		this.processInstance = processInstance;
	}

	public String getId() {
		return processInstance.id();
	}

	public String getBusinessKey() {
		return processInstance.businessKey();
	}

	public String getStartedBy() {
		return processInstance.startedBy();
	}

	public String getStartActivityId() {
		return processInstance.startActivityId();
	}

	public Date getStarted() {
		return processInstance.started();
	}
	
	public String getProcessDefinitionId(){
		return processInstance.processDefinitionId();
	}

	

}
