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
		if (structure.employee() != null){
			return new EmployeePresentationModel(structure.employee());
		}else{
			return null;
		}
		
	}
	
	public PositionPresentationModel getPosition(){
		if (structure.position() != null){
			return new PositionPresentationModel(structure.position());
		}else{
			return null;
		}
		
	}
	
	public LocationPresentationModel getLocation(){
		if (structure.location() != null){
			return new LocationPresentationModel(structure.location());
		}else{
			return null;
		}
		
	}

}
