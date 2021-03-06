package id.co.oriza.bpa.security.interfaces.ws;

import id.co.oriza.bpa.base.interfaces.ws.CommonController;
import id.co.oriza.bpa.security.application.ChangeGroupInfoCommand;
import id.co.oriza.bpa.security.application.ChangeUserInfoCommand;
import id.co.oriza.bpa.security.application.IdentityApplicationService;
import id.co.oriza.bpa.security.application.NewGroupCommand;
import id.co.oriza.bpa.security.application.NewUserCommand;
import id.co.oriza.bpa.security.application.RemoveGroupCommand;
import id.co.oriza.bpa.security.application.RemoveUserCommand;
import id.co.oriza.bpa.security.domain.model.Group;
import id.co.oriza.bpa.security.domain.model.User;
import id.co.oriza.bpa.security.interfaces.ws.pm.GroupPresentationModel;
import id.co.oriza.bpa.security.interfaces.ws.pm.UserPresentationModel;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class IdentityController extends CommonController{
	
	private static final int MAX_LIMIT = 10000;
	
	final Logger logger = LoggerFactory.getLogger(IdentityController.class);
	
	@Autowired
	private IdentityApplicationService identityService;
	
	@RequestMapping(value="/security/users", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allUsers(HttpServletResponse response,  @RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		printParamsString(params);
		
		List<UserPresentationModel> userModels = new ArrayList<UserPresentationModel>();
		Collection<User> users = this.identityService().allUsers(start, limit);
		for (User user : users) {
			UserPresentationModel userModel = new UserPresentationModel(user);
			userModels.add(userModel);
		}
		
		Long usersSize = this.identityService().allUsersSize();
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", usersSize);
		result.put("data", userModels);
		result.put("success", true);
		
		response.setHeader("Access-Control-Allow-Origin","*");
		
		return result;
	}
	
	@RequestMapping(value="/security/users", method=RequestMethod.POST, produces="application/json")
	public Map<String, Object> createUser(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("createUser");
		
		printParams(params);
		
		String userId = (String) params.get("userId");
		String password = (String) params.get("password");
		String firstName = (String) params.get("firstName");
		String lastName = (String) params.get("lastName");
		String email = (String) params.get("email");
		
		List<String> groupCodes = new ArrayList<String>(0);
		List<Map<String, Object>> groupsMap = (List<Map<String, Object>>) params.get("groups");
		
		if(groupsMap != null){
			for (Map<String, Object> groupMap : groupsMap) {
				groupCodes.add((String) groupMap.get("code"));
			}
		}
		
		System.out.println("groupsMap : " + groupsMap);
		System.out.println("groupCodes : " + groupCodes);
		
		
		NewUserCommand command = new NewUserCommand(userId, password, firstName, lastName, email, groupCodes);
		this.identityService().newUserWith(command);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/security/users", method=RequestMethod.PUT, produces="application/json")
	public Map<String, Object> changeUserInfo(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("changeUserInfo");
		
		printParams(params);
		
		String userId = (String) params.get("userId");
		String password = (String) params.get("password");
		String firstName = (String) params.get("firstName");
		String lastName = (String) params.get("lastName");
		String email = (String) params.get("email");
		
		List<String> groupCodes = new ArrayList<String>(0);
		List<Map<String, Object>> groupsMap = (List<Map<String, Object>>) params.get("groups");
		
		if(groupsMap != null){
			for (Map<String, Object> groupMap : groupsMap) {
				groupCodes.add((String) groupMap.get("code"));
			}
		}
		
		System.out.println("groupsMap : " + groupsMap);
		System.out.println("groupCodes : " + groupCodes);
		
		ChangeUserInfoCommand command = new ChangeUserInfoCommand(userId, password, firstName, lastName, email, groupCodes);
		this.identityService().changeUserInfo(command);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/security/users", method=RequestMethod.DELETE, produces="application/json")
	public Map<String, Object> removeUser(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("removeUser");
		
		String userId = (String) params.get("userId");
		
		RemoveUserCommand command = new RemoveUserCommand(userId);
		this.identityService().removeUser(command);
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/security/users/{id}/groups", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allUserGroups(@PathVariable String id, @RequestParam(required=false) Map<String, String> params){
		
		printParamsString(params);
		System.out.println("{id} = " + id);
		
		List<GroupPresentationModel> groupModels = new ArrayList<GroupPresentationModel>();
		Collection<Group> groups = this.identityService().allUserGroups(id);
		for (Group group : groups) {
			GroupPresentationModel groupModel = new GroupPresentationModel(group);
			groupModels.add(groupModel);
		}
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		result.put("data", groupModels);
		
		return result;
	}
	
	@RequestMapping(value="/security/groups", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> allGroups(HttpServletResponse response, @RequestParam(required=false) Map<String, String> params){
		
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
		
		response.setHeader("Access-Control-Allow-Origin","*");
		
		return result;
	}
	
	@RequestMapping(value="/security/groups", method=RequestMethod.POST, produces="application/json")
	public Map<String, Object> createGroup(HttpServletResponse response, @RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("createGroup");
		
		printParams(params);
		
		String code = (String) params.get("code");
		String name = (String) params.get("name");
		String description = (String) params.get("description");
		
		NewGroupCommand command = new NewGroupCommand(code, name, description);
		this.identityService().newGroupWith(command);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		response.setHeader("Access-Control-Allow-Origin","*");
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/security/groups", method=RequestMethod.PUT, produces="application/json")
	public Map<String, Object> changeGroupName(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("changeGroupName");
		
		printParams(params);
		
		String code = (String) params.get("code");
		String name = (String) params.get("name");
		String description = (String) params.get("description");
		
		ChangeGroupInfoCommand command = new ChangeGroupInfoCommand(code, name, description);
		this.identityService().changeGroupInfo(command);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/security/groups", method=RequestMethod.DELETE, produces="application/json")
	public Map<String, Object> removeGroup(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("removeGroup");
		
		String code = (String) params.get("code");
		
		RemoveGroupCommand command = new RemoveGroupCommand(code);
		this.identityService().removeGroup(command);
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", true);
		
		return result;
	}

	public IdentityApplicationService identityService() {
		return identityService;
	}

}
