package id.co.oriza.bpa.workflow.domain.model;

import id.co.oriza.bpa.base.domain.model.AssertionConcern;

import java.io.Serializable;
import java.util.Date;

public class ProcessInstance extends AssertionConcern implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String id;
	private String businessKey;
	private String startedBy;
	private String startActivityId;
	private Date started;
	private String processDefinitionId;

	protected ProcessInstance() {
		super();
	}

	public ProcessInstance(String id, String businessKey, String startedBy,
			String startActivityId, Date started, String processDefinitionId) {
		this();
		this.setId(id);
		this.setBusinessKey(businessKey);
		this.setStartedBy(startedBy);
		this.setStartActivityId(startActivityId);
		this.setStarted(started);
		this.setProcessDefinitionId(processDefinitionId);
	}

	public String businessKey() {
		return businessKey;
	}

	public String startedBy() {
		return startedBy;
	}

	public String startActivityId() {
		return startActivityId;
	}

	public Date started() {
		return started;
	}

	protected void setBusinessKey(String businessKey) {
		this.businessKey = businessKey;
	}

	protected void setStartedBy(String startedBy) {
		this.startedBy = startedBy;
	}

	protected void setStartActivityId(String startActivityId) {
		this.startActivityId = startActivityId;
	}

	protected void setStarted(Date started) {
		this.started = started;
	}

	public String id() {
		return id;
	}

	protected void setId(String id) {
		this.id = id;
	}

	public String processDefinitionId() {
		return processDefinitionId;
	}

	protected void setProcessDefinitionId(String processDefinitionId) {
		this.processDefinitionId = processDefinitionId;
	}


}
