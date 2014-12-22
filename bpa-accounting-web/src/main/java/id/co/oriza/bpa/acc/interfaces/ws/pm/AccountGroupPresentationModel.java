package id.co.oriza.bpa.acc.interfaces.ws.pm;

import id.co.oriza.bpa.acc.domain.model.AccountGroup;
import id.co.oriza.bpa.acc.domain.model.MovementType;

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
	
	public MovementType getDefaultBalance(){
		return this.accountGroup.defaultBalance();
	}

}
