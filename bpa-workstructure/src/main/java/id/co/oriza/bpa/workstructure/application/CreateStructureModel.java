package id.co.oriza.bpa.workstructure.application;

public class CreateStructureModel {

	private String structureId;
	private String parentId;
	private String employeeId;
	private String positionCode;
	private String locationCode;

	public CreateStructureModel(String structureId, String parentId,
			String employeeId, String positionCode, String locationCode) {
		super();
		this.structureId = structureId;
		this.parentId = parentId;
		this.employeeId = employeeId;
		this.positionCode = positionCode;
		this.locationCode = locationCode;
	}

	public String getStructureId() {
		return structureId;
	}

	public String getParentId() {
		return parentId;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public String getPositionCode() {
		return positionCode;
	}

	public String getLocationCode() {
		return locationCode;
	}

}
