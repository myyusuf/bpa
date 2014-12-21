package id.co.oriza.bpa.acc.domain.model;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;
import id.co.oriza.bpa.base.domain.model.DomainEventPublisher;

public class AccountGroup extends ConcurrencySafeEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String code;
	private String name;
	private String description;
	private MovementType defaultBalance;
	
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

	private void setCode(String aCode) {
		this.assertArgumentNotEmpty(aCode, "The Code is required.");
		this.code = aCode;
	}

	private void setName(String aName) {
		this.assertArgumentNotEmpty(aName, "The Name is required.");
		this.name = aName;
	}

	private void setDescription(String description) {
		this.description = description;
	}

	private void setDefaultBalance(MovementType aDefaultBalance) {
		this.assertArgumentNotNull(aDefaultBalance, "The Default Balance is required.");
		this.defaultBalance = aDefaultBalance;
	}

	public String code() {
		return code;
	}

	public String name() {
		return name;
	}

	public String description() {
		return description;
	}

	public MovementType defaultBalance() {
		return defaultBalance;
	}
	
	public void changeName(String aName){
		this.setName(aName);
	}
	
	public void changeDescription(String aDescription){
		this.setDescription(aDescription);
	}

}
