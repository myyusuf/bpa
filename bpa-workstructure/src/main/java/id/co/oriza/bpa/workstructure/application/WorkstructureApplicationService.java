package id.co.oriza.bpa.workstructure.application;

import id.co.oriza.bpa.workstructure.domain.model.Employee;
import id.co.oriza.bpa.workstructure.domain.model.EmployeeRepository;
import id.co.oriza.bpa.workstructure.domain.model.Location;
import id.co.oriza.bpa.workstructure.domain.model.LocationRepository;
import id.co.oriza.bpa.workstructure.domain.model.Position;
import id.co.oriza.bpa.workstructure.domain.model.PositionRepository;
import id.co.oriza.bpa.workstructure.domain.model.Structure;
import id.co.oriza.bpa.workstructure.domain.model.StructureRepository;

import java.util.Collection;
import java.util.List;

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
	
	@Autowired
	private LocationRepository locationRepository;
	
	@Autowired
	private StructureRepository structureRepository;
	
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
	
	@Transactional(readOnly=true)
	public Collection<Location> allSimilarlyCodedOrAddressedLocations(String aCode, String anAddress, int aStart, int aLimit){
		Collection<Location> locations = this.locationRepository().allSimilarlyCodedOrAddressed(aCode, anAddress, aStart, aLimit);
		return locations;
	}
	
	@Transactional(readOnly=true)
	public Collection<Structure> allStructures(int aStart, int aLimit){
		Collection<Structure> structures = this.structureRepository().all(aStart, aLimit);
		return structures;
	}
	
	@Transactional
	public void newStructuresWith(CreateStructureCommand aCommand){
		List<CreateStructureModel> createStructureModels = aCommand.getCreateStructureModels();
		this.structureRepository().deleteAll();
		
		
		for (CreateStructureModel createStructureModel : createStructureModels) {
			Employee employee = this.employeeRepository().withEmployeeId(createStructureModel.getEmployeeId());
			Position position = this.positionRepository().withCode(createStructureModel.getPositionCode());
			Location location = this.locationRepository().withCode(createStructureModel.getLocationCode());
			Structure newStructure = new Structure(createStructureModel.getStructureId(), createStructureModel.getParentId(), employee, position, location);
			
			this.structureRepository().add(newStructure);
		}
	}

	public EmployeeRepository employeeRepository() {
		return employeeRepository;
	}

	public PositionRepository positionRepository() {
		return positionRepository;
	}

	public LocationRepository locationRepository() {
		return locationRepository;
	}

	public StructureRepository structureRepository() {
		return structureRepository;
	}

}
