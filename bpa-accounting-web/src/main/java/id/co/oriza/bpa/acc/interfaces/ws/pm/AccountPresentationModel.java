package id.co.oriza.bpa.acc.interfaces.ws.pm;

import id.co.oriza.bpa.acc.domain.model.Account;

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

}
