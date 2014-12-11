package id.co.oriza.bpa.acc.domain.model;

import java.util.Date;

import id.co.oriza.bpa.base.domain.model.DomainEvent;

public class AccountRegistered implements DomainEvent{
	
	private int eventVersion;
	private Date occuredOn;
	
	private String code;
	private String name;
	private String parentCode;

	public AccountRegistered(
			String aCode, 
			String aName, 
			String aParentCode) {
		super();
		
		this.eventVersion = 1;
		this.code = aCode;
		this.name = aName;
		this.parentCode = aParentCode;
	}

	@Override
	public int eventVersion() {
		return this.eventVersion;
	}

	@Override
	public Date occuredOn() {
		return this.occuredOn;
	}

	public String code() {
		return code;
	}

	public String name() {
		return name;
	}

	public String parentCode() {
		return parentCode;
	}

}
