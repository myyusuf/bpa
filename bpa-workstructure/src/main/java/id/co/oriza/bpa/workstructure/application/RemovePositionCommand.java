package id.co.oriza.bpa.workstructure.application;

public class RemovePositionCommand {

	private String code;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public RemovePositionCommand(String code) {
		super();
		this.code = code;
	}

}
