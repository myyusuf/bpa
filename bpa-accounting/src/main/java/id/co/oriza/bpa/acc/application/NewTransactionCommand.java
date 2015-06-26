package id.co.oriza.bpa.acc.application;

import java.util.Date;
import java.util.List;

public class NewTransactionCommand {

	private String transactionNumber;
	private String description;
	private Date createdTime;
	private List<NewJournalCommand> newJournalCommands;

	public NewTransactionCommand(String transactionNumber, String description,
			Date createdTime, List<NewJournalCommand> newJournalCommands) {
		super();
		this.transactionNumber = transactionNumber;
		this.description = description;
		this.createdTime = createdTime;
		this.newJournalCommands = newJournalCommands;
	}

	public String getTransactionNumber() {
		return transactionNumber;
	}

	public String getDescription() {
		return description;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setTransactionNumber(String transactionNumber) {
		this.transactionNumber = transactionNumber;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public List<NewJournalCommand> getNewJournalCommands() {
		return newJournalCommands;
	}

	public void setNewJournalCommands(List<NewJournalCommand> newJournalCommands) {
		this.newJournalCommands = newJournalCommands;
	}

}
