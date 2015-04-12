package id.co.oriza.bpa.acc.domain.model;

import java.util.Collection;

public interface JournalRepository {
	
	public void add(Journal anJournal);
	public Collection<Journal> allSimilarlyCodedOrNamedJournals(String aCode, String aName, int aStart, int aLimit);
	int allSimilarlyCodedOrNamedJournalsSize(String aCode, String aName);
	public Journal accountGroupWithCode(String aCode);
	void remove(Journal anJournal);

}
