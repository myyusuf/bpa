package id.co.oriza.bpa.workstructure.domain.model;

import java.util.Collection;

public interface EmployeeRepository {
	
	public Collection<Employee> allSimilarlyEmployeeIdOrNamed(String anEmployeeId, String aName, int aStart, int aLimit);

	public Employee withEmployeeId(String employeeId);

	public void add(Employee anEmployee);

	public int allSimilarlyEmployeeIdOrNamedSize(String anEmployeeId,
			String aName);

	public void remove(Employee employee);

}
