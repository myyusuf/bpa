package id.co.oriza.bpa.workflow.application;

import id.co.oriza.bpa.workflow.domain.model.ProcessInstance;
import id.co.oriza.bpa.workflow.domain.model.Task;

import java.util.List;

public interface AdministrationService {
	
	List<ProcessInstance> allRunningProcessInstances(int start, int limit);
	long allRunningProcessInstancesSize();
	
	List<Task> allProcessInstanceTasks(String processInstanceId , int start, int limit);
	long allProcessInstanceTasksSize(String processInstanceId);
}
