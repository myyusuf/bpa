package id.co.oriza.bpa.acc.domain.model;

import id.co.oriza.bpa.base.domain.model.DomainEventPublisher;

public class AccountGroup extends Account {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public AccountGroup(String aCode, String aName, String aDescription, MovementType aDefaultBalance){
		
		this();
		
		this.setCode(aCode);
		this.setName(aName);
		this.setDescription(aDescription);
		this.setDefaultBalance(aDefaultBalance);
		
		DomainEventPublisher.instance().publish(new AccountGroupRegistered(aCode, aName, aDefaultBalance.getCode()));
	}

	protected AccountGroup() {
		super();
	}
	
	@Override
	public boolean isAccountGroup(){
		return true;
	}

}
