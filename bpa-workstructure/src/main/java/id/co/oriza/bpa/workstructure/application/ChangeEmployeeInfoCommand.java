package id.co.oriza.bpa.workstructure.application;

public class ChangeEmployeeInfoCommand {
	
	private String employeeId;
	private String name;
	private String imageFileName;

	public ChangeEmployeeInfoCommand(String employeeId, String name,
			String imageFileName) {
		super();
		this.employeeId = employeeId;
		this.name = name;
		this.imageFileName = imageFileName;
	}

	public String getImageFileName() {
		return imageFileName;
	}

	public void setImageFileName(String imageFileName) {
		this.imageFileName = imageFileName;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public String getName() {
		return name;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public void setName(String name) {
		this.name = name;
	}
}
