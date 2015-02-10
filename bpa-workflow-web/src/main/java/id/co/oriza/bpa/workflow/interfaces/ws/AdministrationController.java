package id.co.oriza.bpa.workflow.interfaces.ws;

import id.co.oriza.bpa.base.interfaces.ws.CommonController;
import id.co.oriza.bpa.workflow.application.AdministrationService;
import id.co.oriza.bpa.workflow.domain.model.ProcessInstance;
import id.co.oriza.bpa.workflow.domain.model.Task;
import id.co.oriza.bpa.workflow.interfaces.ws.pm.ProcessInstanceModel;
import id.co.oriza.bpa.workflow.interfaces.ws.pm.ProcessInstanceTaskModel;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AdministrationController extends CommonController{
	
	private static final int MAX_LIMIT = 10000;
	
	@Autowired
	private AdministrationService administrationService;
	
	@RequestMapping(value="/workflow/administration/runningprocessinstances", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allRunningProcessInstances(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		printParamsString(params);
		
		List<ProcessInstance> allRunningProcessInstances = administrationService.allRunningProcessInstances(start, limit);
		List<ProcessInstanceModel> processInstanceModels = new ArrayList<ProcessInstanceModel>();
		for (ProcessInstance processInstance : allRunningProcessInstances) {
			String id = processInstance.id();
			String businessKey = processInstance.businessKey();
			String startedBy = processInstance.startedBy();
			String startActivityId = processInstance.startActivityId();
			Date started = processInstance.started();
			ProcessInstanceModel processInstanceModel = new ProcessInstanceModel(id, businessKey, startedBy, startActivityId, started);
			processInstanceModels.add(processInstanceModel);
		}
		
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		long allRunningProcessInstancesSize = administrationService.allRunningProcessInstancesSize();
		result.put("num", allRunningProcessInstancesSize );
		result.put("data", processInstanceModels);
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workflow/administration/processinstancetasks", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allProcessInstanceTasks(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		String processInstanceId = params.get("processInstanceId") != null ? params.get("processInstanceId") : "";
		
		List<Task> allProcessInstanceTasks = administrationService.allProcessInstanceTasks(processInstanceId , start, limit);
		List<ProcessInstanceTaskModel> processInstanceTaskModels = new ArrayList<ProcessInstanceTaskModel>();
		for (Task task : allProcessInstanceTasks) {
			ProcessInstanceTaskModel processInstanceTaskModel = new ProcessInstanceTaskModel(task);
			processInstanceTaskModels.add(processInstanceTaskModel);
		}
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		long allProcessInstanceTasksSize = administrationService.allProcessInstanceTasksSize(processInstanceId);
		result.put("num", allProcessInstanceTasksSize);
		result.put("data", processInstanceTaskModels);
		result.put("success", true);
		
		return result;
	}

}
