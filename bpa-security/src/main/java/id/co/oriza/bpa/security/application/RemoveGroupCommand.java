package id.co.oriza.bpa.security.application;

public class RemoveGroupCommand {

	private String id;

	public RemoveGroupCommand(String id) {
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
