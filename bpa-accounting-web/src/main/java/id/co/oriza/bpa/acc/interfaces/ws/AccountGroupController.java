package id.co.oriza.bpa.acc.interfaces.ws;

import id.co.oriza.bpa.acc.application.AccountApplicationService;
import id.co.oriza.bpa.acc.domain.model.AccountGroup;
import id.co.oriza.bpa.acc.interfaces.ws.pm.AccountGroupPresentationModel;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AccountGroupController {
	
	private static final int MAX_LIMIT = 10000;
	
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
		
		int accountsSize = 1;//accountApplicationService.allSimilarlyCodedOrNamedAccountsSize(codeOrNameStartsWith, codeOrNameStartsWith);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", accountsSize);
		result.put("data", accountGroupModels);
		result.put("success", true);
		
		return result;
	}
	
	private void printParams(Map<String, String> params){
		List<String> listKeys = new ArrayList<String>(params.keySet());
		for (String key : listKeys) {
			System.out.println("key : " + key + ", value : " + params.get(key));
		}
	}

	public AccountApplicationService accountApplicationService() {
		return accountApplicationService;
	}

}
