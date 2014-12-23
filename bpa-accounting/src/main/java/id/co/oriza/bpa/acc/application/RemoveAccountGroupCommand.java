package id.co.oriza.bpa.acc.application;

public class RemoveAccountGroupCommand {
	
	private String code;

	public RemoveAccountGroupCommand(String code) {
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
