package id.co.oriza.bpa.base.domain.model;

public class ConcurrencySafeEntity extends Entity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int concurrenceyVersion;
	
	protected ConcurrencySafeEntity(){
		super();
	}
	
	public int concurrenceyVersion(){
		return this.concurrenceyVersion;
	}

	public void setConcurrenceyVersion(int aVersion) {
		this.failWhenConcurrencyViolation(aVersion);
		this.concurrenceyVersion = aVersion;
	}
	
	public void failWhenConcurrencyViolation(int aVersion){
		if(aVersion != this.concurrenceyVersion){
			throw new IllegalStateException("Concurrency Violation : Stale data detected. Entity wal already modified");
		}
	}

}
