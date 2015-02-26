package id.co.oriza.bpa.itrack.domain.model;

import java.util.Date;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;


public class Issue extends ConcurrencySafeEntity {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private IssueId issueId;
	private String description;
	private Date createdTime;
	
	private User reporter;
	private User assignee;;

}
