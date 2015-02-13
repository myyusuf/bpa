package id.co.oriza.bpa.workflow.interfaces.ws;

import id.co.oriza.bpa.base.interfaces.ws.CommonController;
import id.co.oriza.bpa.workflow.application.TaskService;
import id.co.oriza.bpa.workflow.application.WorkflowUserAccessor;
import id.co.oriza.bpa.workflow.domain.model.Task;
import id.co.oriza.bpa.workflow.interfaces.ws.pm.TaskModel;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class TaskController extends CommonController{
	
	private static final int MAX_LIMIT = 10000;
	
	final Logger logger = LoggerFactory.getLogger(TaskController.class);
	
	@Autowired
	private TaskService taskService;
	
	@Autowired(required=false)
	private WorkflowUserAccessor workflowUserAccessor;
	
	@RequestMapping(value="/workflow/task/queueds", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allQueuedTasks(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		printParamsString(params);
		
		List<TaskModel> taskModels = new ArrayList<TaskModel>();
		
		String groupId = workflowUserAccessor.getActiveUserGroup();
		
		Collection<Task> queuedTasks = this.taskService().queuedTasksByGroupId(groupId, start, limit);
		for (Task task : queuedTasks) {
			TaskModel taskModel = new TaskModel(task);
			taskModels.add(taskModel);
		}
		
		Long queuedTasksSize = this.taskService().queuedTasksByGroupIdSize(groupId);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", queuedTasksSize);
		result.put("data", taskModels);
		result.put("success", true);
		
		return result;
	}

	public TaskService taskService() {
		return taskService;
	}

}
