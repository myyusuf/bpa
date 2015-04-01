package id.co.oriza.bpa.workstructure.application;

public class RemoveLocationCommand {

	private String code;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public RemoveLocationCommand(String code) {
		super();
		this.code = code;
	}

}
