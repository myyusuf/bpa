package id.co.oriza.bpa.security.application;

public class RemoveRoleCommand {

	private String code;

	public RemoveRoleCommand(String code) {
		super();
		this.code = code;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
