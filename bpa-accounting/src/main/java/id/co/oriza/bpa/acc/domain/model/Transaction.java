package id.co.oriza.bpa.acc.domain.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;

public class Transaction extends ConcurrencySafeEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private TransactionId transactionId;
	
	private String transactionNumber;
	private String description;
	private Date createdTime;
	
	private Set<Journal> journals;

	public String getTransactionNumber() {
		return transactionNumber;
	}

	protected void setTransactionNumber(String transactionNumber) {
		this.transactionNumber = transactionNumber;
	}

	public TransactionId getTransactionId() {
		return transactionId;
	}

	protected void setTransactionId(TransactionId transactionId) {
		this.transactionId = transactionId;
	}

	public String getDescription() {
		return description;
	}

	protected void setDescription(String description) {
		this.description = description;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	protected void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public Transaction(TransactionId transactionId, String transactionNumber,
			String description, Date createdTime) {
		this();
		this.setTransactionId(transactionId);
		this.setTransactionNumber(transactionNumber);
		this.setDescription(description);
		this.setCreatedTime(createdTime);
	}

	public Set<Journal> getJournals() {
		return journals;
	}

	protected void setJournals(Set<Journal> journals) {
		this.journals = journals;
	}
	
	public void addJournal(Journal aJournal) {
		this.getJournals().add(aJournal);
	}

	public Transaction() {
		super();
		this.setJournals(new HashSet<Journal>(0));
	}

}
