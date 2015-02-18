package id.co.oriza.bpa.workflow.application;

import id.co.oriza.bpa.workflow.domain.model.BpaProcessDefinition;
import id.co.oriza.bpa.workflow.domain.model.Task;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.activiti.engine.repository.Deployment;

public interface TaskService {
	
	
	List<BpaProcessDefinition> allProcessDefinitions(int start, int limit);

	Long allProcessDefinitionsSize();

	String startProcess(String userId, String processDefinitionKey,
			Map<String, Object> params);

	InputStream getWorkflowDiagram(String processDefinitionId,
			String processInstanceId);

	List<Deployment> allDeployments(int start, int limit);
	Long allDeploymentsSize();
	void deleteDeployment(String deploymentId);
	void createDeployment(String name, String resourceName, InputStream inputStream);

	InputStream getResourceAsStream(String deploymentId, String resourceName);

	List<String> getDeploymentResourceNames(String deploymentId);

	InputStream getBpmnResourceAsStream(String deploymentId);

	InputStream getBpmnResourceAsStreamByProcessDefinitionId(String processDefinitionId);

	List<String> getHighLightedActivities(String processInstanceId);

	List<Task> queuedTasksByGroupId(String groupId, int start, int limit);
	long queuedTasksByGroupIdSize(String groupId);

	void claimTask(String userId, String taskId);

	List<Task> inboxTasksByUserId(String userId, int start, int limit);
	long inboxTasksByUserIdSize(String userId);
	
	void completeTask(String taskId, Map<String, Object> params);

}
