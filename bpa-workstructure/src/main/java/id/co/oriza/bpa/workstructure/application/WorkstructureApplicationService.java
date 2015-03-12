package id.co.oriza.bpa.workstructure.application;

import id.co.oriza.bpa.workstructure.domain.model.Employee;
import id.co.oriza.bpa.workstructure.domain.model.EmployeeRepository;
import id.co.oriza.bpa.workstructure.domain.model.Position;
import id.co.oriza.bpa.workstructure.domain.model.PositionRepository;

import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class WorkstructureApplicationService {
	
	final Logger logger = LoggerFactory.getLogger(WorkstructureApplicationService.class);
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private PositionRepository positionRepository;
	
	@Transactional(readOnly=true)
	public Collection<Employee> allSimilarlyEmployeeIdOrNamedEmployees(String anEmployeeId, String aName, int aStart, int aLimit){
		Collection<Employee> employees = this.employeeRepository().allSimilarlyEmployeeIdOrNamed(anEmployeeId, aName, aStart, aLimit);
		return employees;
	}
	
	@Transactional(readOnly=true)
	public Collection<Position> allSimilarlyCodedOrNamedPositions(String aCode, String aName, int aStart, int aLimit){
		Collection<Position> positions = this.positionRepository().allSimilarlyCodedOrNamed(aCode, aName, aStart, aLimit);
		return positions;
	}

	public EmployeeRepository employeeRepository() {
		return employeeRepository;
	}

	public PositionRepository positionRepository() {
		return positionRepository;
	}

}
