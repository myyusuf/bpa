package id.co.oriza.bpa.acc.interfaces.ws;

import id.co.oriza.bpa.acc.application.AccountApplicationService;
import id.co.oriza.bpa.acc.application.ChangeAccountInfoCommand;
import id.co.oriza.bpa.acc.application.NewAccountCommand;
import id.co.oriza.bpa.acc.application.RemoveAccountCommand;
import id.co.oriza.bpa.acc.domain.model.Account;
import id.co.oriza.bpa.acc.interfaces.ws.pm.AccountPresentationModel;

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
public class AccountController {
	
	final Logger logger = LoggerFactory.getLogger(AccountController.class);
	
	private static final int MAX_LIMIT = 10000;
	
	@Autowired
	private AccountApplicationService accountApplicationService;
	
	@RequestMapping(value="/accounting/accounts", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> getAccountList(@RequestParam(required=false) Map<String, String> params){
		
		int start = params.get("pagenum") != null ? Integer.parseInt(params.get("pagenum")) : 0;
		int limit = params.get("pagesize") != null ? Integer.parseInt(params.get("pagesize")) : MAX_LIMIT;
		
		String codeOrNameStartsWith = params.get("codeOrNameStartsWith") != null ? params.get("codeOrNameStartsWith") : "";
		
		printParamsString(params);
		
		List<AccountPresentationModel> accountModels = new ArrayList<AccountPresentationModel>();
		Collection<Account> accounts = this.accountApplicationService().allSimilarlyCodedOrNamedAccounts(codeOrNameStartsWith, codeOrNameStartsWith, start, limit);
		for (Account account : accounts) {
			AccountPresentationModel accountModel = new AccountPresentationModel(account);
			accountModels.add(accountModel);
		}
		
		int accountsSize = accountApplicationService.allSimilarlyCodedOrNamedAccountsSize(codeOrNameStartsWith, codeOrNameStartsWith);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("num", accountsSize);
		result.put("data", accountModels);
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/accounting/accounts/parents", method=RequestMethod.GET, produces="application/json")
	public Map<String, Object> getAccountParentList(@RequestParam(required=false) Map<String, String> params){
		
		String groupCode = params.get("groupCode") != null ? params.get("groupCode") : "";
		String selfAccountCode = params.get("selfAccountCode") != null ? params.get("selfAccountCode") : "";
		
		printParamsString(params);
		
		List<AccountPresentationModel> accountModels = new ArrayList<AccountPresentationModel>();
		Collection<Account> accounts = this.accountApplicationService().allAccountParents(groupCode, selfAccountCode);
		for (Account account : accounts) {
			AccountPresentationModel accountModel = new AccountPresentationModel(account);
			accountModels.add(accountModel);
		}
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("data", accountModels);
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/accounting/accounts", method=RequestMethod.PUT, produces="application/json")
	public Map<String, Object> changeAccountInfo(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("update account");
		
		printParams(params);
		
		String code = (String) params.get("code");
		String name = (String) params.get("name");
		String description = (String) params.get("description");
		
		ChangeAccountInfoCommand command = new ChangeAccountInfoCommand(code, name, description);
		this.accountApplicationService().changeAccountInfo(command);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/accounting/accounts", method=RequestMethod.POST, produces="application/json")
	public Map<String, Object> createAccount(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("create account");
		
		String code = (String) params.get("code");
		String name = (String) params.get("name");
		String description = (String) params.get("description");
		
		@SuppressWarnings("unchecked")
		Map<String, String> accountGroupMap = (Map<String, String>) params.get("accountGroup");
		String accountGroupCode = accountGroupMap.get("code");
		
		@SuppressWarnings("unchecked")
		Map<String, String> parentMap = (Map<String, String>) params.get("parent");
		String parentCode = parentMap.get("code");
		
		@SuppressWarnings("unchecked")
		Map<String, String> defaultBalanceMap = (Map<String, String>) params.get("defaultBalance");
		String movementTypeCode = defaultBalanceMap.get("code");
		
		NewAccountCommand command = new NewAccountCommand(code, name, description, accountGroupCode, parentCode, movementTypeCode);
		this.accountApplicationService().newAccountWith(command);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value="/accounting/accounts", method=RequestMethod.DELETE, produces="application/json")
	public Map<String, Object> deleteAccount(@RequestBody(required=false) Map<String, Object> params){
		
		logger.debug("delete account");
		
		String code = (String) params.get("code");
		
		RemoveAccountCommand command = new RemoveAccountCommand(code);
		this.accountApplicationService().removeAccount(command);
		
		Map<String, Object> result = new HashMap<String, Object>();
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

	public AccountApplicationService accountApplicationService() {
		return accountApplicationService;
	}

}
