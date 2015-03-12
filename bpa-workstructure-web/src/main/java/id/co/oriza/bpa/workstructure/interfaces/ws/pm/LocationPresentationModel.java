package id.co.oriza.bpa.workstructure.interfaces.ws.pm;

import id.co.oriza.bpa.workstructure.domain.model.Location;

public class LocationPresentationModel {
	
	private Location location;

	public LocationPresentationModel(Location location) {
		super();
		this.location = location;
	}
	
	public String getCode(){
		return this.location.code();
	}
	
	public String getAddress(){
		return this.location.address();
	}
	
	public String getDescription(){
		return this.location.description();
	}
	

}
