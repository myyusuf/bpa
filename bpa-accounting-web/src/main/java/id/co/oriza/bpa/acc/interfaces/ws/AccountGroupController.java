package id.co.oriza.bpa.acc.interfaces.ws;

import id.co.oriza.bpa.acc.application.AccountApplicationService;
import id.co.oriza.bpa.acc.application.ChangeAccountGroupInfoCommand;
import id.co.oriza.bpa.acc.domain.model.AccountGroup;
import id.co.oriza.bpa.acc.domain.model.MovementType;
import id.co.oriza.bpa.acc.interfaces.ws.pm.AccountGroupPresentationModel;

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
public class AccountGroupController {
	
	private static final int MAX_LIMIT = 10000;
	
	final Logger logger = LoggerFactory.getLogger(AccountGroupController.class);
	
	@Autowired
	private AccountApplicationService accountApplicationService;
	
	@RequestMapping(value="/accounting/accountgroups", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> getAccountGroups(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		String codeOrNameStartsWith = params.get("codeOrNameStartsWith") != null ? params.get("codeOrNameStartsWith") : "";
		
		printParams(params);
		
		List<AccountGroupPresentationModel> accountGroupModels = new ArrayList<AccountGroupPresentationModel>();
		Collection<AccountGroup> accountGroups = this.accountApplicationService().allSimilarlyCodedOrNamedAccountGroups(codeOrNameStartsWith, codeOrNameStartsWith, start, limit);
		for (AccountGroup accountGroup : accountGroups) {
			AccountGroupPresentationModel accountGroupModel = new AccountGroupPresentationModel(accountGroup);
			accountGroupModels.add(accountGroupModel);
		}
		
		int accountGroupsSize = accountApplicationService.allSimilarlyCodedOrNamedAccountGroupsSize(codeOrNameStartsWith, codeOrNameStartsWith);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", accountGroupsSize);
		result.put("data", accountGroupModels);
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/accounting/defaultbalances", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> getDefaultBalances(@RequestParam(required=false) Map<String, String> params){
		
		
		MovementType[] values = MovementType.values();
		List<Map<String, String>> movementTypeList = new ArrayList<Map<String,String>>();
		for (MovementType movementType : values) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("code", movementType.getCode());
			map.put("name", movementType.getName());
			movementTypeList.add(map);
		}
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", values.length);
		result.put("data", movementTypeList);
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/accounting/accountgroups", method=RequestMethod.POST, produces="application/json")
	public Map<String, Object> changeAccountGroupInfo(@RequestParam(required=false) Map<String, String> params){
		
		logger.debug("update account group");
		
		printParams(params);
		
		String code = params.get("code");
		String name = params.get("name");
		String description = params.get("description");
		
		ChangeAccountGroupInfoCommand command = new ChangeAccountGroupInfoCommand(code, name, description);
		this.accountApplicationService().changeAccountGroupInfo(command);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", 0);
//		result.put("data", accountModels);
		result.put("success", true);
		
		return result;
	}
	
	private void printParams(Map<String, String> params){
		List<String> listKeys = new ArrayList<String>(params.keySet());
		for (String key : listKeys) {
			logger.debug("key : " + key + ", value : " + params.get(key));
		}
	}

	public AccountApplicationService accountApplicationService() {
		return accountApplicationService;
	}

}
