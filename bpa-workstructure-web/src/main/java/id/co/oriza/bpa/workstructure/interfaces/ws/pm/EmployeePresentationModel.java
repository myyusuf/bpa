package id.co.oriza.bpa.workstructure.interfaces.ws.pm;

import id.co.oriza.bpa.workstructure.domain.model.Employee;

public class EmployeePresentationModel {
	
	private Employee employee;

	public EmployeePresentationModel(Employee employee) {
		super();
		this.employee = employee;
	}
	
	public String getEmployeeId(){
		return this.employee.employeeId();
	}
	
	public String getName(){
		return this.employee.name();
	}
	
	public String getPhotoFileName(){
		return this.employee.photoFileName();
	}
	
}
