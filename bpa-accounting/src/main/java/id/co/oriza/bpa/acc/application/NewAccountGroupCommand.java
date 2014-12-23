package id.co.oriza.bpa.acc.application;


public class NewAccountGroupCommand {

	private String code;
	private String name;
	private String description;
	private String movementTypeCode;

	public NewAccountGroupCommand(String code, String name, String description,
			String movementTypeCode) {
		super();
		this.code = code;
		this.name = name;
		this.description = description;
		this.movementTypeCode = movementTypeCode;
	}
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMovementTypeCode() {
		return movementTypeCode;
	}

	public void setMovementTypeCode(String movementTypeCode) {
		this.movementTypeCode = movementTypeCode;
	}

}
