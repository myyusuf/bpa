package id.co.oriza.bpa.workflow.interfaces.ws;

import id.co.oriza.bpa.workflow.application.WorkflowUserAccessor;

import org.springframework.stereotype.Component;

@Component
public class WorkflowUserAccessorImpl implements WorkflowUserAccessor {
	
	private static final String ACTIVE_USER = "kermit";
	private static final String ACTIVE_USER_GROUP = "sales";

	@Override
	public String getActiveUser() {
		return ACTIVE_USER;
	}

	@Override
	public String getActiveUserGroup() {
		return ACTIVE_USER_GROUP;
	}

}
