package id.co.oriza.bpa.acc.interfaces.ws.pm;

import java.util.Date;

import id.co.oriza.bpa.acc.domain.model.Transaction;

public class TransactionPresentationModel {
	
	private Transaction transaction;

	public TransactionPresentationModel(Transaction transaction) {
		super();
		this.transaction = transaction;
	}
	
	public String getTransactionId() {
		return transaction.getTransactionId().id();
	}

	public String getTransactionNumber() {
		return transaction.getTransactionNumber();
	}

	public String getDescription() {
		return transaction.getDescription();
	}

	public Date getCreatedTime() {
		return transaction.getCreatedTime();
	}

	
	
}
