package id.co.oriza.bpa.workflow.application;

import id.co.oriza.bpa.workflow.domain.model.ProcessInstance;

import java.util.List;

public interface AdministrationService {
	
	List<ProcessInstance> allRunningProcessInstances(int start, int limit);
	long allRunningProcessInstancesSize();
}
