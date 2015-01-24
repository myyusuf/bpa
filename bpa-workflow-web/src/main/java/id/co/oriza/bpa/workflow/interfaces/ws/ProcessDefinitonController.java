package id.co.oriza.bpa.workflow.interfaces.ws;

import id.co.oriza.bpa.workflow.application.TaskService;
import id.co.oriza.bpa.workflow.domain.model.BpaProcessDefinition;
import id.co.oriza.bpa.workflow.interfaces.ws.pm.ProcessDefinitionPresentationModel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ProcessDefinitonController {
	
	private static final int MAX_LIMIT = 10000;
	
	@Autowired
	private TaskService taskService;

	@RequestMapping(value="/workflow/processdefinitions", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allProcessDefinitions(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		printParamsString(params);
		
		List<ProcessDefinitionPresentationModel> processDefinitionModels = new ArrayList<ProcessDefinitionPresentationModel>();
		List<BpaProcessDefinition> allProcessDefinitions = this.taskService().allProcessDefinitions(start, limit);
		for (BpaProcessDefinition processDefinition : allProcessDefinitions) {
			ProcessDefinitionPresentationModel processDefinitionPresentationModel = new ProcessDefinitionPresentationModel(processDefinition);
			processDefinitionModels.add(processDefinitionPresentationModel);
		}
		
		Long processDefinitionsSize = this.taskService().allProcessDefinitionsSize();
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", processDefinitionsSize);
		result.put("data", processDefinitionModels);
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workflow/processdefinitions/startprocess", method=RequestMethod.PUT, produces="application/json")
	public Map<String, Object> startProcess(@RequestBody(required=false) Map<String, Object> params){
		
		
		printParams(params);
		
		String processDefinitionKey = (String) params.get("processDefinitionKey");
		this.taskService().startProcess("kermit", processDefinitionKey, new HashMap<String, Object>());
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	private void printParams(Map<String, Object> params){
		List<String> listKeys = new ArrayList<String>(params.keySet());
		for (String key : listKeys) {
			System.out.println("key : " + key + ", value : " + params.get(key));
		}
	}
	
	private void printParamsString(Map<String, String> params){
		List<String> listKeys = new ArrayList<String>(params.keySet());
		for (String key : listKeys) {
			System.out.println("key : " + key + ", value : " + params.get(key));
		}
	}

	public TaskService taskService() {
		return taskService;
	}

}
