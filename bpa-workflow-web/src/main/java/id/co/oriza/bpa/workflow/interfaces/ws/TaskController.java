package id.co.oriza.bpa.workflow.interfaces.ws;

import id.co.oriza.bpa.base.interfaces.ws.CommonController;
import id.co.oriza.bpa.workflow.application.ChangeUserInfoCommand;
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
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@RequestMapping(value="/workflow/task/queueds/claim", method=RequestMethod.PUT, produces="application/json")
	public Map<String, Object> claimTask(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("claimTask");
		
		printParams(params);
		
		String userId = workflowUserAccessor.getActiveUser();
		
		String taskId = (String) params.get("id");
		
		taskService.claimTask(userId, taskId);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workflow/task/inboxes", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allInboxTasks(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		printParamsString(params);
		
		List<TaskModel> taskModels = new ArrayList<TaskModel>();
		
		String userId = workflowUserAccessor.getActiveUser();
		
		Collection<Task> inboxTasks = this.taskService().inboxTasksByUserId(userId, start, limit);
		for (Task task : inboxTasks) {
			TaskModel taskModel = new TaskModel(task);
			taskModels.add(taskModel);
		}
		
		Long inboxTasksSize = this.taskService().inboxTasksByUserIdSize(userId);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", inboxTasksSize);
		result.put("data", taskModels);
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workflow/task/inboxes/complete", method=RequestMethod.PUT, produces="application/json")
	public Map<String, Object> completeTask(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("completeTask");
		
		printParams(params);
		
		String taskId = (String) params.get("id");
		
		taskService.completeTask(taskId, new HashMap<String, Object>());
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}

	public TaskService taskService() {
		return taskService;
	}

}
