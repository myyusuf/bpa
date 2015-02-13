package id.co.oriza.bpa.workflow.interfaces.ws.pm;

import id.co.oriza.bpa.workflow.domain.model.Task;

import java.io.Serializable;

public class TaskModel implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Task task;

	public TaskModel(Task task) {
		this.task = task;
	}
	
	public String getId(){
		return task.id();
	}
	
	public String getName(){
		return task.name();
	}


}
