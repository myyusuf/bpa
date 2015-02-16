package id.co.oriza.bpa.workflow.domain.model;

import id.co.oriza.bpa.base.domain.model.AssertionConcern;

import java.io.Serializable;
import java.util.List;

public class Task extends AssertionConcern implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
	private String name;
	private String processDefinitionId;
	private String processInstanceId;
	private List<TaskVariable> variables;
	
	protected Task() {
		super();
	}

	public Task(String id, String name, String processDefinitionId, String processInstanceId, List<TaskVariable> taskVariables) {
		this();
		this.setId(id);
		this.setName(name);
		this.setProcessDefinitionId(processDefinitionId);
		this.setProcessInstanceId(processInstanceId);
		this.setVariables(taskVariables);
	}

	public String id() {
		return id;
	}

	public String name() {
		return name;
	}

	public String processInstanceId() {
		return processInstanceId;
	}

	protected void setId(String id) {
		this.id = id;
	}

	protected void setName(String name) {
		this.name = name;
	}

	protected void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}

	public String processDefinitionId() {
		return processDefinitionId;
	}

	protected void setProcessDefinitionId(String processDefinitionId) {
		this.processDefinitionId = processDefinitionId;
	}

	public List<TaskVariable> variables() {
		return variables;
	}

	protected void setVariables(List<TaskVariable> variables) {
		this.variables = variables;
	}

}
