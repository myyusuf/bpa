package id.co.oriza.bpa.workflow.application;

public class RemoveUserCommand {

	private String id;

	public RemoveUserCommand(String id) {
		super();
		this.id = id;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

}
