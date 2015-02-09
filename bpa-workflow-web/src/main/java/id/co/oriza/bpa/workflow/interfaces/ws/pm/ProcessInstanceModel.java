package id.co.oriza.bpa.workflow.interfaces.ws.pm;

import java.io.Serializable;
import java.util.Date;

public class ProcessInstanceModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
	private String businessKey;
	private String startedBy;
	private String startActivityId;
	private Date started;

	public ProcessInstanceModel(String id, String businessKey,
			String startedBy, String startActivityId, Date started) {
		super();
		this.id = id;
		this.businessKey = businessKey;
		this.startedBy = startedBy;
		this.startActivityId = startActivityId;
		this.started = started;
	}

	public String getId() {
		return id;
	}

	public String getBusinessKey() {
		return businessKey;
	}

	public String getStartedBy() {
		return startedBy;
	}

	public String getStartActivityId() {
		return startActivityId;
	}

	public Date getStarted() {
		return started;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setBusinessKey(String businessKey) {
		this.businessKey = businessKey;
	}

	public void setStartedBy(String startedBy) {
		this.startedBy = startedBy;
	}

	public void setStartActivityId(String startActivityId) {
		this.startActivityId = startActivityId;
	}

	public void setStarted(Date started) {
		this.started = started;
	}

}
