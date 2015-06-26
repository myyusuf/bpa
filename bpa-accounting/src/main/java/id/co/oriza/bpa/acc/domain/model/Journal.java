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
	private Currency currency;
	private BigDecimal kurs;
	private MovementType position;
	
	private TransactionId transactionId;
	private String description;
	
	public Journal(JournalId aJournalId, Date aCreatedTime, Account anAccount,
			BigDecimal anAmount, Currency aCurrency, BigDecimal aKurs,
			MovementType aPosition, TransactionId aTransactionId, String aDescription) {
		super();
		this.setJournalId(aJournalId);
		this.setCreatedTime(aCreatedTime);
		this.setAccount(anAccount);
		this.setAmount(anAmount);
		this.setCurrency(aCurrency);
		this.setKurs(aKurs);
		this.setPosition(aPosition);
		this.setTransactionId(aTransactionId);
		this.setDescription(aDescription);
	}

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

	public TransactionId transactionId() {
		return transactionId;
	}

	protected void setJournalId(JournalId aJournalId) {
		this.assertArgumentNotNull(aJournalId, "The Journal Id is required.");
		this.journalId = aJournalId;
	}

	protected void setCreatedTime(Date aCreatedTime) {
		this.assertArgumentNotNull(aCreatedTime, "The Created Time is required.");
		this.createdTime = aCreatedTime;
	}

	protected void setAccount(Account anAccount) {
		this.assertArgumentNotNull(anAccount, "The Account is required.");
		this.account = anAccount;
	}

	protected void setAmount(BigDecimal anAmount) {
		this.assertArgumentNotNull(anAmount, "The Amount is required.");
		this.amount = anAmount;
	}

	protected void setPosition(MovementType aPosition) {
		this.assertArgumentNotNull(aPosition, "The Position is required.");
		this.position = aPosition;
	}

	protected void setTransactionId(TransactionId aTransactionId) {
		this.assertArgumentNotNull(aTransactionId, "The Transaction Id is required.");
		this.transactionId = aTransactionId;
	}
	
	protected Journal() {
		super();
	}

	public String description() {
		return description;
	}

	protected void setDescription(String aDescription) {
		this.assertArgumentNotEmpty(aDescription, "The Description is required.");
		this.description = aDescription;
	}

	public BigDecimal kurs() {
		return kurs;
	}

	protected void setKurs(BigDecimal aKurs) {
		this.assertArgumentNotNull(aKurs, "The Kurs is required.");
		this.kurs = aKurs;
	}

	public Currency currency() {
		return currency;
	}

	protected void setCurrency(Currency aCurrency) {
		this.assertArgumentNotNull(aCurrency, "The Currency is required.");
		this.currency = aCurrency;
	}

}
