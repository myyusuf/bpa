package id.co.oriza.bpa.acc.domain.model;

import java.util.Collection;

public interface TransactionRepository {
	
	public void add(Transaction aTransaction);
	public Collection<Transaction> allSimilarlyNumberedTransactions(String aTransactionNumber, int aStart, int aLimit);
	long allSimilarlyNumberedTransactionsSize(String aTransactionNumber);
	public Transaction transactionWithNumber(String aTransactionNumber);
	void remove(Transaction aTransaction);
	TransactionId nextIdentity();
	Transaction transactionOfId(TransactionId aTransactionId);

}
