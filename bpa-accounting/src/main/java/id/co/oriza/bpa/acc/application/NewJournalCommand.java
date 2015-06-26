package id.co.oriza.bpa.acc.application;

import java.math.BigDecimal;
import java.util.Date;

public class NewJournalCommand {

	private Date createdTime;
	private String accountCode;
	private BigDecimal amount;
	private String currencyCode;
	private BigDecimal kurs;
	private String positionCode;
	private String description;

	public NewJournalCommand(Date createdTime,
			String accountCode, BigDecimal amount, String currencyCode,
			BigDecimal kurs, String positionCode, String description) {
		super();
		
		this.createdTime = createdTime;
		this.accountCode = accountCode;
		this.amount = amount;
		this.currencyCode = currencyCode;
		this.kurs = kurs;
		this.positionCode = positionCode;
		this.description = description;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public String getAccountCode() {
		return accountCode;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public String getCurrencyCode() {
		return currencyCode;
	}

	public BigDecimal getKurs() {
		return kurs;
	}

	public String getPositionCode() {
		return positionCode;
	}

	public String getDescription() {
		return description;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public void setAccountCode(String accountCode) {
		this.accountCode = accountCode;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public void setCurrencyCode(String currencyCode) {
		this.currencyCode = currencyCode;
	}

	public void setKurs(BigDecimal kurs) {
		this.kurs = kurs;
	}

	public void setPositionCode(String positionCode) {
		this.positionCode = positionCode;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
