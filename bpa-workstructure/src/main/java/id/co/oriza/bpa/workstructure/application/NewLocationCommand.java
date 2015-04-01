package id.co.oriza.bpa.workstructure.application;

public class NewLocationCommand {

	private String code;
	private String address;
	private String description;

	public String getCode() {
		return code;
	}

	public String getAddress() {
		return address;
	}

	public String getDescription() {
		return description;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public NewLocationCommand(String code, String address, String description) {
		super();
		this.code = code;
		this.address = address;
		this.description = description;
	}

}
