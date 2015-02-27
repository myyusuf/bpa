package id.co.oriza.bpa.itrack.domain.model;

import java.util.Date;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;


public class Issue extends ConcurrencySafeEntity {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private IssueId issueId;
	private String subject;
	private String description;
	private Project project;
	private Tracker tracker;
	
	private User reporter;
	private User assignee;
	private Status status;
	private Priority priority;
	
	private Date start;

	public IssueId getIssueId() {
		return issueId;
	}

	public String subject() {
		return subject;
	}

	public String description() {
		return description;
	}

	public Project project() {
		return project;
	}

	public Tracker tracker() {
		return tracker;
	}

	public User reporter() {
		return reporter;
	}

	public User assignee() {
		return assignee;
	}

	public Status status() {
		return status;
	}

	public Priority priority() {
		return priority;
	}

	public Date start() {
		return start;
	}

	protected void setIssueId(IssueId issueId) {
		this.issueId = issueId;
	}

	protected void setSubject(String subject) {
		this.subject = subject;
	}

	protected void setDescription(String description) {
		this.description = description;
	}

	protected void setProject(Project project) {
		this.project = project;
	}

	protected void setTracker(Tracker tracker) {
		this.tracker = tracker;
	}

	protected void setReporter(User reporter) {
		this.reporter = reporter;
	}

	protected void setAssignee(User assignee) {
		this.assignee = assignee;
	}

	protected void setStatus(Status status) {
		this.status = status;
	}

	protected void setPriority(Priority priority) {
		this.priority = priority;
	}

	protected void setStart(Date start) {
		this.start = start;
	}

	public Issue(IssueId issueId, String subject, String description) {
		this();
		this.setIssueId(issueId);
		this.setSubject(subject);
		this.setDescription(description);
	}

	public Issue() {
		super();
	}
	

}
