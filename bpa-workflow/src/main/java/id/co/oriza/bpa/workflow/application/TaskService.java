package id.co.oriza.bpa.workflow.application;

import id.co.oriza.bpa.workflow.domain.model.ProcessDefinition;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.activiti.engine.repository.Deployment;

public interface TaskService {
	
	
	List<ProcessDefinition> allProcessDefinitions(int start, int limit);

	Long allProcessDefinitionsSize();

	String startProcess(String userId, String processInstanceKey,
			Map<String, Object> params);

	InputStream getWorkflowDiagram(String processDefinitionId,
			String processInstanceId);

	List<Deployment> allDeployments(int start, int limit);
	Long allDeploymentsSize();
	void deleteDeployment(String deploymentId);
	void createDeployment(String resourceName, InputStream inputStream);

}
