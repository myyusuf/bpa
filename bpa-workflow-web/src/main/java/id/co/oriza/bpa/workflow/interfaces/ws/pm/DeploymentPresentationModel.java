package id.co.oriza.bpa.workflow.interfaces.ws.pm;

import org.activiti.engine.repository.Deployment;

public class DeploymentPresentationModel {
	
	private Deployment deployment;

	public DeploymentPresentationModel(Deployment aDeployment) {
		this.deployment = aDeployment;
	}
	
	public String getId(){
		return this.deployment.getId();
	}

	public String getName(){
		return this.deployment.getName();
	}
}
