package id.co.oriza.bpa.base.domain.model;

import java.io.Serializable;

public abstract class AbstractId extends AssertionConcern implements Identity, Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String id;
	public String id(){
		return this.id;
	}
	
	protected AbstractId(String anId){
		this();
		this.setId(anId);
	}
	
	protected AbstractId(){
		super();
	}
	
	protected abstract int hasOddValue();
	protected abstract int hasPrimeValue();
	protected void validateId(String anId){
		
	}

	public void setId(String anId) {
		this.assertArgumentNotEmpty(anId, "The basic identity is required.");
		this.assertArgumentLength(anId, 36, "The basic identity must be 36 characters.");
		this.validateId(anId);
		this.id = anId;
	}

}
