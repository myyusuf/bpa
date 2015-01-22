package id.co.oriza.bpa.workflow.infrastructure.services;


import id.co.oriza.bpa.workflow.application.TaskService;
import id.co.oriza.bpa.workflow.domain.model.ProcessDefinition;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.IdentityService;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.impl.bpmn.diagram.ProcessDiagramGenerator;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;

public class TaskServiceActiviti implements TaskService {
	
	@Autowired
	private ProcessEngine processEngine;

	@Autowired
	private RuntimeService runtimeService;
	
	RepositoryService repositoryService;
	
	@Override
	public void createDeployment(String name, String resourceName, InputStream inputStream) {
		repositoryService = processEngine.getRepositoryService();
		repositoryService.createDeployment()
				.addInputStream(resourceName, inputStream)
				.name(name)
				.deploy();
	}

	@Override
	public void deleteDeployment(String deploymentId) {
		repositoryService = processEngine.getRepositoryService();
		repositoryService.deleteDeployment(deploymentId);
		
	}

	@Override
	public List<Deployment> allDeployments(int start, int limit){
		
		List<Deployment> deployments = processEngine.getRepositoryService().createDeploymentQuery().listPage(start, limit);
		
		for (Deployment deployment : deployments) {
			System.out.println(deployment.getId());
		}
		
		return deployments;
	}
	
	@Override
	public Long allDeploymentsSize() {
		long count = processEngine.getRepositoryService().createDeploymentQuery().count();
		return count;
	}

	@Override
	public List<ProcessDefinition> allProcessDefinitions(int start, int limit) {
		List<ProcessDefinition> processList = new ArrayList<ProcessDefinition>();
		
		List<org.activiti.engine.repository.ProcessDefinition> processDefinitionList = processEngine.getRepositoryService()
				.createProcessDefinitionQuery().listPage(start, limit);
		for (org.activiti.engine.repository.ProcessDefinition processDefinition : processDefinitionList) {
			ProcessDefinition process = new ProcessDefinition(processDefinition.getId(), processDefinition.getKey());
			processList.add(process);
		}
		
		return processList;
	}

	@Override
	public Long allProcessDefinitionsSize() {
		long count = processEngine.getRepositoryService()
		.createProcessDefinitionQuery().count();
		return count;
	}


	@Override
	public String startProcess(String userId, String processInstanceKey, Map<String, Object> params) {
		
		
		IdentityService identityService = processEngine.getIdentityService();
		identityService.setAuthenticatedUserId(userId);
		
		ProcessInstance processInstance = runtimeService
				.startProcessInstanceByKey(processInstanceKey, params);
		
		// Add candidate group
//		org.activiti.engine.TaskService taskService = processEngine.getTaskService();
//		Task task = taskService.createTaskQuery().processInstanceId(processInstance.getProcessInstanceId()).singleResult();
//		taskService.addCandidateGroup(task.getId(), groupId);
		//------------------------
		
		String processInstanceId = processInstance.getId();
		return processInstanceId;
				
	}
	
	@Override
	public InputStream getResourceAsStream(String deploymentId, String resourceName) {
		repositoryService = processEngine.getRepositoryService();
		return repositoryService.getResourceAsStream(deploymentId, resourceName);
	}
	
	@Override
	public List<String> getDeploymentResourceNames(String deploymentId) {
		repositoryService = processEngine.getRepositoryService();
		return repositoryService.getDeploymentResourceNames(deploymentId);
	}
	
	
	@Override
	public InputStream getWorkflowDiagram(String processDefinitionId, String processInstanceId){
		
		org.activiti.engine.TaskService taskService = processEngine.getTaskService();
		
		if(processDefinitionId == null){
			Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).singleResult();
			processDefinitionId = task.getProcessDefinitionId();
		}
		
		RepositoryService repositoryService = processEngine.getRepositoryService();
		List<String> historicActivityInstanceList = new ArrayList<String>();
		List<String> highLightedActivities = runtimeService.getActiveActivityIds(processInstanceId);
//		historicActivityInstanceList.addAll(highLightedActivities);
		
//		List<String> highLightedFlows = new ArrayList<String>();
		getHighLightedFlows(processInstanceId, highLightedActivities);
		historicActivityInstanceList.addAll(highLightedActivities);
				
		BpmnModel bpmnModel = repositoryService.getBpmnModel(processDefinitionId);
		InputStream is = ProcessDiagramGenerator.generateDiagram(bpmnModel, "png", historicActivityInstanceList);
		
		return is;
	}
	
	private void getHighLightedFlows(String processInstanceId, List<String> historicActivityInstanceList) {
		
			List<HistoricActivityInstance> historicActivityInstances = processEngine.getHistoryService().
				createHistoricActivityInstanceQuery().processInstanceId(processInstanceId).
				orderByHistoricActivityInstanceStartTime().asc().list();
		 
			for (HistoricActivityInstance hai : historicActivityInstances) {
				historicActivityInstanceList.add(hai.getActivityId());
			}
		 
			// add current activities to list
			List<String> highLightedActivities = runtimeService.getActiveActivityIds(processInstanceId);
			historicActivityInstanceList.addAll(highLightedActivities);
		 
			// activities and their sequence-flows
//			getHighLightedFlows(processDefinition.getActivities(), historicActivityInstanceList, highLightedFlows);
		 
	}


}
