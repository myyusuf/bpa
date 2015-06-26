package id.co.oriza.bpa.acc.application;

import id.co.oriza.bpa.acc.domain.model.Account;
import id.co.oriza.bpa.acc.domain.model.AccountRepository;
import id.co.oriza.bpa.acc.domain.model.Currency;
import id.co.oriza.bpa.acc.domain.model.CurrencyRepository;
import id.co.oriza.bpa.acc.domain.model.Journal;
import id.co.oriza.bpa.acc.domain.model.JournalId;
import id.co.oriza.bpa.acc.domain.model.JournalRepository;
import id.co.oriza.bpa.acc.domain.model.MovementType;
import id.co.oriza.bpa.acc.domain.model.Transaction;
import id.co.oriza.bpa.acc.domain.model.TransactionId;
import id.co.oriza.bpa.acc.domain.model.TransactionRepository;

import java.util.Collection;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class TransactionApplicationService {
	
	final Logger logger = LoggerFactory.getLogger(TransactionApplicationService.class);
	
	@Autowired
	private TransactionRepository transactionRepository;

	@Autowired
	private JournalRepository journalRepository;
	
	@Autowired
	private AccountRepository accountRepository;
	
	@Autowired
	private CurrencyRepository currencyRepository;
	
	@Transactional(readOnly=true)
	public Collection<Transaction> allSimilarlyNumberedTransactions(String aTransactionNumber, int aStart, int aLimit){
		Collection<Transaction> transactions = this.transactionRepository().allSimilarlyNumberedTransactions(aTransactionNumber, aStart, aLimit);
		return transactions;
	}
	
	@Transactional(readOnly=true)
	public int allSimilarlyNumberedTransactionsSize(String aTransactionNumber){
		int transactionsSize = (int) this.transactionRepository().allSimilarlyNumberedTransactionsSize(aTransactionNumber);
		return transactionsSize;
	}
	
	@Transactional(readOnly=true)
	public Collection<Journal> allJournalsWithinTransaction(String aTransactionId, int aStart, int aLimit){
		
		Collection<Journal> journals = this.journalRepository().allWithinTransaction(new TransactionId(aTransactionId), aStart, aLimit);
		return journals;
	}
	
	@Transactional(readOnly=true)
	public int allJournalsWithinTransactionSize(String aTransactionId){
		int journalsSize = (int) this.journalRepository().allWithinTransactionSize(new TransactionId(aTransactionId));
		return journalsSize;
	}
	
	//-----------------
	
	@Transactional(readOnly=true)
	public Collection<Journal> allSimilarlyDescribedJournals(String aDescription, int aStart, int aLimit){
		
		Collection<Journal> journals = this.journalRepository().allSimilarlyDescribedJournals(aDescription, aStart, aLimit);
		return journals;
	}
	
	@Transactional(readOnly=true)
	public int allSimilarlyDescribedJournalsSize(String aDescription){
		int journalsSize = (int) this.journalRepository().allSimilarlyDescribedJournalsSize(aDescription);
		return journalsSize;
	}
	
	//-----------------
	
	@Transactional
	public Transaction newTransactionWith(NewTransactionCommand aCommand){
		
		TransactionId nextIdentity = this.transactionRepository().nextIdentity();
		
		Transaction transaction = new Transaction(nextIdentity, aCommand.getTransactionNumber(), aCommand.getDescription(), aCommand.getCreatedTime());
		this.transactionRepository().add(transaction);
		
		addTransactionJournals(nextIdentity, aCommand.getNewJournalCommands());
		
		return transaction;
	}

	private void addTransactionJournals(TransactionId aTransactionId, List<NewJournalCommand> newJournalCommands) {
		for (NewJournalCommand newJournalCommand : newJournalCommands) {
			JournalId nextIdentity = this.journalRepository().nextIdentity();
			Account anAccount = this.existingAccount(newJournalCommand.getAccountCode());
			Currency aCurrency = this.existingCurrency(newJournalCommand.getCurrencyCode());
			MovementType aPosition = MovementType.valueOf(newJournalCommand.getPositionCode());
			Journal journal = new Journal(
					nextIdentity, 
					newJournalCommand.getCreatedTime(), 
					anAccount, 
					newJournalCommand.getAmount(), 
					aCurrency, 
					newJournalCommand.getKurs(), 
					aPosition, 
					aTransactionId, 
					newJournalCommand.getDescription());
			
			this.journalRepository().add(journal);
		}
		
	}
	
	private Transaction existingTransaction(TransactionId aTransactionId) {
		Transaction transaction = this.transaction(aTransactionId);
		
		if(transaction == null){
			throw new IllegalArgumentException("Transaction does not exist for : " + aTransactionId);
		}
		return transaction;
	}

	private Transaction transaction(TransactionId aTransactionId) {
		Transaction transaction = this.transactionRepository().transactionOfId(aTransactionId);
		return transaction;
	}

	private Currency existingCurrency(String aCurrencyCode) {
		Currency currency = this.currency(aCurrencyCode);
		
		if(currency == null){
			throw new IllegalArgumentException("Currency does not exist for : " + aCurrencyCode);
		}
		return currency;
	}

	private Currency currency(String aCurrencyCode) {
		Currency currency = this.currencyRepository().currencyWithCode(aCurrencyCode);
		return currency;
	}
	
	private Account existingAccount(String anAccountCode) {
		Account account = this.account(anAccountCode);
		
		if(account == null){
			throw new IllegalArgumentException("Account does not exist for : " + anAccountCode);
		}
		return account;
	}
	
	private Account account(String anAccountCode) {
		Account account = this.accountRepository().accountWithCode(anAccountCode);
		return account;
	}

	public TransactionRepository transactionRepository() {
		return transactionRepository;
	}

	public JournalRepository journalRepository() {
		return journalRepository;
	}
	
	public AccountRepository accountRepository() {
		return accountRepository;
	}

	public CurrencyRepository currencyRepository() {
		return currencyRepository;
	}

}
