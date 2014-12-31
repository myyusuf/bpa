package id.co.oriza.bpa.acc.interfaces.ws.pm;

import id.co.oriza.bpa.acc.domain.model.Account;

import java.util.HashMap;
import java.util.Map;

public class AccountPresentationModel {
	
	private Account account;
	
	public AccountPresentationModel(Account anAccount){
		super();
		this.account = anAccount;
	}
	
	public String getCode(){
		return this.account.code();
	}
	
	public String getName(){
		return this.account.name();
	}
	
	public String getDescription(){
		return this.account.description();
	}
	
	public String getParentCode(){
		
		String code = "";
		if(this.account.parent() != null){
			code = this.account.parent().code();
		}
		
		return code;
	}
	
	public Map<String, Object> getAccountGroup(){
		if( this.account.group() != null){
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("code", this.account.group().code());
			map.put("name", this.account.group().name());
			
			Map<String, String> defaultBalanceMap = new HashMap<String, String>();
			defaultBalanceMap.put("code", this.account.group().defaultBalance().getCode());
			defaultBalanceMap.put("name", this.account.group().defaultBalance().getName());
			
			map.put("defaultBalance", defaultBalanceMap);
			
			return map;
		}else{
			return null;
		}
	}
	
	public Map<String, String> getDefaultBalance(){
		Map<String, String> map = new HashMap<String, String>();
		map.put("code", this.account.defaultBalance().getCode());
		map.put("name", this.account.defaultBalance().getName());
		return map;
	}
	
	public boolean getIsGroup(){
		return this.account.isAccountGroup();
	}

}
