package id.co.oriza.bpa.acc.domain.model;

public enum MovementType {
	
	DEBET("DEBET", "Debet"), CREDIT("CREDIT", "Credit");
	
	private String code;
	private String name;
	
	private MovementType(String aCode, String aName){
		this.code = aCode;
		this.name = aName;
	}

	public String getCode() {
		return code;
	}

	public String getName() {
		return name;
	}

}
