package id.co.oriza.bpa.workstructure.application;

import id.co.oriza.bpa.workstructure.domain.model.Employee;
import id.co.oriza.bpa.workstructure.infrastructure.persistence.HibernateEmployeeRepository;

import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class WorkstructureApplicationService {
	
	final Logger logger = LoggerFactory.getLogger(WorkstructureApplicationService.class);
	
	@Autowired
	private HibernateEmployeeRepository employeeRepository;
	
	@Transactional(readOnly=true)
	public Collection<Employee> allSimilarlyCodedOrNamedAccountGroups(String anEmployeeId, String aName, int aStart, int aLimit){
		Collection<Employee> employees = this.employeeRepository().allSimilarlyEmployeeIdOrNamed(anEmployeeId, aName, aStart, aLimit);
		return employees;
	}

	public HibernateEmployeeRepository employeeRepository() {
		return employeeRepository;
	}

}
