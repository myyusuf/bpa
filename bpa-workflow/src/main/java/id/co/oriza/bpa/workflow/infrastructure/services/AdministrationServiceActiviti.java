package id.co.oriza.bpa.workflow.infrastructure.services;

import id.co.oriza.bpa.workflow.application.AdministrationService;
import id.co.oriza.bpa.workflow.domain.model.ProcessInstance;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.history.HistoricProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;

public class AdministrationServiceActiviti implements AdministrationService {
	
	@Autowired
	private ProcessEngine processEngine;
	
	@Override
	public List<ProcessInstance> allRunningProcessInstances(int start, int limit) {
		
		List<ProcessInstance> runningProcessInstances = new ArrayList<ProcessInstance>(0);
		List<HistoricProcessInstance> activitiRunningProcessInstances = processEngine.getHistoryService().createHistoricProcessInstanceQuery().unfinished().list();
		for (HistoricProcessInstance activitiRunningProcessInstance : activitiRunningProcessInstances) {
			String id = activitiRunningProcessInstance.getId();
			String businessKey = activitiRunningProcessInstance.getBusinessKey();
			String startUserId = activitiRunningProcessInstance.getStartUserId();
			String startActivityId = activitiRunningProcessInstance.getStartActivityId();
			Date startTime = activitiRunningProcessInstance.getStartTime();
			ProcessInstance processInstance = new ProcessInstance(id, businessKey, startUserId, startActivityId, startTime);
			
			runningProcessInstances.add(processInstance);
		}
		
		return runningProcessInstances;
	}

	@Override
	public long allRunningProcessInstancesSize() {
		return processEngine.getHistoryService().createHistoricProcessInstanceQuery().unfinished().count();
	}

}
