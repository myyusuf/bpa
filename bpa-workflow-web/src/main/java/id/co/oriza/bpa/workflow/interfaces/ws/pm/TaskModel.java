package id.co.oriza.bpa.workflow.interfaces.ws.pm;

import id.co.oriza.bpa.workflow.domain.model.Task;
import id.co.oriza.bpa.workflow.domain.model.TaskVariable;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

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
	
	public List<TaskVariableModel> getVariables(){
		List<TaskVariable> variables = task.variables();
		List<TaskVariableModel> variableModels = new ArrayList<TaskVariableModel>(0);
		for (TaskVariable taskVariable : variables) {
			TaskVariableModel variableModel = new TaskVariableModel(taskVariable);
			variableModels.add(variableModel);
		}
		
		return variableModels;
	}


}
