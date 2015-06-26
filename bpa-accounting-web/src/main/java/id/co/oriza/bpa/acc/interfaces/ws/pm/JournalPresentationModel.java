package id.co.oriza.bpa.acc.interfaces.ws.pm;

import id.co.oriza.bpa.acc.domain.model.Journal;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JournalPresentationModel {
	
	public JournalPresentationModel(Journal journal) {
		super();
		this.journal = journal;
	}

	private Journal journal;

	public String getJournalId() {
		return journal.journalId().id();
	}

	public Date getCreatedTime() {
		return journal.createdTime();
	}

	public AccountPresentationModel getAccount() {
		return new AccountPresentationModel(journal.account());
	}

	public BigDecimal getAmount() {
		return journal.amount();
	}

	public CurrencyPresentationModel getCurrency() {
		return new CurrencyPresentationModel(journal.currency());
	}

	public BigDecimal getKurs() {
		return journal.kurs();
	}
	
	public Map<String, String> getPosition(){
		Map<String, String> map = new HashMap<String, String>();
		map.put("code", this.journal.position().getCode());
		map.put("name", this.journal.position().getName());
		return map;
	}

	public String getTransactionId() {
		return journal.transactionId().id();
	}

	public String getDescription() {
		return journal.description();
	}

}
