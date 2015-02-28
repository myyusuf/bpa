package id.co.oriza.bpa.security.application;

public class ChangeGroupNameCommand {

	private String code;
	private String name;

	public ChangeGroupNameCommand(String code, String name) {
		super();
		this.code = code;
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public String getName() {
		return name;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public void setName(String name) {
		this.name = name;
	}

}
