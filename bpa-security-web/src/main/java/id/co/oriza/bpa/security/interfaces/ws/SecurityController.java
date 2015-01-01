package id.co.oriza.bpa.security.interfaces.ws;

import id.co.oriza.bpa.security.application.SecurityApplicationService;
import id.co.oriza.bpa.security.domain.model.User;
import id.co.oriza.bpa.security.interfaces.pm.UserPresentationModel;

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
public class SecurityController {
	
	final Logger logger = LoggerFactory.getLogger(SecurityController.class);
	
	private static final int MAX_LIMIT = 10000;
	
	@Autowired
	private SecurityApplicationService securityApplicationService;
	
	@RequestMapping(value="/security/users", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> getUsers(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		String nameStartsWith = params.get("nameStartsWith") != null ? params.get("nameStartsWith") : "";
		
		printParamsString(params);
		
		List<UserPresentationModel> userModels = new ArrayList<UserPresentationModel>();
		Collection<User> users = this.securityApplicationService().allSimilarlyNamedUsers(nameStartsWith, start, limit);
		for (User user : users) {
			UserPresentationModel userModel = new UserPresentationModel(user);
			userModels.add(userModel);
		}
		
		int usersSize = 1;
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", usersSize);
		result.put("data", userModels);
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

	public SecurityApplicationService securityApplicationService() {
		return securityApplicationService;
	}

}
