package id.co.oriza.bpa.acc.application;

public class RemoveAccountCommand {
	
	private String code;

	public RemoveAccountCommand(String code) {
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
