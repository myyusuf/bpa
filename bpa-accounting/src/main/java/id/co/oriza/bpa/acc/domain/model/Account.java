package id.co.oriza.bpa.acc.domain.model;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;

public class Account extends ConcurrencySafeEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String code;
	private String name;
	private String description;
	private Account parent;
	private AccountCategory category;
	
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

	public AccountCategory category() {
		return this.category;
	}
	
	protected Account(String aCode, String aName, String aDescription, Account aParent, AccountCategory aCategory){
		
		this();
		
		this.setCode(aCode);
		this.setName(aName);
		this.setDescription(aDescription);
		this.setParent(aParent);
		this.setCategory(aCategory);
		
		DomainEventPublisher.instance.publish(new AccountRegistered(aCode, aName, aParent.name()));
	}
	
	private void setCategory(AccountCategory aCategory) {
		this.assertArgumentNotNull(aCategory, "The Category is required.");
		this.category = aCategory;
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
