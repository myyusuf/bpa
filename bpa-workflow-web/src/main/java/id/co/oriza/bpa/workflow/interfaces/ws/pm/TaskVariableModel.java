package id.co.oriza.bpa.workflow.interfaces.ws.pm;

import id.co.oriza.bpa.workflow.domain.model.TaskVariable;

import java.io.Serializable;

public class TaskVariableModel implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private TaskVariable taskVariable;

	public TaskVariableModel(TaskVariable taskVariable) {
		super();
		this.taskVariable = taskVariable;
	}
	
	public String getName(){
		return this.taskVariable.name();
	}
	
	public Object getValue(){
		return this.taskVariable.value();
	}

}
