package id.co.oriza.bpa.base.domain.model;

public class AssertionConcern {
	
	protected AssertionConcern(){
		super();
	}
	
	protected void assertArgumentEquals(Object anObject1, Object anObject2, String aMessage){
		if(!anObject1.equals(anObject2)){
			throw new IllegalArgumentException(aMessage);
		}
	}
	
	protected void assertArgumentFalse(boolean aBoolean, String aMessage){
		if(aBoolean){
			throw new IllegalArgumentException(aMessage);
		}
	}
	
	protected void assertArgumentNotEmpty(String aString, String aMessage){
		if(aString == null || aString.trim().isEmpty()){
			throw new IllegalArgumentException(aMessage);
		}
	}
	
	protected void assertArgumentNotNull(Object anObject, String aMessage){
		if(anObject == null){
			throw new IllegalArgumentException(aMessage);
		}
	}
	
	protected void assertArgumentLength(String aString, int aMaximum, String aMessage){
		int length = aString.trim().length();
		if(length > aMaximum){
			throw new IllegalArgumentException(aMessage);
		}
	}

}
