package id.co.oriza.bpa.workstructure.application;

public class ChangePositionInfoCommand {
	
	private String code;
	private String name;
	private String description;

	public String getCode() {
		return code;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public ChangePositionInfoCommand(String code, String name, String description) {
		super();
		this.code = code;
		this.name = name;
		this.description = description;
	}
}
