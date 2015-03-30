package id.co.oriza.bpa.workstructure.application;

public class RemoveEmployeeCommand {
	
	private String employeeId;

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public RemoveEmployeeCommand(String employeeId) {
		super();
		this.employeeId = employeeId;
	}

}
