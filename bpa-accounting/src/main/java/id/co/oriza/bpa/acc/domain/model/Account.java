package id.co.oriza.bpa.acc.domain.model;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;
import id.co.oriza.bpa.base.domain.model.DomainEventPublisher;

public class Account extends ConcurrencySafeEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private AccountId accountId;
	private String code;
	private String name;
	private String description;
	private Account parent;
	private AccountGroup group;
	
	public AccountId accountId(){
		return this.accountId;
	}
	
	private void setAccountId(AccountId anAccountId) {
		this.assertArgumentNotNull(anAccountId, "The AccountId is required.");
		this.accountId = anAccountId;
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
	
	public Account parent() {
		return this.parent;
	}

	public AccountGroup group() {
		return this.group;
	}
	
	public Account(AccountId anAccountId, String aCode, String aName, String aDescription, Account aParent, AccountGroup aGroup){
		
		this();
		
		this.setAccountId(anAccountId);
		this.setCode(aCode);
		this.setName(aName);
		this.setDescription(aDescription);
		this.setParent(aParent);
		this.setCategory(aGroup);
		
		String parentCode = aParent != null ? aParent.code : "";
		DomainEventPublisher.instance().publish(new AccountRegistered(aCode, aName, parentCode));
	}
	
	private void setCategory(AccountGroup aGroup) {
		this.assertArgumentNotNull(aGroup, "The Group is required.");
		this.group = aGroup;
	}

	private void setParent(Account aParent) {
		this.parent = aParent;
	}

	private void setCode(String aCode) {
		this.assertArgumentNotEmpty(aCode, "The Code is required.");
		this.code = aCode;
	}
	
	private void setName(String aName) {
		this.assertArgumentNotEmpty(aName, "The Name is required.");
		this.name = aName;
	}
	
	private void setDescription(String aDescription) {
		this.description = aDescription;
	}
	
	protected Account() {
		super();
	}
	
	public void changeName(String aName){
		this.setName(aName);
	}
	
	public void changeDescription(String aDescription){
		this.setDescription(aDescription);
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((code == null) ? 0 : code.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Account other = (Account) obj;
		if (code == null) {
			if (other.code != null)
				return false;
		} else if (!code.equals(other.code))
			return false;
		return true;
	}

}
