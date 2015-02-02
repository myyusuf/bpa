package id.co.oriza.bpa.workflow.interfaces.ws;

import id.co.oriza.bpa.base.interfaces.ws.CommonController;
import id.co.oriza.bpa.workflow.application.ChangeGroupNameCommand;
import id.co.oriza.bpa.workflow.application.IdentityService;
import id.co.oriza.bpa.workflow.application.NewGroupCommand;
import id.co.oriza.bpa.workflow.application.RemoveGroupCommand;
import id.co.oriza.bpa.workflow.domain.model.Group;
import id.co.oriza.bpa.workflow.domain.model.User;
import id.co.oriza.bpa.workflow.interfaces.ws.pm.GroupPresentationModel;
import id.co.oriza.bpa.workflow.interfaces.ws.pm.UserPresentationModel;

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
public class IdentityController extends CommonController{
	
	private static final int MAX_LIMIT = 10000;
	
	final Logger logger = LoggerFactory.getLogger(IdentityController.class);
	
	@Autowired
	private IdentityService identityService;
	
	@RequestMapping(value="/workflow/identity/users", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allUsers(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		printParamsString(params);
		
		List<UserPresentationModel> userModels = new ArrayList<UserPresentationModel>();
		Collection<User> users = this.identityService().allUsers(start, limit);
		for (User user : users) {
			UserPresentationModel userModel = new UserPresentationModel(user);
			userModels.add(userModel);
		}
		
		Long usersSize = 10l;//this.identityService().allUsersSize();
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", usersSize);
		result.put("data", userModels);
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workflow/identity/users", method=RequestMethod.POST, produces="application/json")
	public Map<String, Object> createUser(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("create user");
		
		printParams(params);
		
		String id = (String) params.get("id");
		String password = (String) params.get("password");
		String firstName = (String) params.get("firstName");
		String lastName = (String) params.get("lastName");
		String email = (String) params.get("email");
		
		NewUserCommand command = new NewUserCommand(id, password, firstName, lastName, email);
		this.identityService().newUserWith(command);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workflow/identity/groups", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allGroups(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		printParamsString(params);
		
		List<GroupPresentationModel> groupModels = new ArrayList<GroupPresentationModel>();
		Collection<Group> groups = this.identityService().allGroups(start, limit);
		for (Group group : groups) {
			GroupPresentationModel groupModel = new GroupPresentationModel(group);
			groupModels.add(groupModel);
		}
		
		Long groupsSize = this.identityService().allGroupsSize();
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", groupsSize);
		result.put("data", groupModels);
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workflow/identity/groups", method=RequestMethod.POST, produces="application/json")
	public Map<String, Object> createGroup(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("create group");
		
		printParams(params);
		
		String id = (String) params.get("id");
		String name = (String) params.get("name");
		
		NewGroupCommand command = new NewGroupCommand(id, name);
		this.identityService().newGroupWith(command);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workflow/identity/groups", method=RequestMethod.PUT, produces="application/json")
	public Map<String, Object> changeGroupName(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("changeGroupName");
		
		printParams(params);
		
		String id = (String) params.get("id");
		String name = (String) params.get("name");
		
		ChangeGroupNameCommand command = new ChangeGroupNameCommand(id, name);
		this.identityService().changeGroupName(command);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/workflow/identity/groups", method=RequestMethod.DELETE, produces="application/json")
	public Map<String, Object> removeGroup(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("remove group");
		
		String id = (String) params.get("id");
		
		RemoveGroupCommand command = new RemoveGroupCommand(id);
		this.identityService().removeGroup(command);
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", true);
		
		return result;
	}

	public IdentityService identityService() {
		return identityService;
	}

}
