package id.co.oriza.bpa.acc.domain.model;

import java.util.UUID;

import id.co.oriza.bpa.base.domain.model.AbstractId;

public final class AccountId extends AbstractId{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public AccountId(String anId){
		super(anId);
	}
	
	protected AccountId(){
		super();
	}

	@Override
	protected int hasOddValue() {
		return 111;
	}

	@Override
	protected int hasPrimeValue() {
		return 3;
	}
	
	@Override
    protected void validateId(String anId) {
        try {
            UUID.fromString(anId);
        } catch (Exception e) {
            throw new IllegalArgumentException("The id has an invalid format.");
        }
    }

}
