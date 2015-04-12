package id.co.oriza.bpa.acc.domain.model;

import java.util.Collection;

public interface TransactionRepository {
	
	public void add(Transaction aTransaction);
	public Collection<Transaction> allSimilarlyDescribedTransactions(String aCode, String aName, int aStart, int aLimit);
	long allSimilarlyDescribedTransactionsSize(String aCode, String aName);
	public Transaction accountGroupWithCode(String aCode);
	void remove(Transaction anTransaction);

}
