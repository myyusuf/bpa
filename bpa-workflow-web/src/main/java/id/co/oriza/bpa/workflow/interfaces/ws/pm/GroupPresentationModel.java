package id.co.oriza.bpa.workflow.interfaces.ws.pm;

import id.co.oriza.bpa.workflow.domain.model.Group;

public class GroupPresentationModel {

	private Group group;

	public GroupPresentationModel(Group group) {
		super();
		this.group = group;
	}

	public String getId() {
		return group.id();
	}

	public String getName() {
		return group.name();
	}

}
