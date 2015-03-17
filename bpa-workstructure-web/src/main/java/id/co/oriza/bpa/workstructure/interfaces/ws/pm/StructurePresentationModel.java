package id.co.oriza.bpa.workstructure.interfaces.ws.pm;

import id.co.oriza.bpa.workstructure.domain.model.Structure;

public class StructurePresentationModel {
	
	private Structure structure;

	public StructurePresentationModel(Structure structure) {
		super();
		this.structure = structure;
	}
	
	public String getStructureId(){
		return structure.structureId();
	}
	
	public String getParentId(){
		return structure.parentId();
	}
	
	public EmployeePresentationModel getEmployee(){
		return new EmployeePresentationModel(structure.employee());
	}
	
	public PositionPresentationModel getPosition(){
		return new PositionPresentationModel(structure.position());
	}

}
