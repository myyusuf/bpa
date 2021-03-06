package id.co.oriza.bpa.workstructure.application;

import id.co.oriza.bpa.base.util.FileUtil;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

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
	
	@Value("${employee.image.folder}")
	private String employeeImageFolder;
	
	@Value("${employee.tempimage.folder}")
	private String employeeTempImageFolder;
	
	@Transactional(readOnly=true)
	public Collection<Employee> allSimilarlyEmployeeIdOrNamedEmployees(String anEmployeeId, String aName, int aStart, int aLimit){
		Collection<Employee> employees = this.employeeRepository().allSimilarlyEmployeeIdOrNamed(anEmployeeId, aName, aStart, aLimit);
		return employees;
	}
	
	@Transactional(readOnly=true)
	public int allSimilarlyEmployeeIdOrNamedEmployeesSize(String anEmployeeId, String aName){
		int employeesSize = this.employeeRepository().allSimilarlyEmployeeIdOrNamedSize(anEmployeeId, aName);
		return employeesSize;
	}
	
	@Transactional(readOnly=true)
	public Collection<Position> allSimilarlyCodedOrNamedPositions(String aCode, String aName, int aStart, int aLimit){
		Collection<Position> positions = this.positionRepository().allSimilarlyCodedOrNamed(aCode, aName, aStart, aLimit);
		return positions;
	}
	@Transactional(readOnly=true)
	public int allSimilarlyCodedOrNamedPositionsSize(String aCode, String aName){
		return this.positionRepository().allSimilarlyCodedOrNamedPositionsSize(aCode, aName);
	}
	
	@Transactional(readOnly=true)
	public Collection<Location> allSimilarlyCodedOrAddressedLocations(String aCode, String anAddress, int aStart, int aLimit){
		Collection<Location> locations = this.locationRepository().allSimilarlyCodedOrAddressed(aCode, anAddress, aStart, aLimit);
		return locations;
	}
	@Transactional(readOnly=true)
	public int allSimilarlyCodedOrAddressedLocationsSize(String aCode, String aName){
		return this.locationRepository().allSimilarlyCodedOrAddressedLocationsSize(aCode, aName);
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
	
	@Transactional(readOnly=true)
	public Employee employeeWithEmployeeId(String employeeId){
		return this.employeeRepository().withEmployeeId(employeeId);
	}
	
	@Transactional
	public void newEmployeeWith(NewEmployeeCommand aCommand){
		
		Employee employee = new Employee(aCommand.getEmployeeId(), aCommand.getName(), "", aCommand.getImageFileName());
		this.employeeRepository().add(employee);
		
		if(!StringUtils.isEmpty(aCommand.getImageFileName())){
			String employeePersonalDirectory = employeeImageFolder + "/" + aCommand.getEmployeeId(); 
			FileUtil.forceMakeDirectory(employeePersonalDirectory);
			
			String temporaryEmployeePhotoFilePath = employeeTempImageFolder + "/" + aCommand.getImageFileName();
			String employeePhotoFilePath = employeePersonalDirectory + "/" + aCommand.getImageFileName();
			
			FileUtil.copyFile(temporaryEmployeePhotoFilePath, employeePhotoFilePath);
		}
		
	}
	
	@Transactional
	public void changeEmployeeInfo(ChangeEmployeeInfoCommand aCommand){
		Employee existingEmployee = this.employee(aCommand.getEmployeeId());
		if(existingEmployee == null){
			throw new IllegalArgumentException("Employee does not exist for : " + aCommand.getEmployeeId());
		}
		
		existingEmployee.changeName(aCommand.getName());
		
		String existingPhotoFileName = existingEmployee.photoFileName() != null ? existingEmployee.photoFileName() : "";
		if(!existingPhotoFileName.equals(aCommand.getImageFileName())){
			
			existingEmployee.changePhotoFileName(aCommand.getImageFileName());
			
			String employeePersonalDirectory = employeeImageFolder + "/" + aCommand.getEmployeeId(); 
			FileUtil.forceMakeDirectory(employeePersonalDirectory);
			
			String temporaryEmployeePhotoFilePath = employeeTempImageFolder + "/" + aCommand.getImageFileName();
			String employeePhotoFilePath = employeePersonalDirectory + "/" + aCommand.getImageFileName();
			
			FileUtil.copyFile(temporaryEmployeePhotoFilePath, employeePhotoFilePath);
		}
	}
	
	@Transactional
	public void removeEmployee(RemoveEmployeeCommand aCommand){
		Employee existingEmployee = this.employee(aCommand.getEmployeeId());
		if(existingEmployee == null){
			throw new IllegalArgumentException("Employee does not exist for : " + aCommand.getEmployeeId());
		}
		this.employeeRepository().remove(existingEmployee);
		
		String employeePersonalDirectory = employeeImageFolder + "/" + aCommand.getEmployeeId();
		FileUtil.deleteDirectory(employeePersonalDirectory);
	}
	
	@Transactional
	public void newPositionWith(NewPositionCommand aCommand){
		
		Position position = new Position(aCommand.getCode(), aCommand.getName(), aCommand.getDescription());
		this.positionRepository().add(position);
		
	}
	@Transactional
	public void changePositionInfo(ChangePositionInfoCommand aCommand){
		Position existingPosition = this.position(aCommand.getCode());
		if(existingPosition == null){
			throw new IllegalArgumentException("Position does not exist for : " + aCommand.getCode());
		}
		
		existingPosition.changeName(aCommand.getName());
		existingPosition.changeDescription(aCommand.getDescription());
	}
	@Transactional
	public void removePosition(RemovePositionCommand aCommand){
		Position existingPosition = this.position(aCommand.getCode());
		if(existingPosition == null){
			throw new IllegalArgumentException("Position does not exist for : " + aCommand.getCode());
		}
		
		this.positionRepository().remove(existingPosition);
	}
	
	@Transactional
	public void newLocationWith(NewLocationCommand aCommand){
		Location location = new Location(aCommand.getCode(), aCommand.getAddress(), aCommand.getDescription());
		this.locationRepository().add(location);
	}
	@Transactional
	public void changeLocationInfo(ChangeLocationInfoCommand aCommand){
		Location existingLocation = this.location(aCommand.getCode());
		if(existingLocation == null){
			throw new IllegalArgumentException("Location does not exist for : " + aCommand.getCode());
		}
		
		existingLocation.changeAddress(aCommand.getAddress());
		existingLocation.changeDescription(aCommand.getDescription());
	}
	@Transactional
	public void removeLocation(RemoveLocationCommand aCommand){
		Location existingLocation = this.location(aCommand.getCode());
		if(existingLocation == null){
			throw new IllegalArgumentException("Location does not exist for : " + aCommand.getCode());
		}
		
		this.locationRepository().remove(existingLocation);
	}
	
	private Employee employee(String employeeId){
		return this.employeeRepository().withEmployeeId(employeeId);
	}
	
	private Position position(String code){
		return this.positionRepository().withCode(code);
	}
	
	private Location location(String code){
		return this.locationRepository().withCode(code);
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
