package id.co.oriza.bpa.itrack.interfaces.ws.pm;

import id.co.oriza.bpa.itrack.domain.model.Issue;

public class IssuePresentationModel {

	private Issue issue;
	
	public IssuePresentationModel(Issue issue) {
		this.issue = issue;
	}
	
	public String getSubject(){
		return this.issue.subject();
	}
	
	public String getDescription(){
		return this.issue.description();
	}

}
