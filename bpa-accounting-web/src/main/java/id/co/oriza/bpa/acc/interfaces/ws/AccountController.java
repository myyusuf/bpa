package id.co.oriza.bpa.acc.interfaces.ws;

import id.co.oriza.bpa.acc.application.AccountApplicationService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AccountController {
	
	private AccountApplicationService accountApplicationService;
	
	@RequestMapping(value="/security/users", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> getUserList(@RequestParam(required=false) Map<String, String> params){
		
		int limit = params.get("limit") != null ? Integer.parseInt(params.get("limit")) : 0;
		int start = params.get("start") != null ? Integer.parseInt(params.get("start")) : 0;
		
		printParams(params);
		
		
		Map<String, Object> result = new HashMap<String, Object>();
		
//		List<User> users = userService.getUsers(start, limit);
//		Long usersCount = userService.countUsers();
//		result.put("num", usersCount);
//		result.put("data", users);
//		result.put("success", true);
		
		return result;
	}
	
	private void printParams(Map<String, String> params){
		List<String> listKeys = new ArrayList<String>(params.keySet());
		for (String key : listKeys) {
			System.out.println("key : " + key + ", value : " + params.get(key));
		}
	}

}
