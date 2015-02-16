package id.co.oriza.bpa.workflow.infrastructure.services;

import id.co.oriza.bpa.workflow.application.AdministrationService;
import id.co.oriza.bpa.workflow.domain.model.ProcessInstance;
import id.co.oriza.bpa.workflow.domain.model.Task;
import id.co.oriza.bpa.workflow.domain.model.TaskVariable;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricTaskInstance;
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
			String processDefinitionId = activitiRunningProcessInstance.getProcessDefinitionId();
			ProcessInstance processInstance = new ProcessInstance(id, businessKey, startUserId, startActivityId, startTime, processDefinitionId);
			
			runningProcessInstances.add(processInstance);
		}
		
		return runningProcessInstances;
	}

	@Override
	public long allRunningProcessInstancesSize() {
		return processEngine.getHistoryService().createHistoricProcessInstanceQuery().unfinished().count();
	}

	@Override
	public List<Task> allProcessInstanceTasks(String processInstanceId,
			int start, int limit) {
		List<HistoricTaskInstance> historicTaskInstances = processEngine.getHistoryService().createHistoricTaskInstanceQuery()
	      .processInstanceId(processInstanceId)
	      .orderByHistoricTaskInstanceEndTime().desc()
	      .orderByHistoricTaskInstanceStartTime().desc()
	      .listPage(start, limit);
		
		List<Task> processInstanceTasks = new ArrayList<Task>(0);
		for (HistoricTaskInstance historicTaskInstance : historicTaskInstances) {
			
			Map<String, Object> activitiProcessVariables = historicTaskInstance.getProcessVariables();
			List<TaskVariable> taskVariables = new ArrayList<TaskVariable>(0);
			for (String activitiProcessVariable : activitiProcessVariables.keySet()) {
				TaskVariable taskVariable = new TaskVariable(activitiProcessVariable, activitiProcessVariables.get(activitiProcessVariable));
				taskVariables.add(taskVariable);
			}
			
			Task task = new Task(
					historicTaskInstance.getId(), 
					historicTaskInstance.getName(), 
					historicTaskInstance.getProcessDefinitionId(), 
					historicTaskInstance.getProcessInstanceId(),
					taskVariables);
			processInstanceTasks.add(task);
		}
		return processInstanceTasks;
	}

	@Override
	public long allProcessInstanceTasksSize(String processInstanceId) {
		return processEngine.getHistoryService().createHistoricTaskInstanceQuery()
	      .processInstanceId(processInstanceId).count();
	}

}
