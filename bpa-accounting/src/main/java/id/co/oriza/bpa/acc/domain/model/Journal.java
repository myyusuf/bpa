package id.co.oriza.bpa.acc.domain.model;

import java.math.BigDecimal;
import java.util.Date;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;

public class Journal extends ConcurrencySafeEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private JournalId journalId;
	private Date createdTime;
	private Account account;
	private BigDecimal amount;
	private MovementType position;
	
	private Transaction transaction;

	public JournalId journalId() {
		return journalId;
	}

	public Date createdTime() {
		return createdTime;
	}

	public Account account() {
		return account;
	}

	public BigDecimal amount() {
		return amount;
	}

	public MovementType position() {
		return position;
	}

	public Transaction transaction() {
		return transaction;
	}

	protected void setJournalId(JournalId journalId) {
		this.journalId = journalId;
	}

	protected void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	protected void setAccount(Account account) {
		this.account = account;
	}

	protected void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	protected void setPosition(MovementType position) {
		this.position = position;
	}

	protected void setTransaction(Transaction transaction) {
		this.transaction = transaction;
	}
	
	protected Journal() {
		super();
	}

	public Journal(JournalId journalId, Date createdTime, Account account,
			BigDecimal amount, MovementType position, Transaction transaction) {
		this();
		this.journalId = journalId;
		this.createdTime = createdTime;
		this.account = account;
		this.amount = amount;
		this.position = position;
		this.transaction = transaction;
	}

}
