package id.co.oriza.bpa.security.interfaces.ws.pm;

import id.co.oriza.bpa.security.domain.model.Group;

public class GroupPresentationModel {

	private Group group;

	public GroupPresentationModel(Group group) {
		super();
		this.group = group;
	}
	
	public String getCode() {
		return group.code();
	}

	public String getName() {
		return group.name();
	}
	
	public String getDecription() {
		return group.description();
	}

}
