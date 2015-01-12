package id.co.oriza.bpa.workflow.application;

import id.co.oriza.bpa.workflow.domain.model.ProcessDefinition;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

public interface TaskService {
	
	List<ProcessDefinition> getProcessDefinitions(int start, int limit);

	Long getProcessDefinitionsCount();

	String startProcess(String userId, String processInstanceKey,
			Map<String, Object> params);

	InputStream getWorkflowDiagram(String processDefinitionId,
			String processInstanceId);

	void getDeployments();

}
