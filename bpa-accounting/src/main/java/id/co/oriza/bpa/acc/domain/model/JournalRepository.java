package id.co.oriza.bpa.acc.domain.model;

import java.util.Collection;

public interface JournalRepository {
	
	public void add(Journal anJournal);
	public Collection<Journal> allSimilarlyDescribedJournals(String aDescription, int aStart, int aLimit);
	long allSimilarlyDescribedJournalsSize(String aDescription);
	void remove(Journal anJournal);
	JournalId nextIdentity();
	Collection<Journal> allWithinTransaction(TransactionId aTransactionId,
			int aStart, int aLimit);
	long allWithinTransactionSize(TransactionId aTransactionId);

}
