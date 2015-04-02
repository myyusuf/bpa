package id.co.oriza.bpa.acc.domain.model;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;

public class Transaction extends ConcurrencySafeEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String transactionNumber;

	public String getTransactionNumber() {
		return transactionNumber;
	}

	public void setTransactionNumber(String transactionNumber) {
		this.transactionNumber = transactionNumber;
	}

}
