package id.co.oriza.bpa.workflow.interfaces.ws;

import id.co.oriza.bpa.workflow.application.TaskService;
import id.co.oriza.bpa.workflow.domain.model.ProcessDefinition;
import id.co.oriza.bpa.workflow.interfaces.ws.pm.ProcessDefinitionPresentationModel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
		List<ProcessDefinition> allProcessDefinitions = this.taskService().allProcessDefinitions(start, limit);
		for (ProcessDefinition processDefinition : allProcessDefinitions) {
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
