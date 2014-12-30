package id.co.oriza.bpa.acc.interfaces.ws.pm;

import id.co.oriza.bpa.acc.domain.model.AccountGroup;

import java.util.HashMap;
import java.util.Map;

public class AccountGroupPresentationModel {
	
	private AccountGroup accountGroup;
	
	public AccountGroupPresentationModel(AccountGroup anAccountGroup){
		super();
		this.accountGroup = anAccountGroup;
	}
	
	public String getCode(){
		return this.accountGroup.code();
	}
	
	public String getName(){
		return this.accountGroup.name();
	}
	
	public String getDescription(){
		return this.accountGroup.description();
	}
	
	public Map<String, String> getDefaultBalance(){
		Map<String, String> map = new HashMap<String, String>();
		map.put("code", this.accountGroup.defaultBalance().getCode());
		map.put("name", this.accountGroup.defaultBalance().getName());
		return map;
	}
	
	public boolean isGroup(){
		return this.accountGroup.isAccountGroup();
	}

}
