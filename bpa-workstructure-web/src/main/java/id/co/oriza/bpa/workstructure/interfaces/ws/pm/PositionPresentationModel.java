package id.co.oriza.bpa.workstructure.interfaces.ws.pm;

import id.co.oriza.bpa.workstructure.domain.model.Position;

public class PositionPresentationModel {
	
	private Position position;

	public PositionPresentationModel(Position position) {
		super();
		this.position = position;
	}
	
	public String getCode(){
		return this.position.code();
	}
	
	public String getName(){
		return this.position.name();
	}
	
	public String getDescription(){
		return this.position.description();
	}
	

}
