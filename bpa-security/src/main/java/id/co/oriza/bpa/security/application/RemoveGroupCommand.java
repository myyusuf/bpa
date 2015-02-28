package id.co.oriza.bpa.security.application;

public class RemoveGroupCommand {

	private String code;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public RemoveGroupCommand(String code) {
		super();
		this.code = code;
	}

}
