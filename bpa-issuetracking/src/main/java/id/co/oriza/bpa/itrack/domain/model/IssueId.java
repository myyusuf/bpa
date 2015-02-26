package id.co.oriza.bpa.itrack.domain.model;

import id.co.oriza.bpa.base.domain.model.AbstractId;

import java.util.UUID;

public class IssueId extends AbstractId{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public IssueId(String anId){
		super(anId);
	}
	
	protected IssueId(){
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
