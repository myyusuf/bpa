package id.co.oriza.bpa.workstructure.domain.model;

import java.util.Collection;

public interface EmployeeRepository {
	
	public Collection<Employee> allSimilarlyEmployeeIdOrNamed(String anEmployeeId, String aName, int aStart, int aLimit);

}
