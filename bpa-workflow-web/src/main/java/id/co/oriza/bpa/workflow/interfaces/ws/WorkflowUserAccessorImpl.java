package id.co.oriza.bpa.workflow.interfaces.ws;

import id.co.oriza.bpa.workflow.application.WorkflowUserAccessor;

import org.springframework.stereotype.Component;

@Component
public class WorkflowUserAccessorImpl implements WorkflowUserAccessor {
	
	private static final String ACTIVE_USER = "kermit";

	@Override
	public String getActiveUser() {
		return ACTIVE_USER;
	}

}
