package id.co.oriza.bpa.acc.interfaces.ws.pm;

import id.co.oriza.bpa.acc.domain.model.Account;

public class AccountParentPresentationModel {
	
	private Account account;
	
	public AccountParentPresentationModel(Account anAccount){
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
	
	public boolean getIsGroup(){
		return this.account.isAccountGroup();
	}

}
